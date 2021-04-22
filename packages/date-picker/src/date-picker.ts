import { defineComponent, ref } from 'vue'
import { DEFAULT_FORMATS_DATE, DEFAULT_FORMATS_DATEPICKER } from '@/packages/time-picker'
import { CommonPicker, defaultProps } from '@/packages/time-picker'
import DatePickPanel from './date-picker-com/panel-date-pick.vue'
import DateRangePickPanel from './date-picker-com/panel-date-range.vue'
import MonthRangePickPanel from './date-picker-com/panel-month-range.vue'
import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import advancedFormat from 'dayjs/plugin/advancedFormat'
import localeData from 'dayjs/plugin/localeData'
import weekOfYear from 'dayjs/plugin/weekOfYear'
import weekYear from 'dayjs/plugin/weekYear'
import dayOfYear from 'dayjs/plugin/dayOfYear'
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter'
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore'
import { h } from 'vue'
dayjs.extend(localeData)
dayjs.extend(advancedFormat)
dayjs.extend(customParseFormat)
dayjs.extend(weekOfYear)
dayjs.extend(weekYear)
dayjs.extend(dayOfYear)
dayjs.extend(isSameOrAfter)
dayjs.extend(isSameOrBefore)

const getPanel = function(type) {
  if (type === 'daterange' || type === 'datetimerange') {
    return DateRangePickPanel
  } else if (type === 'monthrange') {
    return MonthRangePickPanel
  }
  return DatePickPanel
}

export default defineComponent({
  name: 'UrDatePicker',
  install: null,
  props: {
    ...defaultProps,
    type: {
      type: String,
      default: 'date',
    },
  },
  emits: ['update:modelValue'],
  setup(props, ctx) {
    const commonPicker = ref(null)
    const format = DEFAULT_FORMATS_DATEPICKER[props.type] || DEFAULT_FORMATS_DATE
    const refProps = {
      ...props,
      focus: () => {
        commonPicker.value?.handleFocus()
      },
    }
    ctx.expose(refProps)
    return () => h(CommonPicker, {
      format,
      ...props, // allow format to be overwrite
      type: props.type,
      ref: commonPicker,
      'onUpdate:modelValue': value => ctx.emit('update:modelValue', value),
    },
    {
      default: scopedProps => h(getPanel(props.type), scopedProps),
    })
  },
})
