import { App } from 'vue'
import type { SFCWithInstall } from '@element-plus/utils/types'
import CheckboxGroup from '../checkbox/src/checkbox-group.vue'

CheckboxGroup.install = (app: App): void => {
  app.component(CheckboxGroup.name, CheckboxGroup)
}

const UrCheckboxGroup: SFCWithInstall<typeof CheckboxGroup> = CheckboxGroup

export default UrCheckboxGroup
