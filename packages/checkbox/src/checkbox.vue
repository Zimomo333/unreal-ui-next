<template>
  <label
    :id="id"
    class="ur-checkbox"
    :class="[
      border && checkboxSize ? 'ur-checkbox--' + checkboxSize : '',
      { 'is-disabled': isDisabled },
      { 'is-bordered': border },
      { 'is-checked': isChecked }
    ]"
    :aria-controls="indeterminate ? controls : null"
  >
    <span
      class="ur-checkbox__input"
      :class="{
        'is-disabled': isDisabled,
        'is-checked': isChecked,
        'is-indeterminate': indeterminate,
        'is-focus': focus
      }"
      :tabindex="indeterminate ? 0 : false"
      :role="indeterminate ? 'checkbox' : false"
      :aria-checked="indeterminate ? 'mixed' : false"
    >
      <span class="ur-checkbox__inner"></span>
      <input
        v-if="trueLabel || falseLabel"
        v-model="model"
        :checked="isChecked"
        class="ur-checkbox__original"
        type="checkbox"
        :aria-hidden="indeterminate ? 'true' : 'false'"
        :name="name"
        :disabled="isDisabled"
        :true-value="trueLabel"
        :false-value="falseLabel"
        @change="handleChange"
        @focus="focus = true"
        @blur="focus = false"
      >
      <input
        v-else
        v-model="model"
        class="ur-checkbox__original"
        type="checkbox"
        :aria-hidden="indeterminate ? 'true' : 'false'"
        :disabled="isDisabled"
        :value="label"
        :name="name"
        @change="handleChange"
        @focus="focus = true"
        @blur="focus = false"
      >
    </span>
    <span v-if="$slots.default || label" class="ur-checkbox__label">
      <slot></slot>
      <template v-if="!$slots.default">{{ label }}</template>
    </span>
  </label>
</template>
<script lang='ts'>
import {
  defineComponent,
  PropType,
} from 'vue'
import { UPDATE_MODEL_EVENT } from '@/utils/constants'
import { isValidComponentSize } from '@/utils/validators'
import { useCheckbox } from './useCheckbox'

export default defineComponent({
  name: 'UrCheckbox',
  props: {
    modelValue: {
      type: [Boolean, Number, String],
      default: () => undefined,
    },
    label: {
      type: [Boolean, Number, String],
    },
    indeterminate: Boolean,
    disabled: Boolean,
    checked: Boolean,
    name: {
      type: String,
      default: undefined,
    },
    trueLabel: {
      type: [String, Number],
      default: undefined,
    },
    falseLabel: {
      type: [String, Number],
      default: undefined,
    },
    id: {
      type: String,
      default: undefined,
    },
    controls: {
      type: String,
      default: undefined,
    },
    border: Boolean,
    size: {
      type: String as PropType<ComponentSize>,
      validator: isValidComponentSize,
    },
  },
  emits: [UPDATE_MODEL_EVENT, 'change'],
  setup(props) {
    return useCheckbox(props)
  },
})
</script>
