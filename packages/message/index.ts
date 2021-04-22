import Message from './src/message'
import type { SFCWithInstall } from '@/utils/types'
import '@/scss/message.scss'

const UrMessage: SFCWithInstall<typeof Message> = Message as SFCWithInstall<typeof Message>

UrMessage.install = app => {
  app.config.globalProperties.$message = UrMessage
}

export default UrMessage
