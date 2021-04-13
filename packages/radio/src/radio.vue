<template>
  <label
    class="ur-radio"
    :class="{
      [`ur-radio--${radioSize || ''}`]: border && radioSize,
      'is-disabled': isDisabled,
      'is-focus': focus,
      'is-bordered': border,
      'is-checked': model === label
    }"
    role="radio"
    :aria-checked="model === label"
    :aria-disabled="isDisabled"
    :tabindex="tabIndex"
    @keydown.space.stop.prevent="model = isDisabled ? model : label"
  >
    <span
      class="ur-radio__input"
      :class="{
        'is-disabled': isDisabled,
        'is-checked': model === label
      }"
    >
      <span class="ur-radio__inner"></span>
      <input
        ref="radioRef"
        v-model="model"
        class="ur-radio__original"
        :value="label"
        type="radio"
        aria-hidden="true"
        :name="name"
        :disabled="isDisabled"
        tabindex="-1"
        @focus="focus = true"
        @blur="focus = false"
        @change="handleChange"
      >
    </span>
    <span class="ur-radio__label" @keydown.stop>
      <slot>
        {{ label }}
      </slot>
    </span>
  </label>
</template>

<script lang='ts'>
import {
  defineComponent,
  computed, nextTick, ref,
} from 'vue'
import { UPDATE_MODEL_EVENT } from '@/utils/constants'
import { isValidComponentSize } from '@/utils/validators'
import { useRadio, useRadioAttrs } from './useRadio'

import type { PropType } from 'vue'

export default defineComponent({
  name: 'UrRadio',
  componentName: 'UrRadio',

  props: {
    modelValue: {
      type: [String, Number, Boolean],
      default: '',
    },
    label: {
      type: [String, Number, Boolean],
      default: '',
    },
    disabled: Boolean,
    name: {
      type: String,
      default: '',
    },
    border: Boolean,
    size: {
      type: String as PropType<ComponentSize>,
      validator: isValidComponentSize,
    },
  },

  emits: [UPDATE_MODEL_EVENT, 'change'],

  setup(props, ctx) {
    const {
      isGroup,
      radioGroup,
      urFormItemSize,
      ELEMENT,
      focus,
      elForm,
    } = useRadio()

    const radioRef = ref<HTMLInputElement>()
    const model = computed<string | number | boolean>({
      get() {
        return isGroup.value ? radioGroup.modelValue : props.modelValue
      },
      set(val) {
        if (isGroup.value) {
          radioGroup.changeEvent(val)
        } else {
          ctx.emit(UPDATE_MODEL_EVENT, val)
        }
        radioRef.value.checked = props.modelValue === props.label
      },
    })

    const {
      tabIndex,
      isDisabled,
    } = useRadioAttrs(props, {
      isGroup,
      radioGroup: radioGroup,
      elForm,
      model,
    })

    const radioSize = computed(() => {
      const temRadioSize = props.size || urFormItemSize.value || ELEMENT.size
      return isGroup.value
        ? radioGroup.radioGroupSize || temRadioSize
        : temRadioSize
    })

    function handleChange() {
      nextTick(() => {
        ctx.emit('change', model.value)
      })
    }

    return {
      focus,
      isGroup,
      isDisabled,
      model,
      tabIndex,
      radioSize,
      handleChange,
      radioRef,
    }
  },
})
</script>


