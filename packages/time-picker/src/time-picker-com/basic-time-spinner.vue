<template>
  <div class="ur-time-spinner" :class="{ 'has-seconds': showSeconds }">
    <template v-if="!arrowControl">
      <ur-scrollbar
        v-for="item in spinnerItems"
        :key="item"
        :ref="getRefId(item)"
        class="ur-time-spinner__wrapper"
        wrap-style="max-height: inherit;"
        view-class="ur-time-spinner__list"
        noresize
        tag="ul"
        @mouseenter="emitSelectRange(item)"
        @mousemove="adjustCurrentSpinner(item)"
      >
        <li
          v-for="(disabled, key) in listMap[item].value"
          :key="key"
          class="ur-time-spinner__item"
          :class="{ 'active': key === timePartsMap[item].value, disabled }"
          @click="handleClick(item, { value: key, disabled })"
        >
          <template v-if="item === 'hours'">
            {{ ('0' + (amPmMode ? (key % 12 || 12) : key )).slice(-2) }}{{ getAmPmFlag(key) }}
          </template>
          <template v-else>
            {{ ('0' + key).slice(-2) }}
          </template>
        </li>
      </ur-scrollbar>
    </template>
    <template v-if="arrowControl">
      <div
        v-for="item in spinnerItems"
        :key="item"
        class="ur-time-spinner__wrapper is-arrow"
        @mouseenter="emitSelectRange(item)"
      >
        <i v-repeat-click="onDecreaseClick" class="ur-time-spinner__arrow ur-icon-arrow-up">
          <svg t="1619009223659" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4372" width="20" height="20"><path d="M724.231168 170.105856L380.529664 510.181376l341.477376 345.111552c15.1552 15.154176 15.100928 39.7824-0.116736 55.000064-15.220736 15.220736-39.844864 15.271936-54.99392-3.771392L302.629888 542.255104c-4.916224-5.499904-10.561536-11.995136-11.497472-15.504384-5.75488-14.301184-2.874368-31.873024 8.63744-46.317568l369.355776-369.3568c15.284224-11.387904 40.022016-11.447296 55.243776 3.776512 15.217664 15.220736 15.158272 39.958528-0.13312 55.251968l-0.00512 0.001024z" p-id="4373" fill="#707070"></path></svg>
        </i>
        <i v-repeat-click="onIncreaseClick" class="ur-time-spinner__arrow ur-icon-arrow-down">
          <svg t="1619009223659" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4372" width="20" height="20"><path d="M724.231168 170.105856L380.529664 510.181376l341.477376 345.111552c15.1552 15.154176 15.100928 39.7824-0.116736 55.000064-15.220736 15.220736-39.844864 15.271936-54.99392-3.771392L302.629888 542.255104c-4.916224-5.499904-10.561536-11.995136-11.497472-15.504384-5.75488-14.301184-2.874368-31.873024 8.63744-46.317568l369.355776-369.3568c15.284224-11.387904 40.022016-11.447296 55.243776 3.776512 15.217664 15.220736 15.158272 39.958528-0.13312 55.251968l-0.00512 0.001024z" p-id="4373" fill="#707070"></path></svg>
        </i>
        <ul class="ur-time-spinner__list">
          <li
            v-for="(time, key) in arrowListMap[item].value"
            :key="key"
            class="ur-time-spinner__item"
            :class="{ 'active': time === timePartsMap[item].value, 'disabled': listMap[item].value[time] }"
          >
            {{ time === undefined ? '' : ('0' + (amPmMode ? (time % 12 || 12) : time )).slice(-2) + getAmPmFlag(time) }}
          </li>
        </ul>
      </div>
    </template>
  </div>
</template>
<script lang='ts'>
import {
  defineComponent,
  ref,
  nextTick,
  computed,
  onMounted,
  Ref,
  watch,
  PropType,
} from 'vue'
import { Dayjs } from 'dayjs'
import debounce from 'lodash/debounce'
import { RepeatClick } from '@/directives'
import UrScrollbar from '@/packages/scrollbar'
import { getTimeLists } from './useTimePicker'

export default defineComponent({

  directives: {
    repeatClick: RepeatClick,
  },

  components: {
    UrScrollbar,
  },

  props: {
    role: {
      type: String,
      required: true,
    },
    spinnerDate: {
      type: Object as PropType<Dayjs>,
      required: true,
    },
    showSeconds: {
      type: Boolean,
      default: true,
    },
    arrowControl: Boolean,
    amPmMode: {
      type: String,
      default: '', // 'a': am/pm; 'A': AM/PM
    },
    disabledHours: {
      type: Function,
    },
    disabledMinutes: {
      type: Function,
    },
    disabledSeconds: {
      type: Function,
    },
  },

  emits: ['change', 'select-range', 'set-option'],

  setup(props, ctx) {
    // data
    let isScrolling = false
    const debouncedResetScroll = debounce(type => {
      isScrolling = false
      adjustCurrentSpinner(type)
    }, 200)
    const currentScrollbar = ref(null)
    const listHoursRef: Ref<Nullable<HTMLElement>> = ref(null)
    const listMinutesRef: Ref<Nullable<HTMLElement>> = ref(null)
    const listSecondsRef: Ref<Nullable<HTMLElement>> = ref(null)
    const listRefsMap = {
      hours: listHoursRef, minutes: listMinutesRef, seconds: listSecondsRef,
    }

    // computed
    const spinnerItems = computed(() => {
      const arr = ['hours', 'minutes', 'seconds']
      return props.showSeconds ? arr : arr.slice(0, 2)
    })
    const hours = computed(() => {
      return props.spinnerDate.hour()
    })
    const minutes = computed(() => {
      return props.spinnerDate.minute()
    })
    const seconds = computed(() => {
      return props.spinnerDate.second()
    })
    const timePartsMap = computed(() => ({
      hours, minutes, seconds,
    }))
    const hoursList = computed(() => {
      return getHoursList(props.role)
    })
    const minutesList = computed(() => {
      return getMinutesList(hours.value, props.role)
    })
    const secondsList = computed(() => {
      return getSecondsList(hours.value, minutes.value, props.role)
    })
    const listMap = computed(() => ({
      hours: hoursList,
      minutes: minutesList,
      seconds: secondsList,
    }))
    const arrowHourList = computed(() => {
      const hour = hours.value
      return [
        hour > 0 ? hour - 1 : undefined,
        hour,
        hour < 23 ? hour + 1 : undefined,
      ]
    })
    const arrowMinuteList = computed(() => {
      const minute = minutes.value
      return [
        minute > 0 ? minute - 1 : undefined,
        minute,
        minute < 59 ? minute + 1 : undefined,
      ]
    })
    const arrowSecondList = computed(() => {
      const second = seconds.value
      return [
        second > 0 ? second - 1 : undefined,
        second,
        second < 59 ? second + 1 : undefined,
      ]
    })
    const arrowListMap = computed(() => ({
      hours: arrowHourList,
      minutes: arrowMinuteList,
      seconds: arrowSecondList,
    }))
    const getAmPmFlag = hour => {
      let shouldShowAmPm = !!props.amPmMode
      if (!shouldShowAmPm) return ''
      let isCapital = props.amPmMode === 'A'
      // todo locale
      let content = (hour < 12) ? ' am' : ' pm'
      if (isCapital) content = content.toUpperCase()
      return content
    }

    const emitSelectRange = type => {
      if (type === 'hours') {
        ctx.emit('select-range', 0, 2)
      } else if (type === 'minutes') {
        ctx.emit('select-range', 3, 5)
      } else if (type === 'seconds') {
        ctx.emit('select-range', 6, 8)
      }
      currentScrollbar.value = type
    }

    const adjustCurrentSpinner = type => {
      adjustSpinner(type, timePartsMap.value[type].value)
    }

    // NOTE: used by datetime / date-range panel
    //       renamed from adjustScrollTop
    //       should try to refactory it
    const adjustSpinners = () => {
      adjustCurrentSpinner('hours')
      adjustCurrentSpinner('minutes')
      adjustCurrentSpinner('seconds')
    }

    const adjustSpinner = (type, value) => {
      if (props.arrowControl) return
      const el = listRefsMap[type]
      if (el.value) {
        el.value.$el.querySelector('.ur-scrollbar__wrap').scrollTop = Math.max(0, value * typeItemHeight(type))
      }
    }

    const typeItemHeight  = type => {
      const el = listRefsMap[type]
      return el.value.$el.querySelector('li').offsetHeight
    }

    const onIncreaseClick = () => {
      scrollDown(1)
    }

    const onDecreaseClick = () => {
      scrollDown(-1)
    }

    const scrollDown = step => {
      if (!currentScrollbar.value) {
        emitSelectRange('hours')
      }

      const label = currentScrollbar.value
      let now = timePartsMap.value[label].value
      const total = currentScrollbar.value === 'hours' ? 24 : 60
      now = (now + step + total) % total

      modifyDateField(label, now)
      adjustSpinner(label, now)
      nextTick(() => emitSelectRange(currentScrollbar.value))
    }

    const modifyDateField = (type, value) => {
      const list = listMap.value[type].value
      const isDisabled = list[value]
      if (isDisabled) return
      switch (type) {
        case 'hours': ctx.emit('change',
          props.spinnerDate
            .hour(value)
            .minute(minutes.value)
            .second(seconds.value))
          break
        case 'minutes': ctx.emit('change',
          props.spinnerDate
            .hour(hours.value)
            .minute(value)
            .second(seconds.value))
          break
        case 'seconds': ctx.emit('change',
          props.spinnerDate
            .hour(hours.value)
            .minute(minutes.value)
            .second(value))
          break
      }
    }

    const handleClick = (type, { value, disabled }) => {
      if (!disabled) {
        modifyDateField(type, value)
        emitSelectRange(type)
        adjustSpinner(type, value)
      }
    }

    const handleScroll = type => {
      isScrolling = true
      debouncedResetScroll(type)
      const value = Math.min(Math.round((listRefsMap[type].value.$el.querySelector('.ur-scrollbar__wrap').scrollTop - (scrollBarHeight(type) * 0.5 - 10) / typeItemHeight(type) + 3) / typeItemHeight(type)), (type === 'hours' ? 23 : 59))
      modifyDateField(type, value)
    }

    const scrollBarHeight = type => {
      return listRefsMap[type].value.$el.offsetHeight
    }

    const bindScrollEvent = () => {
      const bindFuntion = type => {
        if (listRefsMap[type].value) {
          listRefsMap[type].value.$el.querySelector('.ur-scrollbar__wrap').onscroll = () => {
          // TODO: scroll is emitted when set scrollTop programatically
          // should find better solutions in the future!
            handleScroll(type)
          }
        }
      }
      bindFuntion('hours')
      bindFuntion('minutes')
      bindFuntion('seconds')
    }

    onMounted(() => {
      nextTick(() => {
        !props.arrowControl && bindScrollEvent()
        adjustSpinners()
        // set selection on the first hour part
        if (props.role === 'start') emitSelectRange('hours')
      })
    })

    const getRefId = item => {
      return `list${item.charAt(0).toUpperCase() + item.slice(1)}Ref`
    }

    ctx.emit('set-option',[`${props.role}_scrollDown`, scrollDown])
    ctx.emit('set-option',[`${props.role}_emitSelectRange`, emitSelectRange])

    const {
      getHoursList,
      getMinutesList,
      getSecondsList,
    } = getTimeLists(
      props.disabledHours,
      props.disabledMinutes,
      props.disabledSeconds,
    )

    watch(() => props.spinnerDate, () => {
      if (isScrolling) return
      adjustSpinners()
    })

    return {
      getRefId,
      spinnerItems,
      currentScrollbar,
      hours,
      minutes,
      seconds,
      hoursList,
      minutesList,
      arrowHourList,
      arrowMinuteList,
      arrowSecondList,
      getAmPmFlag,
      emitSelectRange,
      adjustCurrentSpinner,
      typeItemHeight,
      listHoursRef,
      listMinutesRef,
      listSecondsRef,
      onIncreaseClick,
      onDecreaseClick,
      handleClick,
      secondsList,
      timePartsMap,
      arrowListMap,
      listMap,
    }
  },
})
</script>
