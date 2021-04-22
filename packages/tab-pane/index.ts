import { App } from 'vue'
import type { SFCWithInstall } from '@/utils/types'
import TabPane from '../tabs/src/tab-pane.vue'

TabPane.install = (app: App): void => {
  app.component(TabPane.name, TabPane)
}

const UrTabPane: SFCWithInstall<typeof TabPane> = TabPane

export default UrTabPane
