import { App } from 'vue'
import type { SFCWithInstall } from '@/utils/types'
import Breadcrumb from './src/index.vue'
import '@/scss/breadcrumb.scss'

Breadcrumb.install = (app: App): void => {
  app.component(Breadcrumb.name, Breadcrumb)
}

const UrBreadcrumb: SFCWithInstall<typeof Breadcrumb> = Breadcrumb

export default UrBreadcrumb
