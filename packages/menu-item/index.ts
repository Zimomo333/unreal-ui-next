import { App } from 'vue'
import type { SFCWithInstall } from '@/utils/types'
import MenuItem from '../menu/src/menuItem.vue'

MenuItem.install = (app: App): void => {
  app.component(MenuItem.name, MenuItem)
}

const UrMenuItem: SFCWithInstall<typeof MenuItem> = MenuItem

export default UrMenuItem

