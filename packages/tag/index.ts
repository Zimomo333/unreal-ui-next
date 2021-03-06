import { App } from 'vue'
import type { SFCWithInstall } from '@/utils/types'
import Tag from './src/index.vue'
import '@/scss/tag.scss'

Tag.install = (app: App): void => {
  app.component(Tag.name, Tag)
}

const UrTag: SFCWithInstall<typeof Tag> = Tag

export default UrTag
