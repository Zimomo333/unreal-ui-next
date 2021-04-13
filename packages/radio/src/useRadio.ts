import { ref, computed, inject, WritableComputedRef } from 'vue'
import { urFormKey, urFormItemKey } from '@/packages/form'
import { useGlobalConfig } from '@/utils/util'
import radioGroupKey from './token'

import type { ComputedRef } from 'vue'
import type { UrFormContext, UrFormItemContext } from '@/packages/form'
import type { RadioGroupContext } from './token'

export const useRadio = () => {

  const ELEMENT = useGlobalConfig()
  const elForm = inject(urFormKey, {} as UrFormContext)
  const urFormItem = inject(urFormItemKey, {} as UrFormItemContext)
  const radioGroup = inject(radioGroupKey, {} as RadioGroupContext)
  const focus = ref(false)
  const isGroup = computed(() => radioGroup?.name === 'UrRadioGroup')
  const urFormItemSize = computed(() => urFormItem.size || ELEMENT.size)

  return {
    isGroup,
    focus,
    radioGroup,
    elForm,
    ELEMENT,
    urFormItemSize,
  }
}

interface IUseRadioAttrsProps {
  disabled?: boolean
  label: string | number | boolean
}

interface IUseRadioAttrsState {
  isGroup: ComputedRef<boolean>
  radioGroup: RadioGroupContext
  elForm: UrFormContext
  model: WritableComputedRef<string | number | boolean>
}

export const useRadioAttrs = (props: IUseRadioAttrsProps, {
  isGroup,
  radioGroup,
  elForm,
  model,
}: IUseRadioAttrsState) => {
  const isDisabled = computed(() => {
    return isGroup.value
      ? radioGroup.disabled || props.disabled || elForm.disabled
      : props.disabled || elForm.disabled
  })

  const tabIndex = computed(() => {
    return (isDisabled.value || (isGroup.value && model.value !== props.label)) ? -1 : 0
  })

  return {
    isDisabled,
    tabIndex,
  }

}
