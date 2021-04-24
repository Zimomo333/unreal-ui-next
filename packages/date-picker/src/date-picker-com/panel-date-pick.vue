<template>
  <div
    class="ur-picker-panel ur-date-picker"
    :class="[{
      'has-sidebar': $slots.sidebar || hasShortcuts,
      'has-time': showTime
    }]"
  >
    <div class="ur-picker-panel__body-wrapper">
      <slot name="sidebar" class="ur-picker-panel__sidebar"></slot>
      <div v-if="hasShortcuts" class="ur-picker-panel__sidebar">
        <button
          v-for="(shortcut, key) in shortcuts"
          :key="key"
          type="button"
          class="ur-picker-panel__shortcut"
          @click="handleShortcutClick(shortcut)"
        >
          {{ shortcut.text }}
        </button>
      </div>
      <div class="ur-picker-panel__body">
        <div v-if="showTime" class="ur-date-picker__time-header">
          <span class="ur-date-picker__editor-wrap">
            <ur-input
              :placeholder="t('el.datepicker.selectDate')"
              :model-value="visibleDate"
              size="small"
              @input="val => userInputDate = val"
              @change="handleVisibleDateChange"
            />
          </span>
          <span
            v-clickoutside="handleTimePickClose"
            class="ur-date-picker__editor-wrap"
          >
            <ur-input
              :placeholder="t('el.datepicker.selectTime')"
              :model-value="visibleTime"
              size="small"
              @focus="onTimePickerInputFocus"
              @input="val => userInputTime = val"
              @change="handleVisibleTimeChange"
            />
            <time-pick-panel
              :visible="timePickerVisible"
              :format="timeFormat"
              :time-arrow-control="arrowControl"
              :parsed-value="innerDate"
              @pick="handleTimePick"
            />
          </span>
        </div>
        <div
          v-show="currentView !== 'time'"
          class="ur-date-picker__header"
          :class="{ 'ur-date-picker__header--bordered': currentView === 'year' || currentView === 'month' }"
        >
          <ur-button
            type="button"
            :aria-label="t(`el.datepicker.prevYear`)"
            class="ur-picker-panel__icon-btn ur-date-picker__prev-btn ur-icon-d-arrow-left"
            @click="prevYear_"
          >
            <svg t="1619257429231" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4273" width="20" height="20"><path d="M296.9 512l280.5-280.5c11.7-11.7 11.7-30.7 0-42.4s-30.7-11.7-42.4 0L233.3 490.8c-11.7 11.7-11.7 30.7 0 42.4L535 835c5.9 5.9 13.5 8.8 21.2 8.8 7.7 0 15.4-2.9 21.2-8.8 11.7-11.7 11.7-30.7 0-42.4L296.9 512z m493.9 280.5L510.2 512l280.5-280.5c11.7-11.7 11.7-30.7 0-42.4s-30.7-11.7-42.4 0L446.6 490.8c-11.7 11.7-11.7 30.7 0 42.4L748.3 835c5.9 5.9 13.5 8.8 21.2 8.8 7.7 0 15.4-2.9 21.2-8.8 11.8-11.8 11.8-30.7 0.1-42.5z" p-id="4274" fill="#707070"></path></svg>
          </ur-button>
          <ur-button
            v-show="currentView === 'date'"
            type="button"
            :aria-label="t(`el.datepicker.prevMonth`)"
            class="ur-picker-panel__icon-btn ur-date-picker__prev-btn ur-icon-arrow-left"
            @click="prevMonth_"
          >
            <svg t="1619257642941" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1975" width="20" height="20"><path d="M643.1 843.8c-7.7 0-15.4-2.9-21.2-8.8L320.1 533.2c-11.7-11.7-11.7-30.7 0-42.4L621.9 189c11.7-11.7 30.7-11.7 42.4 0s11.7 30.7 0 42.4L383.8 512l280.5 280.5c11.7 11.7 11.7 30.7 0 42.4-5.9 5.9-13.5 8.9-21.2 8.9z" p-id="1976" fill="#707070"></path></svg>
          </ur-button>
          <span
            role="button"
            class="ur-date-picker__header-label"
            @click="showYearPicker"
          >{{ yearLabel }}</span>
          <span
            v-show="currentView === 'date'"
            role="button"
            class="ur-date-picker__header-label"
            :class="{ active: currentView === 'month' }"
            @click="showMonthPicker"
          >{{ t(`el.datepicker.month${ month + 1 }`) }}</span>
          <ur-button
            type="button"
            :aria-label="t(`el.datepicker.nextYear`)"
            class="ur-picker-panel__icon-btn ur-date-picker__next-btn ur-icon-d-arrow-right"
            @click="nextYear_"
          >
            <svg t="1619257458675" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4666" width="20" height="20"><path d="M790.8 490.8L489 189c-11.7-11.7-30.7-11.7-42.4 0s-11.7 30.7 0 42.4L727.1 512 446.6 792.5c-11.7 11.7-11.7 30.7 0 42.4 5.9 5.9 13.5 8.8 21.2 8.8s15.4-2.9 21.2-8.8l301.7-301.8c11.8-11.6 11.8-30.6 0.1-42.3z m-213.4 0L275.7 189c-11.7-11.7-30.7-11.7-42.4 0s-11.7 30.7 0 42.4L513.8 512 233.3 792.5c-11.7 11.7-11.7 30.7 0 42.4 5.9 5.9 13.5 8.8 21.2 8.8s15.4-2.9 21.2-8.8l301.7-301.8c11.8-11.6 11.8-30.6 0-42.3z" p-id="4667" fill="#707070"></path></svg>
          </ur-button>
          <ur-button
            v-show="currentView === 'date'"
            type="button"
            :aria-label="t(`el.datepicker.nextMonth`)"
            class="ur-picker-panel__icon-btn ur-date-picker__next-btn ur-icon-arrow-right"
            @click="nextMonth_"
          >
            <svg t="1619257661610" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2242" width="20" height="20"><path d="M380.9 843.8c-7.7 0-15.4-2.9-21.2-8.8-11.7-11.7-11.7-30.7 0-42.4L640.2 512 359.7 231.5c-11.7-11.7-11.7-30.7 0-42.4s30.7-11.7 42.4 0l301.7 301.8c11.7 11.7 11.7 30.7 0 42.4L402.1 835c-5.8 5.8-13.5 8.8-21.2 8.8z" p-id="2243" fill="#707070"></path></svg>
          </ur-button>
        </div>
        <div class="ur-picker-panel__content">
          <date-table
            v-if="currentView === 'date'"
            :selection-mode="selectionMode"
            :date="innerDate"
            :parsed-value="parsedValue"
            :disabled-date="disabledDate"
            @pick="handleDatePick"
          />
          <year-table
            v-if="currentView === 'year'"
            :date="innerDate"
            :disabled-date="disabledDate"
            :parsed-value="parsedValue"
            @pick="handleYearPick"
          />
          <month-table
            v-if="currentView === 'month'"
            :date="innerDate"
            :parsed-value="parsedValue"
            :disabled-date="disabledDate"
            @pick="handleMonthPick"
          />
        </div>
      </div>
    </div>
    <div
      v-show="footerVisible && currentView === 'date'"
      class="ur-picker-panel__footer"
    >
      <ur-button
        v-show="selectionMode !== 'dates'"
        size="mini"
        type="text"
        class="ur-picker-panel__link-btn"
        @click="changeToNow"
      >
        {{ t('el.datepicker.now') }}
      </ur-button>
      <ur-button
        plain
        size="mini"
        class="ur-picker-panel__link-btn"
        @click="onConfirm"
      >
        {{ t('el.datepicker.confirm') }}
      </ur-button>
    </div>
  </div>
</template>

<script lang="ts">
import {
  extractDateFormat,
  extractTimeFormat,
  TimePickPanel,
} from '@/packages/time-picker'
import { t } from '@/locale'
import UrInput from '@/packages/input'
import { ClickOutside } from '@/directives'
import { EVENT_CODE } from '@/utils/aria'
import UrButton from '@/packages/button'
import dayjs, { Dayjs } from 'dayjs'
import DateTable from './basic-date-table.vue'
import MonthTable from './basic-month-table.vue'
import YearTable from './basic-year-table.vue'

import {
  defineComponent,
  computed,
  ref,
  PropType,
  watch,
  inject,
} from 'vue'

// todo
const timeWithinRange = () => true

export default defineComponent({
  components: {
    DateTable, UrInput, UrButton, TimePickPanel, MonthTable, YearTable,
  },

  directives: { clickoutside: ClickOutside },
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
    parsedValue: {
      type: [Object, Array] as PropType<Dayjs | Dayjs[]>,
    },
    format: {
      type: String,
      default: '',
    },
    type: {
      type: String,
      required: true,
    },
  },
  emits: ['pick', 'set-picker-option'],
  setup(props, ctx) {
    const innerDate = ref(dayjs())

    const month = computed(() =>  {
      return innerDate.value.month()
    })

    const year = computed(() => {
      return innerDate.value.year()
    })

    const selectableRange = ref([])
    const userInputDate = ref(null)
    const userInputTime = ref(null)
    // todo update to disableHour
    const checkDateWithinRange = date => {
      return selectableRange.value.length > 0
        ? timeWithinRange(date, selectableRange.value, props.format || 'HH:mm:ss')
        : true
    }
    const formatEmit = (emitDayjs: Dayjs) => {
      if (showTime.value) return emitDayjs.millisecond(0)
      if (defaultTime) {
        const defaultTimeD = dayjs(defaultTime)
        return defaultTimeD.year(emitDayjs.year()).month(emitDayjs.month()).date(emitDayjs.date())
      }
      return emitDayjs.startOf('day')
    }
    const emit = (value, ...args) => {
      if (!value) {
        ctx.emit('pick', value, ...args)
      } else if (Array.isArray(value)) {
        const dates = value.map(formatEmit)
        ctx.emit('pick', dates, ...args)
      } else {
        ctx.emit('pick', formatEmit(value), ...args)
      }
      userInputDate.value = null
      userInputTime.value = null
    }
    const handleDatePick = (value: Dayjs) => {
      if (selectionMode.value === 'day') {
        let newDate = props.parsedValue ? (props.parsedValue as Dayjs).year(value.year()).month(value.month()).date(value.date()) : value
        // change default time while out of selectableRange
        if (!checkDateWithinRange(newDate)) {
          newDate = (selectableRange.value[0][0] as Dayjs).year(value.year()).month(value.month()).date(value.date())
        }
        innerDate.value = newDate
        emit(newDate, showTime.value)
      } else if (selectionMode.value === 'week') {
        emit(value.date)
      } else if (selectionMode.value === 'dates') {
        emit(value, true) // set false to keep panel open
      }
    }
    const prevMonth_ = () => {
      innerDate.value = innerDate.value.subtract(1, 'month')
    }

    const nextMonth_ = () => {
      innerDate.value = innerDate.value.add(1, 'month')
    }

    const prevYear_ = () => {
      if (currentView.value === 'year') {
        innerDate.value = innerDate.value.subtract(10, 'year')
      } else {
        innerDate.value = innerDate.value.subtract(1, 'year')
      }
    }

    const nextYear_ = () => {
      if (currentView.value === 'year') {
        innerDate.value = innerDate.value.add(10, 'year')
      } else {
        innerDate.value = innerDate.value.add(1, 'year')
      }
    }

    const currentView = ref('date')

    const yearLabel = computed(() => {
      const yearTranslation = t('el.datepicker.year')
      if (currentView.value === 'year') {
        const startYear = Math.floor(year.value / 10) * 10
        if (yearTranslation) {
          return startYear + ' ' + yearTranslation + ' - ' + (startYear + 9) + ' ' + yearTranslation
        }
        return startYear + ' - ' + (startYear + 9)
      }
      return year.value + ' ' + yearTranslation
    })

    const handleShortcutClick = shortcut => {
      if (shortcut.value) {
        emit(dayjs(shortcut.value))
        return
      }
      if (shortcut.onClick) {
        shortcut.onClick(ctx)
      }
    }

    const selectionMode = computed(() => {
      if (['week', 'month', 'year', 'dates'].includes(props.type)) {
        return props.type
      }
      return 'day'
    })

    watch(() => selectionMode.value, val => {
      if(['month', 'year'].includes(val)) {
        currentView.value = val
        return
      }
      currentView.value = 'date'
    }, { immediate: true })

    const hasShortcuts = computed(() => !!shortcuts.length)

    const handleMonthPick = month => {
      innerDate.value = innerDate.value.startOf('month').month(month)
      if (selectionMode.value === 'month') {
        emit(innerDate.value)
      } else {
        currentView.value = 'date'
      }
    }

    const handleYearPick = year => {
      if (selectionMode.value === 'year') {
        innerDate.value = innerDate.value.startOf('year').year(year)
        emit(innerDate.value)
      }
      else {
        innerDate.value = innerDate.value.year(year)
        currentView.value = 'month'
      }
    }

    const showMonthPicker = () => {
      currentView.value = 'month'
    }

    const showYearPicker = () => {
      currentView.value = 'year'
    }

    const showTime = computed(() => props.type === 'datetime' || props.type === 'datetimerange')

    const footerVisible = computed(() => {
      return showTime.value || selectionMode.value === 'dates'
    })

    const onConfirm = () => {
      if (selectionMode.value === 'dates') {
        emit(props.parsedValue)
      } else {
        // deal with the scenario where: user opens the date time picker, then confirm without doing anything
        let result = props.parsedValue as Dayjs
        if (!result) {
          const defaultTimeD = dayjs(defaultTime)
          const defaultValueD = getDefaultValue()
          result = defaultTimeD.year(defaultValueD.year()).month(defaultValueD.month()).date(defaultValueD.date())
        }
        innerDate.value = result
        emit(result)
      }

    }

    const changeToNow = () => {
      // NOTE: not a permanent solution
      //       consider disable "now" button in the future
      const now = dayjs()
      const nowDate = now.toDate()
      if ((!disabledDate || !disabledDate(nowDate)) && checkDateWithinRange(nowDate)) {
        innerDate.value = dayjs()
        emit(innerDate.value)
      }
    }

    const timeFormat = computed(() => {
      return extractTimeFormat(props.format)
    })

    const dateFormat = computed(() => {
      return extractDateFormat(props.format)
    })

    const visibleTime = computed(() => {
      if (userInputTime.value) return userInputTime.value
      if (!props.parsedValue && !defaultValue) return
      return ((props.parsedValue || innerDate.value) as Dayjs).format(timeFormat.value)
    })

    const visibleDate = computed(() => {
      if (userInputDate.value) return userInputDate.value
      if (!props.parsedValue && !defaultValue) return
      return ((props.parsedValue || innerDate.value) as Dayjs).format(dateFormat.value)
    })

    const timePickerVisible = ref(false)
    const onTimePickerInputFocus = () => {
      timePickerVisible.value = true
    }
    const handleTimePickClose = () => {
      timePickerVisible.value = false
    }

    const handleTimePick = (value, visible, first) => {
      const newDate = props.parsedValue ? (props.parsedValue as Dayjs).hour(value.hour()).minute(value.minute()).second(value.second()) : value
      innerDate.value = newDate
      emit(innerDate.value, true)
      if (!first) {
        timePickerVisible.value = visible
      }
    }

    const handleVisibleTimeChange = value => {
      const newDate = dayjs(value, timeFormat.value)
      if (newDate.isValid() && checkDateWithinRange(newDate)) {
        innerDate.value = newDate.year(innerDate.value.year()).month(innerDate.value.month()).date(innerDate.value.date())
        userInputTime.value = null
        timePickerVisible.value = false
        emit(innerDate.value, true)
      }
    }

    const handleVisibleDateChange = value => {
      const newDate = dayjs(value, dateFormat.value)
      if (newDate.isValid()) {
        if (disabledDate  && disabledDate(newDate.toDate())) {
          return
        }
        innerDate.value = newDate.hour(innerDate.value.hour()).minute(innerDate.value.minute()).second(innerDate.value.second())
        userInputDate.value = null
        emit(innerDate.value, true)
      }
    }

    const isValidValue = date_ => {
      return date_.isValid() && (
        disabledDate
          ? !disabledDate(date_.toDate())
          : true
      )
    }

    const formatToString = value => {
      if (selectionMode.value === 'dates') {
        return value.map(_ => _.format(props.format))
      }
      return value.format(props.format)
    }

    const parseUserInput = value => {
      return dayjs(value, props.format)
    }

    const getDefaultValue = () => {
      return dayjs(defaultValue)
    }

    const handleKeydown = event => {
      const { code, keyCode } = event
      const list = [EVENT_CODE.up, EVENT_CODE.down, EVENT_CODE.left, EVENT_CODE.right]
      if (props.visible && !timePickerVisible.value) {
        if (list.includes(code)) {
          handleKeyControl(keyCode)
          event.stopPropagation()
          event.preventDefault()
        }
        if (code === EVENT_CODE.enter
          && userInputDate.value === null
            && userInputTime.value === null
        ) { // Enter
          emit(innerDate, false)
        }
      }
    }

    const handleKeyControl = keyCode => {
      const mapping = {
        'year': {
          38: -4, 40: 4, 37: -1, 39: 1, offset: (date, step) => date.setFullYear(date.getFullYear() + step),
        },
        'month': {
          38: -4, 40: 4, 37: -1, 39: 1, offset: (date, step) => date.setMonth(date.getMonth() + step),
        },
        'week': {
          38: -1, 40: 1, 37: -1, 39: 1, offset: (date, step) => date.setDate(date.getDate() + step * 7),
        },
        'day': {
          38: -7, 40: 7, 37: -1, 39: 1, offset: (date, step) => date.setDate(date.getDate() + step),
        },
      }

      const newDate = innerDate.value.toDate()
      while (Math.abs(innerDate.value.diff(newDate, 'year', true)) < 1) {
        const map = mapping[selectionMode.value]
        map.offset(newDate, map[keyCode])
        if (disabledDate && disabledDate(newDate)) {
          continue
        }
        const result = dayjs(newDate)
        innerDate.value = result
        ctx.emit('pick', result, true)
        break
      }
    }

    ctx.emit('set-picker-option', ['isValidValue', isValidValue])
    ctx.emit('set-picker-option', ['formatToString', formatToString])
    ctx.emit('set-picker-option', ['parseUserInput', parseUserInput])
    ctx.emit('set-picker-option',['handleKeydown', handleKeydown])

    const pickerBase = inject('EP_PICKER_BASE') as any
    const { shortcuts, disabledDate, cellClassName, defaultTime, defaultValue, arrowControl } = pickerBase.props

    watch(() => props.parsedValue, val => {
      if (val) {
        if (selectionMode.value === 'dates') return
        if (Array.isArray(val)) return
        innerDate.value = val
      } else {
        innerDate.value = getDefaultValue()
      }
    }, { immediate: true })

    return {
      handleTimePick,
      handleTimePickClose,
      onTimePickerInputFocus,
      timePickerVisible,
      visibleTime,
      visibleDate,
      showTime,
      changeToNow,
      onConfirm,
      footerVisible,
      handleYearPick,
      showMonthPicker,
      showYearPicker,
      handleMonthPick,
      hasShortcuts,
      shortcuts,
      arrowControl,
      disabledDate,
      cellClassName,
      selectionMode,
      handleShortcutClick,
      prevYear_,
      nextYear_,
      prevMonth_,
      nextMonth_,
      innerDate,
      t,
      yearLabel,
      currentView,
      month,
      handleDatePick,
      handleVisibleTimeChange,
      handleVisibleDateChange,
      timeFormat,
      userInputTime,
      userInputDate,
    }
  },
})
</script>
