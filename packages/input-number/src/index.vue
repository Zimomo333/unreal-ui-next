<template>
  <div
    :class="[
      'ur-input-number',
      inputNumberSize ? 'ur-input-number--' + inputNumberSize : '',
      { 'is-disabled': inputNumberDisabled },
      { 'is-without-controls': !controls },
      { 'is-controls-right': controlsAtRight },
    ]"
    @dragstart.prevent
  >
    <span
      v-if="controls"
      v-repeat-click="decrease"
      class="ur-input-number__decrease"
      role="button"
      :class="{ 'is-disabled': minDisabled }"
      @keydown.enter="decrease"
    >
      <ur-button v-if="controlsAtRight" class="ur-icon-arrow-down">
        <svg t="1619009223659" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4372" width="20" height="20"><path d="M724.231168 170.105856L380.529664 510.181376l341.477376 345.111552c15.1552 15.154176 15.100928 39.7824-0.116736 55.000064-15.220736 15.220736-39.844864 15.271936-54.99392-3.771392L302.629888 542.255104c-4.916224-5.499904-10.561536-11.995136-11.497472-15.504384-5.75488-14.301184-2.874368-31.873024 8.63744-46.317568l369.355776-369.3568c15.284224-11.387904 40.022016-11.447296 55.243776 3.776512 15.217664 15.220736 15.158272 39.958528-0.13312 55.251968l-0.00512 0.001024z" p-id="4373" fill="#707070"></path></svg>
      </ur-button>
      <ur-button v-else class="ur-icon-minus">
        <svg t="1619006898877" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3121" width="20" height="20"><path d="M117.734106 458.213254 906.212134 458.213254C925.995765 458.213254 959.972 482.279754 959.972 511.97312 959.972 541.666486 925.995765 565.732986 906.212134 565.732986L117.734106 565.732986C97.950475 565.732986 63.97424 541.666486 63.97424 511.97312 63.97424 482.279754 97.950475 458.213254 117.734106 458.213254Z" p-id="3122" fill="#707070"></path></svg>
      </ur-button>
    </span>
    <span
      v-if="controls"
      v-repeat-click="increase"
      class="ur-input-number__increase"
      role="button"
      :class="{ 'is-disabled': maxDisabled }"
      @keydown.enter="increase"
    >
      <ur-button v-if="controlsAtRight" class="ur-icon-arrow-up">
        <svg t="1619010411879" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4597" width="20" height="20"><path d="M724.231168 170.105856L380.529664 510.181376l341.477376 345.111552c15.1552 15.154176 15.100928 39.7824-0.116736 55.000064-15.220736 15.220736-39.844864 15.271936-54.99392-3.771392L302.629888 542.255104c-4.916224-5.499904-10.561536-11.995136-11.497472-15.504384-5.75488-14.301184-2.874368-31.873024 8.63744-46.317568l369.355776-369.3568c15.284224-11.387904 40.022016-11.447296 55.243776 3.776512 15.217664 15.220736 15.158272 39.958528-0.13312 55.251968l-0.00512 0.001024z" p-id="4598" fill="#707070"></path></svg>      </ur-button>
      <ur-button v-else class="ur-icon-plus">
        <svg t="1619006420847" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2591" width="20" height="20"><path d="M906.212134 565.732986 565.732986 565.732986 565.732986 906.212134C565.732986 926.013685 541.666486 959.972 511.97312 959.972 482.297674 959.972 458.213254 926.013685 458.213254 906.212134L458.213254 565.732986 117.734106 565.732986C97.950475 565.732986 63.97424 541.666486 63.97424 511.97312 63.97424 482.279754 97.950475 458.213254 117.734106 458.213254L458.213254 458.213254 458.213254 117.734106C458.213254 97.950475 482.297674 63.97424 511.97312 63.97424 541.666486 63.97424 565.732986 97.950475 565.732986 117.734106L565.732986 458.213254 906.212134 458.213254C925.995765 458.213254 959.972 482.279754 959.972 511.97312 959.972 541.666486 925.995765 565.732986 906.212134 565.732986Z" p-id="2592" fill="#707070"></path></svg>
      </ur-button>
    </span>
    <ur-input
      ref="input"
      :model-value="displayValue"
      :placeholder="placeholder"
      :disabled="inputNumberDisabled"
      :size="inputNumberSize"
      :max="max"
      :min="min"
      :name="name"
      :label="label"
      @keydown.up.prevent="increase"
      @keydown.down.prevent="decrease"
      @blur="event => $emit('blur', event)"
      @focus="event => $emit('focus', event)"
      @input="handleInput"
      @change="handleInputChange"
    />
  </div>
</template>
<script lang="ts">
import {
  computed,
  defineComponent,
  reactive,
  ref,
  watch,
  inject,
  onMounted,
  onUpdated,
} from 'vue'
import { RepeatClick } from '@/directives'
import UrInput from '@/packages/input'
import { useGlobalConfig } from '@/utils/util'
import { isValidComponentSize } from '@/utils/validators'
import { urFormKey, urFormItemKey } from '@/packages/form'
import { toRawType } from '@vue/shared'

import type { PropType } from 'vue'
import type { UrFormContext, UrFormItemContext } from '@/packages/form'

interface IData {
  currentValue: number | string
  userInput: null | number | string
}

export default defineComponent({
  name: 'UrInputNumber',
  components: {
    UrInput,
  },
  directives: {
    RepeatClick,
  },
  props: {
    step: {
      type: Number,
      default: 1,
    },
    stepStrictly: {
      type: Boolean,
      default: false,
    },
    max: {
      type: Number,
      default: Infinity,
    },
    min: {
      type: Number,
      default: -Infinity,
    },
    modelValue: {
      required: true,
      validator: val => {
        return toRawType(val) === 'Number' || val === undefined
      },
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    size: {
      type: String as PropType<ComponentSize>,
      validator: isValidComponentSize,
    },
    controls: {
      type: Boolean,
      default: true,
    },
    controlsPosition: {
      type: String,
      default: '',
    },
    name: String,
    label: String,
    placeholder: String,
    precision: {
      type: Number,
      validator: (val: number) => val >= 0 && val === parseInt(val + '', 10),
    },
  },
  emits: ['update:modelValue', 'change', 'input', 'blur', 'focus'],
  setup(props, { emit }) {
    const ELEMENT = useGlobalConfig()
    const urForm = inject(urFormKey, {} as UrFormContext)
    const urFormItem = inject(urFormItemKey, {} as UrFormItemContext)

    const input = ref(null)
    const data = reactive<IData>({
      currentValue: props.modelValue,
      userInput: null,
    })

    const minDisabled = computed(() => {
      return _decrease(props.modelValue) < props.min
    })
    const maxDisabled = computed(() => {
      return _increase(props.modelValue) > props.max
    })
    const numPrecision = computed(() => {
      const stepPrecision = getPrecision(props.step)
      if (props.precision !== undefined) {
        if (stepPrecision > props.precision) {
          console.warn(
            '[Warn][InputNumber]precision should not be less than the decimal places of step',
          )
        }
        return props.precision
      } else {
        return Math.max(getPrecision(props.modelValue), stepPrecision)
      }
    })
    const controlsAtRight = computed(() => {
      return props.controls && props.controlsPosition === 'right'
    })
    const inputNumberSize = computed(() => {
      return props.size || urFormItem.size || ELEMENT.size
    })
    const inputNumberDisabled = computed(() => {
      return props.disabled || urForm.disabled
    })
    const displayValue = computed(() => {
      if (data.userInput !== null) {
        return data.userInput
      }
      let currentValue = data.currentValue
      if (typeof currentValue === 'number') {
        if (props.precision !== undefined) {
          currentValue = currentValue.toFixed(props.precision)
        }
      }
      return currentValue
    })
    const toPrecision = (num, pre?) => {
      if (pre === undefined) pre = numPrecision.value
      return parseFloat(
        Math.round(num * Math.pow(10, pre)) / Math.pow(10, pre) + '',
      )
    }
    const getPrecision = value => {
      if (value === undefined) return 0
      const valueString = value.toString()
      const dotPosition = valueString.indexOf('.')
      let precision = 0
      if (dotPosition !== -1) {
        precision = valueString.length - dotPosition - 1
      }
      return precision
    }
    const _increase = val => {
      if (typeof val !== 'number' && val !== undefined) return data.currentValue
      const precisionFactor = Math.pow(10, numPrecision.value)
      // Solve the accuracy problem of JS decimal calculation by converting the value to integer.
      return toPrecision(
        (precisionFactor * val + precisionFactor * props.step) / precisionFactor,
      )
    }
    const _decrease = val => {
      if (typeof val !== 'number' && val !== undefined) return data.currentValue
      const precisionFactor = Math.pow(10, numPrecision.value)
      // Solve the accuracy problem of JS decimal calculation by converting the value to integer.
      return toPrecision(
        (precisionFactor * val - precisionFactor * props.step) / precisionFactor,
      )
    }
    const increase = () => {
      if (inputNumberDisabled.value || maxDisabled.value) return
      const value = props.modelValue || 0
      const newVal = _increase(value)
      setCurrentValue(newVal)
    }
    const decrease = () => {
      if (inputNumberDisabled.value || minDisabled.value) return
      const value = props.modelValue || 0
      const newVal = _decrease(value)
      setCurrentValue(newVal)
    }
    const setCurrentValue = newVal => {
      const oldVal = data.currentValue
      if (
        typeof newVal === 'number' &&
        props.precision !== undefined
      ) {
        newVal = toPrecision(newVal, props.precision)
      }
      if (newVal !== undefined && newVal >= props.max) newVal = props.max
      if (newVal !== undefined && newVal <= props.min) newVal = props.min
      if (oldVal === newVal) return
      data.userInput = null
      emit('update:modelValue', newVal)
      emit('input', newVal)
      emit('change', newVal, oldVal)
      data.currentValue = newVal
    }
    const handleInput = value => {
      return (data.userInput = value)
    }
    const handleInputChange = value => {
      const newVal = value === '' ? undefined : Number(value)
      if (!isNaN(newVal) || value === '') {
        setCurrentValue(newVal)
      }
      data.userInput = null
    }
    watch(
      () => props.modelValue,
      value => {
        let newVal = value === undefined ? value : Number(value)
        if (newVal !== undefined) {
          if (isNaN(newVal)) return
          if (props.stepStrictly) {
            const stepPrecision = getPrecision(props.step)
            const precisionFactor = Math.pow(10, stepPrecision)
            newVal =
              (Math.round(newVal / props.step) * precisionFactor * props.step) /
              precisionFactor
          }
          if (props.precision !== undefined) {
            newVal = toPrecision(newVal, props.precision)
          }
        }
        if (newVal !== undefined && newVal >= props.max) {
          newVal = props.max
          emit('update:modelValue', newVal)
        }
        if (newVal !== undefined && newVal <= props.min) {
          newVal = props.min
          emit('update:modelValue', newVal)
        }
        data.currentValue = newVal
        data.userInput = null
      },
      { immediate: true },
    )
    onMounted(() => {
      let innerInput = input.value.input
      innerInput.setAttribute('role', 'spinbutton')
      innerInput.setAttribute('aria-valuemax', props.max)
      innerInput.setAttribute('aria-valuemin', props.min)
      innerInput.setAttribute('aria-valuenow', data.currentValue)
      innerInput.setAttribute('aria-disabled', inputNumberDisabled.value)
      if (toRawType(props.modelValue) !== 'Number' && props.modelValue !== undefined) {
        emit('update:modelValue', undefined)
      }
    })
    onUpdated(() => {
      let innerInput = input.value.input
      innerInput.setAttribute('aria-valuenow', data.currentValue)
    })
    return {
      input,
      displayValue,
      handleInput,
      handleInputChange,
      controlsAtRight,
      decrease,
      increase,
      inputNumberSize,
      inputNumberDisabled,
      maxDisabled,
      minDisabled,
    }
  },
})
</script>
