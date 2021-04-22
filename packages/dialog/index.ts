import { App } from 'vue'
import type { SFCWithInstall } from '@/utils/types'
import Dialog from './src/index.vue'
import '@/scss/dialog.scss'

Dialog.install = (app: App): void => {
  app.component(Dialog.name, Dialog)
}

const UrDialog: SFCWithInstall<typeof Dialog> = Dialog

export default UrDialog
export { default as useDialog } from './src/useDialog'
