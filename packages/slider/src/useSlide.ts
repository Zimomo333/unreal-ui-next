import { computed, inject, nextTick, ref } from 'vue'
import { CHANGE_EVENT } from '@/utils/constants'
import { urFormKey, urFormItemKey } from '@/packages/form'
import { ButtonRefs, ISliderInitData, ISliderProps } from './slider.type'

import type { UrFormContext, UrFormItemContext } from '@/packages/form'

export const useSlide = (props: ISliderProps, initData: ISliderInitData, emit) => {
  const urForm = inject(urFormKey, {} as UrFormContext)
  const urFormItem = inject(urFormItemKey, {} as UrFormItemContext)

  const slider = ref<Nullable<HTMLElement>>(null)

  const firstButton = ref(null)

  const secondButton = ref(null)

  const buttonRefs: ButtonRefs = {
    firstButton,
    secondButton,
  }

  const sliderDisabled = computed(() => {
    return props.disabled || (urForm.disabled || false)
  })

  const minValue = computed(() => {
    return Math.min(initData.firstValue, initData.secondValue)
  })

  const maxValue = computed(() => {
    return Math.max(initData.firstValue, initData.secondValue)
  })

  const barSize = computed(() => {
    return props.range
      ? `${ 100 * (maxValue.value - minValue.value) / (props.max - props.min) }%`
      : `${ 100 * (initData.firstValue - props.min) / (props.max - props.min) }%`
  })

  const barStart = computed(() => {
    return props.range
      ? `${ 100 * (minValue.value - props.min) / (props.max - props.min) }%`
      : '0%'
  })

  const runwayStyle = computed(() => {
    return (props.vertical ? { height: props.height, width: props.width } : {}) as CSSStyleDeclaration
  })

  const barStyle = computed(() => {
    return (props.vertical
      ? {
        height: barSize.value,
        bottom: barStart.value,
        width: props.width,
        backgroundColor: props.bgColor,
      } : {
        width: barSize.value,
        left: barStart.value,
      }) as CSSStyleDeclaration
  })

  const resetSize = () => {
    if (slider.value) {
      initData.sliderSize = slider.value[`client${ props.vertical ? 'Height' : 'Width' }`]
    }
  }

  const setPosition = (percent: number) => {
    const targetValue = props.min + percent * (props.max - props.min) / 100
    if (!props.range) {
      firstButton.value.setPosition(percent)
      return
    }
    let buttonRefName: string
    if (Math.abs(minValue.value - targetValue) < Math.abs(maxValue.value - targetValue)) {
      buttonRefName = initData.firstValue < initData.secondValue ? 'firstButton' : 'secondButton'
    } else {
      buttonRefName = initData.firstValue > initData.secondValue ? 'firstButton' : 'secondButton'
    }
    buttonRefs[buttonRefName].value.setPosition(percent)
  }

  const emitChange = async () => {
    await nextTick()
    emit(CHANGE_EVENT, props.range ? [minValue.value, maxValue.value] : props.modelValue)
  }

  const onSliderClick = (event: MouseEvent) => {
    if (sliderDisabled.value || initData.dragging) return
    resetSize()
    if (props.vertical) {
      const sliderOffsetBottom = slider.value.getBoundingClientRect().bottom
      setPosition((sliderOffsetBottom - event.clientY) / initData.sliderSize * 100)
    } else {
      const sliderOffsetLeft = slider.value.getBoundingClientRect().left
      setPosition((event.clientX - sliderOffsetLeft) / initData.sliderSize * 100)
    }
    emitChange()
  }

  return {
    urFormItem,
    slider,
    firstButton,
    secondButton,
    sliderDisabled,
    minValue,
    maxValue,
    runwayStyle,
    barStyle,
    resetSize,
    setPosition,
    emitChange,
    onSliderClick,
  }
}
