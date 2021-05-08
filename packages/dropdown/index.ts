import { App } from 'vue'
import type { SFCWithInstall } from '@/utils/types'
import Dropdown from './src/dropdown.vue'
import '@/scss/dropdown.scss'

Dropdown.install = (app: App): void => {
  app.component(Dropdown.name, Dropdown)
}

const UrDropdown: SFCWithInstall<typeof Dropdown> = Dropdown

export default UrDropdown
