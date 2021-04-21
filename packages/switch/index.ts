import { App } from 'vue'
import type { SFCWithInstall } from '@/utils/types'
import Switch from './src/index.vue'
import '@/scss/switch.scss'

Switch.install = (app: App): void => {
  app.component(Switch.name, Switch)
}

const UrSwitch: SFCWithInstall<typeof Switch> = Switch

export default UrSwitch
