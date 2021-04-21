import { App } from 'vue'
import type { SFCWithInstall } from '@/utils/types'
import InputNumber from './src/index.vue'
import '@/scss/input-number.scss'

InputNumber.install = (app: App): void => {
  app.component(InputNumber.name, InputNumber)
}

const UrInputNumber: SFCWithInstall<typeof InputNumber> = InputNumber

export default UrInputNumber
