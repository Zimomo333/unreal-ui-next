import { Option } from '@/packages/select'
import type { SFCWithInstall } from '@/utils/types'

const UrOption: SFCWithInstall<typeof Option> = Option as SFCWithInstall<typeof Option>

UrOption.install = app => {
  app.component(UrOption.name, UrOption)
}

export default UrOption
