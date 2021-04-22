import { App } from 'vue'
import type { SFCWithInstall } from '@/utils/types'
import TimeSelect from './src/time-select.vue'
import '@/scss/time-select.scss'

TimeSelect.install = (app: App): void => {
  app.component(TimeSelect.name, TimeSelect)
}

const UrTimeSelect: SFCWithInstall<typeof TimeSelect> = TimeSelect

export default UrTimeSelect
