import {
  defineComponent,
  ref,
  onBeforeMount,
  onMounted,
  computed,
  getCurrentInstance,
  h,
  onBeforeUnmount,
  Fragment,
} from 'vue'
import { cellStarts } from '../config'
import { mergeOptions, compose } from '../util'
import UrCheckbox from '@/packages/checkbox'
import { TableColumnCtx, TableColumn } from '../table.type'
import useWatcher from './watcher-helper'
import useRender from './render-helper'

let columnIdSeed = 1
export default defineComponent({
  name: 'UrTableColumn',
  components: {
    UrCheckbox,
  },
  props: {
    type: {
      type: String,
      default: 'default',
    },
    label: String,
    className: String,
    labelClassName: String,
    property: String,
    prop: String,
    width: {
      type: [Object, Number, String],
      default: () => {
        return {}
      },
    },
    minWidth: {
      type: [Object, Number, String],
      default: () => {
        return {}
      },
    },
    renderHeader: Function,
    sortable: {
      type: [Boolean, String],
      default: false,
    },
    sortMethod: Function,
    sortBy: [String, Function, Array],
    resizable: {
      type: Boolean,
      default: true,
    },
    columnKey: String,
    align: String,
    headerAlign: String,
    showTooltipWhenOverflow: Boolean,
    showOverflowTooltip: Boolean,
    fixed: [Boolean, String],
    formatter: Function,
    selectable: Function,
    reserveSelection: Boolean,
    filterMethod: Function,
    filteredValue: Array,
    filters: Array,
    filterPlacement: String,
    filterMultiple: {
      type: Boolean,
      default: true,
    },
    index: [Number, Function],
    sortOrders: {
      type: Array,
      default () {
        return ['ascending', 'descending', null]
      },
      validator (val: unknown[]) {
        return val.every(
          (order: string) =>
            ['ascending', 'descending', null].indexOf(order) > -1,
        )
      },
    },
  },
  setup (prop, { slots }) {
    const instance = getCurrentInstance() as TableColumn
    const columnConfig = ref<Partial<TableColumnCtx>>({})
    const props = (prop as unknown) as TableColumnCtx
    const owner = computed(() => {
      let parent = instance.parent as any
      while (parent && !parent.tableId) {
        parent = parent.parent
      }
      return parent
    })

    const { registerNormalWatchers, registerComplexWatchers } = useWatcher(
      owner,
      props,
    )
    const {
      columnId,
      isSubColumn,
      realHeaderAlign,
      columnOrTableParent,
      setColumnWidth,
      setColumnForcedProps,
      setColumnRenders,
      getPropsData,
      getColumnElIndex,
      realAlign,
    } = useRender(props, slots, owner)

    const parent = columnOrTableParent.value
    columnId.value =
      (parent.tableId || parent.columnId) + '_column_' + columnIdSeed++
    onBeforeMount(() => {
      isSubColumn.value = owner.value !== parent

      const type = props.type || 'default'
      const sortable = props.sortable === '' ? true : props.sortable
      const defaults = {
        ...cellStarts[type],
        id: columnId.value,
        type: type,
        property: props.prop || props.property,
        align: realAlign,
        headerAlign: realHeaderAlign,
        showOverflowTooltip:
          props.showOverflowTooltip || props.showTooltipWhenOverflow,
        // filter 相关属性
        filterable: props.filters || props.filterMethod,
        filteredValue: [],
        filterPlacement: '',
        isColumnGroup: false,
        filterOpened: false,
        // sort 相关属性
        sortable: sortable,
        // index 列
        index: props.index,
      }

      const basicProps = [
        'columnKey',
        'label',
        'className',
        'labelClassName',
        'type',
        'renderHeader',
        'formatter',
        'fixed',
        'resizable',
      ]
      const sortProps = ['sortMethod', 'sortBy', 'sortOrders']
      const selectProps = ['selectable', 'reserveSelection']
      const filterProps = [
        'filterMethod',
        'filters',
        'filterMultiple',
        'filterOpened',
        'filteredValue',
        'filterPlacement',
      ]

      let column = getPropsData(basicProps, sortProps, selectProps, filterProps)

      column = mergeOptions(defaults, column)
      // 注意 compose 中函数执行的顺序是从右到左
      const chains = compose(
        setColumnRenders,
        setColumnWidth,
        setColumnForcedProps,
      )
      column = chains(column)
      columnConfig.value = column

      // 注册 watcher
      registerNormalWatchers()
      registerComplexWatchers()
    })
    onMounted(() => {
      const parent = columnOrTableParent.value
      const children = isSubColumn.value
        ? parent.vnode.el.children
        : parent.refs.hiddenColumns?.children
      const getColumnIndex = () =>
        getColumnElIndex(children || [], instance.vnode.el)
      columnConfig.value.getColumnIndex = getColumnIndex
      const columnIndex = getColumnIndex()
      columnIndex > -1 &&
        owner.value.store.commit(
          'insertColumn',
          columnConfig.value,
          isSubColumn.value ? parent.columnConfig.value : null,
        )
    })
    onBeforeUnmount(() => {
      owner.value.store.commit(
        'removeColumn',
        columnConfig.value,
        isSubColumn.value ? parent.columnConfig.value : null,
      )
    })
    instance.columnId = columnId.value

    // eslint-disable-next-line
    instance.columnConfig = columnConfig
    return
  },
  render () {
    let children = []
    try {
      const renderDefault = this.$slots.default?.({ row: {}, column: {}, $index: -1 })
      if (renderDefault instanceof Array) {
        for (const childNode of renderDefault) {
          if (childNode.type?.name === 'UrTableColumn' || childNode.shapeFlag !== 36) {
            children.push(childNode)
          } else if (childNode.type === Fragment && childNode.children instanceof Array) {
            renderDefault.push(...childNode.children)
          }
        }
      }
    } catch {
      children = []
    }
    return h('div', children)
  },
})
