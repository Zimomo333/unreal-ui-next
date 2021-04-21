import { App } from 'vue'
import Tooltip from './src/index'
import { SFCWithInstall } from '@/utils/types'
import '@/scss/tooltip.scss'

Tooltip.install = (app: App): void => {
  app.component(Tooltip.name, Tooltip)
}

const UrTooltip: SFCWithInstall<typeof Tooltip> = Tooltip as SFCWithInstall<typeof Tooltip>

export default UrTooltip
