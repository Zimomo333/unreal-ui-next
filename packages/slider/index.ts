import { App } from 'vue'
import type { SFCWithInstall } from '@/utils/types'
import Slider from './src/index.vue'
import '@/scss/slider.scss'

Slider.install = (app: App): void => {
  app.component(Slider.name, Slider)
}

const UrSlider: SFCWithInstall<typeof Slider> = Slider

export default UrSlider
