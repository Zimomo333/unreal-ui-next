import {
  defineComponent,
  h,
  inject,
  ref,
  watch,
  onMounted,
  onUpdated,
  onBeforeUnmount,
  nextTick,
  Fragment,
} from 'vue'

import {
  urFormKey, urFormItemKey,
} from './token'
import {
  addResizeListener,
  removeResizeListener,
  ResizableElement,
} from '@/utils/resize-event'

export default defineComponent({
  name: 'UrLabelWrap',
  props: {
    isAutoWidth: Boolean,
    updateAll: Boolean,
  },
  setup(props, { slots }) {
    const ur = ref<Nullable<HTMLElement>>(null)
    const urForm = inject(urFormKey)
    const urFormItem = inject(urFormItemKey)

    const computedWidth = ref(0)
    watch(computedWidth, (val, oldVal) => {
      if (props.updateAll) {
        urForm.registerLabelWidth(val, oldVal)
        urFormItem.updateComputedLabelWidth(val)
      }
    })

    const getLabelWidth = () => {
      if (ur.value?.firstElementChild) {
        const width = window.getComputedStyle(ur.value.firstElementChild)
          .width
        return Math.ceil(parseFloat(width))
      } else {
        return 0
      }
    }
    const updateLabelWidth = (action = 'update') => {
      nextTick(() => {
        if (slots.default && props.isAutoWidth) {
          if (action === 'update') {
            computedWidth.value = getLabelWidth()
          } else if (action === 'remove') {
            urForm.deregisterLabelWidth(computedWidth.value)
          }
        }
      })
    }
    const updateLabelWidthFn = () => updateLabelWidth('update')

    onMounted(() => {
      addResizeListener(ur.value.firstElementChild as ResizableElement, updateLabelWidthFn)
      updateLabelWidthFn()
    })

    onUpdated(updateLabelWidthFn)

    onBeforeUnmount(() => {
      updateLabelWidth('remove')
      removeResizeListener(ur.value.firstElementChild as ResizableElement, updateLabelWidthFn)
    })

    function render() {
      if (!slots) return null
      if (props.isAutoWidth) {
        const autoLabelWidth = urForm.autoLabelWidth
        const style = {} as CSSStyleDeclaration
        if (autoLabelWidth && autoLabelWidth !== 'auto') {
          const marginLeft = parseInt(autoLabelWidth, 10) - computedWidth.value
          if (marginLeft) {
            style.marginLeft = marginLeft + 'px'
          }
        }
        return h(
          'div',
          {
            ref: ur,
            class: ['ur-form-item__label-wrap'],
            style,
          },
          slots.default?.(),
        )
      } else {
        return h(Fragment, { ref: ur }, slots.default?.())
      }
    }
    return render
  },
})
