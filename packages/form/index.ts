import { App } from 'vue'
import type { SFCWithInstall } from '@/utils/types'
import Form from './src/form.vue'
import '@/scss/form.scss'

Form.install = (app: App): void => {
  app.component(Form.name, Form)
}

const UrForm: SFCWithInstall<typeof Form> = Form

export default UrForm


export * from './src/token'
