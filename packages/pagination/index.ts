import Pagination from './src/index'
import type { SFCWithInstall } from '@/utils/types'
import '@/scss/pagination.scss'

const _Pagination: SFCWithInstall<typeof Pagination> = Pagination as SFCWithInstall<typeof Pagination>

_Pagination.install = app => {
  app.component(_Pagination.name, _Pagination)
}

export default _Pagination
