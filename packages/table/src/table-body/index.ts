import { addClass, removeClass } from '@/utils/dom'
import isServer from '@/utils/isServer'
import { defineComponent, getCurrentInstance, h, PropType, watch, onUnmounted, onUpdated } from 'vue'
import { hColgroup } from '../h-helper'
import useLayoutObserver from '../layout-observer'
import { Store, Table } from '../table.type'
import useRender from './render-helper'
import { TableBodyProps } from './table-body'
import { removePopper } from '../util'
export default defineComponent({
  name: 'UrTableBody',
  props: {
    store: {
      required: true,
      type: Object as PropType<Store>,
    },
    stripe: Boolean,
    tooltipEffect: String,
    context: {
      default: () => ({}),
      type: Object,
    },
    rowClassName: [String, Function],
    rowStyle: [Object, Function],
    fixed: {
      type: String,
      default: '',
    },
    highlight: Boolean,
  },
  setup(props) {
    const instance = getCurrentInstance()
    const parent = instance.parent as Table

    const {
      wrappedRowRender,
      tooltipContent,
      tooltipTrigger,
    } = useRender(props as TableBodyProps)
    const { onColumnsChange, onScrollableChange } = useLayoutObserver(parent)

    watch(
      props.store.states.hoverRow,
      (newVal: number | null, oldVal: number | null) => {
        if (!props.store.states.isComplex.value || isServer) return
        let raf = window.requestAnimationFrame
        if (!raf) {
          raf = fn => window.setTimeout(fn, 16)
        }
        raf(() => {
          const rows = instance.vnode.el.querySelectorAll('.ur-table__row')
          const oldRow = rows[oldVal]
          const newRow = rows[newVal]
          if (oldRow) {
            removeClass(oldRow, 'hover-row')
          }
          if (newRow) {
            addClass(newRow, 'hover-row')
          }
        })
      },
    )

    onUnmounted(() => {
      removePopper?.()
    })
    onUpdated(() => {
      removePopper?.()
    })

    return {
      onColumnsChange,
      onScrollableChange,
      wrappedRowRender,
      tooltipContent,
      tooltipTrigger,
    }
  },
  render() {
    const data = this.store.states.data.value || []
    return h(
      'table',
      {
        class: 'ur-table__body',
        cellspacing: '0',
        cellpadding: '0',
        border: '0',
      },
      [
        hColgroup(this.store.states.columns.value),
        h('tbody', {}, [
          data.reduce((acc, row) => {
            return acc.concat(this.wrappedRowRender(row, acc.length))
          }, []),
        ]),
      ],
    )
  },
})
