import TableColumn from '../table/src/tableColumn'
import type { SFCWithInstall } from '@/utils/types'
import '@/scss/table-column.scss'

const UrTableColumn: SFCWithInstall<typeof TableColumn> = TableColumn as SFCWithInstall<typeof TableColumn>

UrTableColumn.install = app => {
  app.component(UrTableColumn.name, UrTableColumn)
}

export default UrTableColumn
