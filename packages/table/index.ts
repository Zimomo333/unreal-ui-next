import { App } from 'vue'
import type { SFCWithInstall } from '@/utils/types'
import Table from './src/table.vue'
import '@/scss/table.scss'

Table.install = (app: App): void => {
  app.component(Table.name, Table)
}

const UrTable: SFCWithInstall<typeof Table> = Table

export default UrTable
