import { App } from 'vue'
import type { SFCWithInstall } from '@/utils/types'
import Select from './src/select.vue'
import Option from './src/option.vue'
import '@/scss/select.scss'

Select.install = (app: App): void => {
  app.component(Select.name, Select)
}

const _Select: SFCWithInstall<typeof Select> = Select

export { Option }
export default _Select
