import { App } from 'vue'
import type { SFCWithInstall } from '@/utils/types'
import Submenu from '../menu/src/submenu.vue'

Submenu.install = (app: App): void => {
  app.component(Submenu.name, Submenu)
}

const UrSubmenu: SFCWithInstall<typeof Submenu> = Submenu

export default UrSubmenu
