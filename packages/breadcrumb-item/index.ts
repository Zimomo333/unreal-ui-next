import { App } from 'vue'
import type { SFCWithInstall } from '@/utils/types'
import BreadcrumbItem from '../breadcrumb/src/item.vue'
import '@/scss/breadcrumb-item.scss'

BreadcrumbItem.install = (app: App): void => {
  app.component(BreadcrumbItem.name, BreadcrumbItem)
}

const UrBreadcrumbItem: SFCWithInstall<typeof BreadcrumbItem> = BreadcrumbItem

export default UrBreadcrumbItem
