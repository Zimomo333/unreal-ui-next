import { App } from 'vue'
import type { SFCWithInstall } from '@/utils/types'
import Button from './src/button.vue'
import '@/scss/button.scss'

Button.install = (app: App): void => {
  app.component(Button.name, Button)
}

const UrButton: SFCWithInstall<typeof Button> = Button

export default UrButton
