import MessageBox from './src/messageBox'
import type { SFCWithInstall } from '@/utils/types'
import '@/scss/message-box.scss'

const UrMessageBox: SFCWithInstall<typeof MessageBox> = MessageBox as SFCWithInstall<typeof MessageBox>

UrMessageBox.install = app => {
  app.config.globalProperties.$msgbox = UrMessageBox
  app.config.globalProperties.$messageBox = UrMessageBox
  app.config.globalProperties.$alert = UrMessageBox.alert
  app.config.globalProperties.$confirm = UrMessageBox.confirm
  app.config.globalProperties.$prompt = UrMessageBox.prompt
}

export default UrMessageBox
