import { App } from 'vue'
import type { SFCWithInstall } from '@/utils/types'
import Input from './src/index.vue'
import '@/scss/input.scss'

Input.install = (app: App): void => {
  app.component(Input.name, Input)
}

const UrInput: SFCWithInstall<typeof Input> = Input

export default UrInput
