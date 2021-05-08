import { App } from 'vue'
import type { SFCWithInstall } from '@/utils/types'
import Menu from './src/menu.vue'
import '@/scss/menu.scss'

Menu.install = (app: App): void => {
  app.component(Menu.name, Menu)
}

const UrMenu: SFCWithInstall<typeof Menu> = Menu

export default UrMenu

