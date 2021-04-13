import { App } from 'vue'
import type { SFCWithInstall } from '@/utils/types'
import Checkbox from './src/checkbox.vue'
import '@/scss/checkbox.scss'

Checkbox.install = (app: App): void => {
  app.component(Checkbox.name, Checkbox)
}

const UrCheckbox: SFCWithInstall<typeof Checkbox> = Checkbox

export default UrCheckbox
