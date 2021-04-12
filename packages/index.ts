import { App } from 'vue'
import type { SFCWithInstall } from '@/utils/types'
import '@/scss/index.scss'
import Button from './button'
import Tag from './tag'

// 存储组件列表
const components = [
  Button,
  Tag,
];

// 定义 install 方法，接收 Vue 作为参数。如果使用 use 注册插件，则所有的组件都将被注册
const install = (app: App): void => {
  // 遍历注册全局组件
  components.map((component) => app.component(component.name, component));
};

const _Button: SFCWithInstall<typeof Button> = Button
const _Tag: SFCWithInstall<typeof Button> = Tag

export default {
  // 导出的对象必须具有 install，才能被 Vue.use() 方法安装
  install,
  // 以下是具体的组件列表
  _Button,
  _Tag,
};
