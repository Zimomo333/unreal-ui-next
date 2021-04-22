import { App } from 'vue'
import type { SFCWithInstall } from '@/utils/types'
import Tabs from './src/tabs.vue'
import '@/scss/tabs.scss'

Tabs.install = (app: App): void => {
  app.component(Tabs.name, Tabs)
}

const UrTabs: SFCWithInstall<typeof Tabs> = Tabs

export default UrTabs
