import type { App } from 'vue'
import type { SFCWithInstall } from '@/utils/types'
import Popper from './src/index.vue'

Popper.install = (app: App): void => {
  app.component(Popper.name, Popper)
}

const UrPopper: SFCWithInstall<typeof Popper> = Popper

export default UrPopper

export { default as defaultProps, Effect } from './src/use-popper/defaults'
export type { Placement, Options } from '@popperjs/core'
export type { TriggerType, IPopperOptions, PopperInstance } from './src/use-popper/defaults'
export { default as usePopper } from './src/use-popper/index'
export * from './src/renderers/index'
