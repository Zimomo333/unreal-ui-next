import { App } from 'vue'
import type { SFCWithInstall } from '@/utils/types'
import DropdownMenu from '../dropdown/src/dropdown-menu.vue'

DropdownMenu.install = (app: App): void => {
  app.component(DropdownMenu.name, DropdownMenu)
}

const UrDropdownMenu: SFCWithInstall<typeof DropdownMenu> = DropdownMenu

export default UrDropdownMenu
