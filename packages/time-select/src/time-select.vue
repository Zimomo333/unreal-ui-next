<template>
  <ur-select
    :model-value="value"
    :disabled="!editable"
    :clearable="clearable"
    :clear-icon="clearIcon"
    :size="size"
    :placeholder="placeholder"
    default-first-option
    filterable
    @update:model-value="(event) => $emit('update:modelValue', event)"
    @change="(event) => $emit('change', event)"
    @blur="(event) => $emit('blur', event)"
    @focus="(event) => $emit('focus', event)"
  >
    <ur-option
      v-for="item in items"
      :key="item.value"
      :label="item.value"
      :value="item.value"
      :disabled="item.disabled"
    />
    <template #prefix>
      <i :class="`ur-input__icon ${prefixIcon}`"></i>
    </template>
  </ur-select>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import UrSelect from '@/packages/select'
import UrOption from '@/packages/option'
interface Time {
  hours: number
  minutes: number
}
const parseTime = (time: string): null | Time => {
  const values = (time || '').split(':')
  if (values.length >= 2) {
    const hours = parseInt(values[0], 10)
    const minutes = parseInt(values[1], 10)
    return {
      hours,
      minutes,
    }
  }
  return null
}
const compareTime = (time1: string, time2: string): number => {
  const value1 = parseTime(time1)
  const value2 = parseTime(time2)
  const minutes1 = value1.minutes + value1.hours * 60
  const minutes2 = value2.minutes + value2.hours * 60
  if (minutes1 === minutes2) {
    return 0
  }
  return minutes1 > minutes2 ? 1 : -1
}
const formatTime = (time: Time): string => {
  return (
    (time.hours < 10 ? '0' + time.hours : time.hours) +
    ':' +
    (time.minutes < 10 ? '0' + time.minutes : time.minutes)
  )
}
const nextTime = (time: string, step: string): string => {
  const timeValue = parseTime(time)
  const stepValue = parseTime(step)
  const next = {
    hours: timeValue.hours,
    minutes: timeValue.minutes,
  }
  next.minutes += stepValue.minutes
  next.hours += stepValue.hours
  next.hours += Math.floor(next.minutes / 60)
  next.minutes = next.minutes % 60
  return formatTime(next)
}

export default defineComponent({
  name: 'UrTimeSelect',

  components: { UrSelect, UrOption },
  model: {
    prop: 'value',
    event: 'change',
  },
  props: {
    modelValue: String,
    editable: {
      type: Boolean,
      default: true,
    },
    clearable: {
      type: Boolean,
      default: true,
    },
    size: {
      type: String,
      default: '',
      validator: (value: string) => !value || ['medium', 'small', 'mini'].indexOf(value) !== -1,
    },
    placeholder: {
      type: String,
      default: '',
    },
    start: {
      type: String,
      default: '09:00',
    },
    end: {
      type: String,
      default: '18:00',
    },
    step: {
      type: String,
      default: '00:30',
    },
    minTime: {
      type: String,
      default: '',
    },
    maxTime: {
      type: String,
      default: '',
    },
    name: {
      type: String,
      default: '',
    },
    prefixIcon: {
      type: String,
      default: 'ur-icon-time',
    },
    clearIcon: {
      type: String,
      default: 'ur-icon-circle-close',
    },
  },
  emits: ['change', 'blur', 'focus', 'update:modelValue'],
  setup(props) {
    // computed
    const value = computed(() => props.modelValue)
    const items = computed(() => {
      const result = []
      if (props.start && props.end && props.step) {
        let current = props.start
        while (compareTime(current, props.end) <= 0) {
          result.push({
            value: current,
            disabled:
              compareTime(current, props.minTime || '-1:-1') <= 0 ||
              compareTime(current, props.maxTime || '100:100') >= 0,
          })
          current = nextTime(current, props.step)
        }
      }
      return result
    })
    return {
      value,
      items,
    }
  },
})
</script>
