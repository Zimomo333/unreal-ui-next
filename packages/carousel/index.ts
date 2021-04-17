import { App } from 'vue'
import type { SFCWithInstall } from '@/utils/types'
import Carousel from './src/main.vue'
import '@/scss/carousel.scss'

Carousel.install = (app: App): void => {
  app.component(Carousel.name, Carousel)
}

const UrCarousel: SFCWithInstall<typeof Carousel> = Carousel

export default UrCarousel
