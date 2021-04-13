import { App } from 'vue'
import type { SFCWithInstall } from '@/utils/types'
import Radio from './src/radio.vue'
import '@/scss/radio.scss'

Radio.install = (app: App): void => {
  app.component(Radio.name, Radio)
}

const UrRadio: SFCWithInstall<typeof Radio> = Radio

export default UrRadio
