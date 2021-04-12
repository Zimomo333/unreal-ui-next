<template>
  <button
    :class="[
      'ur-button',
      type ? type : '',
      buttonSize ? buttonSize : '',
      {
        'is-disabled': buttonDisabled,
        'is-loading': loading,
        'is-plain': plain,
        'is-round': round,
        'is-circle': circle
      }
    ]"
    :disabled="buttonDisabled || loading"
    :autofocus="autofocus"
    :type="nativeType"
    @click="handleClick"
  >
    <svg v-if="loading" class="loading_icon" t="1617026719858" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6488" width="200" height="200"><path d="M512 0c282.8 0 512 229.2 512 512 0 49.5-40.1 89.6-89.6 89.6-48.5 0-87.9-38.5-89.5-86.5l-0.1-3.1c0-183.8-149-332.8-332.8-332.8S179.2 328.2 179.2 512c0 182 146 329.8 327.3 332.8h5.5c49.5 0 89.6 40.1 89.6 89.6 0 49.5-40.1 89.6-89.6 89.6C229.2 1024 0 794.8 0 512S229.2 0 512 0z" p-id="6489" fill="#707070"></path></svg>
    <i v-if="icon && !loading" :class="icon"></i>
    <span v-if="$slots.default"><slot></slot></span>
  </button>
</template>

<script lang='ts'>
import { computed, inject, defineComponent } from 'vue'
import { useGlobalConfig } from '@/utils/util'
import { isValidComponentSize } from '@/utils/validators'
import { urFormKey, urFormItemKey } from '@/packages/form'

import type { PropType } from 'vue'
import type { ElFormContext, ElFormItemContext } from '@/packages/form'

type IButtonType = PropType<'primary' | 'success' | 'warning' | 'danger' | 'info' | 'text' | 'default'>
type IButtonNativeType = PropType<'button' | 'submit' | 'reset'>

interface IButtonProps {
  type: string
  size: string
  icon: string
  nativeType: string
  loading: boolean
  disabled: boolean
  plain: boolean
  autofocus: boolean
  round: boolean
  circle: boolean
}

type EmitFn = (evt: Event) => void

export default defineComponent({
  name: 'UrButton',

  props: {
    type: {
      type: String as IButtonType,
      default: 'default',
      validator: (val: string) => {
        return [
          'default',
          'primary',
          'success',
          'warning',
          'info',
          'danger',
          'text',
        ].includes(val)
      },
    },
    size: {
      type: String as PropType<ComponentSize>,
      validator: isValidComponentSize,
    },
    icon: {
      type: String,
      default: '',
    },
    nativeType: {
      type: String as IButtonNativeType,
      default: 'button',
      validator: (val: string) => {
        return ['button', 'submit', 'reset'].includes(val)
      },
    },
    loading: Boolean,
    disabled: Boolean,
    plain: Boolean,
    autofocus: Boolean,
    round: Boolean,
    circle: Boolean,
  },

  emits: ['click'],

  setup(props, ctx) {
    const $ELEMENT = useGlobalConfig()

    const urForm = inject(urFormKey, {} as ElFormContext)
    const urFormItem = inject(urFormItemKey, {} as ElFormItemContext)

    const buttonSize = computed(() => {
      return props.size || urFormItem.size || $ELEMENT.size
    })
    const buttonDisabled = computed(() => {
      return props.disabled || urForm.disabled
    })

    //methods
    const handleClick = evt => {
      ctx.emit('click', evt)
    }

    return {
      buttonSize,
      buttonDisabled,
      handleClick,
    }
  },
})
</script>