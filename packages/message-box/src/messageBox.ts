import { h, watch, render } from 'vue'
import MessageBoxConstructor from './index.vue'
import isServer from '@/utils/isServer'
import { isVNode, isString } from '@/utils/util'

import type { ComponentPublicInstance, VNode } from 'vue'
import type {
  Action,
  Callback,
  MessageBoxState,
  UrMessageBox,
  UrMessageBoxOptions,
  MessageBoxData,
} from './message-box.type'

// component default merge props & data

const messageInstance = new Map<
  ComponentPublicInstance<{ doClose: () => void; }>, // marking doClose as function
  {
    options: any
    callback: Callback
    resolve: (res: any) => void
    reject: (reason?: any) => void
  }
>()


const initInstance = (props: any, container: HTMLElement) => {
  const vnode = h(MessageBoxConstructor, props)
  render(vnode, container)
  document.body.appendChild(container.firstElementChild)
  return vnode.component
}

const genContainer = () => {
  return document.createElement('div')
}

const showMessage = (options: any) => {
  const container = genContainer()
  // Adding destruct method.
  // when transition leaves emitting `vanish` evt. so that we can do the clean job.
  options.onVanish = () => {
    // not sure if this causes mem leak, need proof to verify that.
    // maybe calling out like 1000 msg-box then close them all.
    render(null, container)
    messageInstance.delete(vm) // Remove vm to avoid mem leak.
    // here we were suppose to call document.body.removeChild(container.firstElementChild)
    // but render(null, container) did that job for us. so that we do not call that directly
  }

  options.onAction = (action: Action) => {

    const currentMsg = messageInstance.get(vm)
    let resolve: Action | { value: string; action: Action; }
    if (options.showInput) {
      resolve = { value: vm.inputValue, action }
    } else {
      resolve = action
    }
    if (options.callback) {
      options.callback(resolve, instance.proxy)
    } else {
      if (action === 'cancel' || action === 'close') {
        if (options.distinguishCancelAndClose && action !== 'cancel') {
          currentMsg.reject('close')
        } else {
          currentMsg.reject('cancel')
        }
      } else {
        currentMsg.resolve(resolve)
      }
    }
  }

  const instance = initInstance(options, container)

  // This is how we use message box programmably.
  // Maybe consider releasing a template version?
  // get component instance like v2.
  const vm = instance.proxy as ComponentPublicInstance<{
    visible: boolean
    doClose: () => void
  } & MessageBoxState>

  for (const prop in options) {
    if (options.hasOwnProperty(prop) && !vm.$props.hasOwnProperty(prop)) {
      vm[prop] = options[prop]
    }
  }

  watch(() => vm.message, (newVal, oldVal) => {
    if (isVNode(newVal)) {
      // Override slots since message is vnode type.
      instance.slots.default = () => [newVal]
    } else if(isVNode(oldVal) && !isVNode(newVal)){
      delete instance.slots.default
    }
  }, {
    immediate: true,
  })

  // change visibility after everything is settled
  vm.visible = true
  return vm
}

async function MessageBox(options: UrMessageBoxOptions): Promise<MessageBoxData>
function MessageBox(
  options: UrMessageBoxOptions | string | VNode,
): Promise<{value: string; action: Action;} | Action> {
  if (isServer) return
  let callback
  if (isString(options) || isVNode(options)) {
    options = {
      message: options,
    }
  } else {
    callback = options.callback
  }

  return new Promise((resolve, reject) => {
    const vm = showMessage(options)
    // collect this vm in order to handle upcoming events.
    messageInstance.set(vm, {
      options,
      callback,
      resolve,
      reject,
    })
  })
}

MessageBox.alert = (
  message: string,
  title: string,
  options?: UrMessageBoxOptions,
) => {
  if (typeof title === 'object') {
    options = title
    title = ''
  } else if (title === undefined) {
    title = ''
  }

  return MessageBox(
    Object.assign(
      {
        title: title,
        message: message,
        type: '',
        closeOnPressEscape: false,
        closeOnClickModal: false,
      },
      options,
      {
        boxType: 'alert',
      },
    ),
  )
}

MessageBox.confirm = (
  message: string,
  title: string,
  options?: UrMessageBoxOptions,
) => {
  if (typeof title === 'object') {
    options = title
    title = ''
  } else if (title === undefined) {
    title = ''
  }
  return MessageBox(
    Object.assign(
      {
        title: title,
        message: message,
        type: '',
        showCancelButton: true,
      },
      options,
      {
        boxType: 'confirm',
      },
    ),
  )
}

MessageBox.prompt = (
  message: string,
  title: string,
  options?: UrMessageBoxOptions,
) => {
  if (typeof title === 'object') {
    options = title
    title = ''
  } else if (title === undefined) {
    title = ''
  }
  return MessageBox(
    Object.assign(
      {
        title: title,
        message: message,
        showCancelButton: true,
        showInput: true,
        type: '',
      },
      options,
      {
        boxType: 'prompt',
      },
    ),
  )
}

MessageBox.close = () => {
  // instance.setupInstall.doClose()
  // instance.setupInstall.state.visible = false

  messageInstance.forEach((_, vm) => {
    vm.doClose()
  })

  messageInstance.clear()
}

export default MessageBox as UrMessageBox
