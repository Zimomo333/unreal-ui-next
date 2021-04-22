import Notify from './src/notify'
import type { SFCWithInstall } from '@/utils/types'
import '@/scss/notification.scss'

const UrNotify: SFCWithInstall<typeof Notify> = Notify as SFCWithInstall<typeof Notify>

UrNotify.install = app => {
  app.config.globalProperties.$notify = UrNotify
}

export default UrNotify
