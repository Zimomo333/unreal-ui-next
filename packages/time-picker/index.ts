import TimePicker from './src/time-picker'
import CommonPicker from './src/common/picker.vue'
import TimePickPanel from './src/time-picker-com/panel-time-pick.vue'
import type { SFCWithInstall } from '@/utils/types'
export * from './src/common/date-utils'
export * from './src/common/constant'
export * from './src/common/props'
import '@/scss/time-picker.scss'

const UrTimePicker: SFCWithInstall<typeof TimePicker> = TimePicker as SFCWithInstall<typeof TimePicker>

UrTimePicker.install = app => {
  app.component(UrTimePicker.name, UrTimePicker)
}

export { CommonPicker, TimePickPanel }
export default UrTimePicker
