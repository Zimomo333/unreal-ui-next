import { App } from 'vue'
import type { SFCWithInstall } from '@/utils/types'
import Scrollbar from './src/index.vue'

Scrollbar.install = (app: App): void => {
  app.component(Scrollbar.name, Scrollbar)
}

const UrScrollbar: SFCWithInstall<typeof Scrollbar> = Scrollbar

export default UrScrollbar
