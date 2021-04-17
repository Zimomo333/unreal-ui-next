import { App } from 'vue'
import type { SFCWithInstall } from '@/utils/types'
import CarouselItem from '../carousel/src/item.vue'
import '@/scss/carousel-item.scss'

CarouselItem.install = (app: App): void => {
  app.component(CarouselItem.name, CarouselItem)
}

const UrCarouselItem: SFCWithInstall<typeof CarouselItem> = CarouselItem

export default UrCarouselItem
