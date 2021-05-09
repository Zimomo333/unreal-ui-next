import { App } from 'vue'
import type { SFCWithInstall } from '@/utils/types'
import FormItem from '../form/src/form-item.vue'

FormItem.install = (app: App): void => {
  app.component(FormItem.name, FormItem)
}

const UrFormItem: SFCWithInstall<typeof FormItem> = FormItem

export default UrFormItem
