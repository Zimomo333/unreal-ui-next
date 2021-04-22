import DatePicker from './src/date-picker'
import type { SFCWithInstall } from '@/utils/types'
import '@/scss/date-picker.scss'

const UrDatePicker: SFCWithInstall<typeof DatePicker> = DatePicker as SFCWithInstall<typeof DatePicker>

UrDatePicker.install = app => {
  app.component(UrDatePicker.name, UrDatePicker)
}


export default UrDatePicker
