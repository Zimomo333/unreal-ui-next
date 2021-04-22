import { App } from 'vue'
import type { SFCWithInstall } from '@/utils/types'
import Progress from './src/index.vue'
import '@/scss/progress.scss'

Progress.install = (app: App): void => {
  app.component(Progress.name, Progress)
}

const UrProgress: SFCWithInstall<typeof Progress> = Progress

export default UrProgress
