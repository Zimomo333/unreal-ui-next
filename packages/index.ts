import { App } from 'vue'
import type { SFCWithInstall } from '@/utils/types'
import '@/scss/index.scss'
import Button from './button'
import Tag from './tag'
import Radio from './radio'
import RadioGroup from './radio-group'
import Check from './checkbox'
import CheckGroup from './checkbox-group'
import Input from './input'
import Breadcrumb from './breadcrumb'
import BreadcrumbItem from './breadcrumb-item'
import Select from './select'
import Option from './option'

// 存储组件列表
const components = [
  Button,
  Tag,
  Radio,
  RadioGroup,
  Check,
  CheckGroup,
  Input,
  Breadcrumb,
  BreadcrumbItem,
  Select,
  Option,
];

// 定义 install 方法，接收 Vue 作为参数。如果使用 use 注册插件，则所有的组件都将被注册
const install = (app: App): void => {
  // 遍历注册全局组件
  components.map((component) => app.component(component.name, component));
};

export const UrButton: SFCWithInstall<typeof Button> = Button
export const UrTag: SFCWithInstall<typeof Tag> = Tag
export const UrRadio: SFCWithInstall<typeof Radio> = Radio
export const UrRadioGroup: SFCWithInstall<typeof RadioGroup> = RadioGroup
export const UrCheck: SFCWithInstall<typeof Check> = Check
export const UrCheckGroup: SFCWithInstall<typeof CheckGroup> = CheckGroup
export const UrInput: SFCWithInstall<typeof Input> = Input
export const UrBreadcrumb: SFCWithInstall<typeof Breadcrumb> = Breadcrumb
export const UrBreadcrumbItem: SFCWithInstall<typeof BreadcrumbItem> = BreadcrumbItem
export const UrSelect: SFCWithInstall<typeof Select> = Select
export const UrOption: SFCWithInstall<typeof Option> = Option

export default {
  // 导出的对象必须具有 install，才能被 Vue.use() 方法安装
  install,
  // 以下是具体的组件列表
  UrButton,
  UrTag,
  UrRadio,
  UrRadioGroup,
  UrCheck,
  UrCheckGroup,
  UrInput,
  UrBreadcrumb,
  UrBreadcrumbItem,
  UrSelect,
  UrOption,
};