import { App } from 'vue'
import type { SFCWithInstall } from '@/utils/types'
import DropdownItem from '../dropdown/src/dropdown-item.vue'

DropdownItem.install = (app: App): void => {
  app.component(DropdownItem.name, DropdownItem)
}

const UrDropdownItem: SFCWithInstall<typeof DropdownItem> = DropdownItem

export default UrDropdownItem
