import { App } from 'vue'
import type { SFCWithInstall } from '@/utils/types'
import RadioGroup from '../radio/src/radio-group.vue'

RadioGroup.install = (app: App): void => {
  app.component(RadioGroup.name, RadioGroup)
}

const UrRadioGroup: SFCWithInstall<typeof RadioGroup> = RadioGroup

export default UrRadioGroup
