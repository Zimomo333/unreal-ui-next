<template>
  <transition name="ur-message-fade" @before-leave="onClose" @after-leave="$emit('destroy')">
    <div
      v-show="visible"
      :id="id"
      :class="[
        'ur-message',
        type && !iconClass ? `ur-message--${type}` : '',
        center ? 'is-center' : '',
        showClose ? 'is-closable' : '',
        customClass,
      ]"
      :style="customStyle"
      role="alert"
      @mouseenter="clearTimer"
      @mouseleave="startTimer"
    >
      <i v-if="type || iconClass" :class="[typeClass, iconClass]"></i>
      <slot>
        <p v-if="!dangerouslyUseHTMLString" class="ur-message__content">{{ message }}</p>
        <!-- Caution here, message could've been compromised, never use user's input as message -->
        <!--  eslint-disable-next-line -->
        <p v-else class="ur-message__content" v-html="message"></p>
      </slot>
      <div v-if="showClose" class="ur-message__closeBtn ur-icon-close" @click.stop="close">
        <svg fill="#8a8a8a" t="1616246996292" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="7349" width="20" height="20"><path d="M851.456 755.419429q0 22.820571-16.018286 38.838857l-77.677714 77.677714q-16.018286 16.018286-38.838857 16.018286t-38.838857-16.018286l-168.009143-168.009143-168.009143 168.009143q-16.018286 16.018286-38.838857 16.018286t-38.838857-16.018286l-77.677714-77.677714q-16.018286-16.018286-16.018286-38.838857t16.018286-38.838857l168.009143-168.009143-168.009143-168.009143q-16.018286-16.018286-16.018286-38.838857t16.018286-38.838857l77.677714-77.677714q16.018286-16.018286 38.838857-16.018286t38.838857 16.018286l168.009143 168.009143 168.009143-168.009143q16.018286-16.018286 38.838857-16.018286t38.838857 16.018286l77.677714 77.677714q16.018286 16.018286 16.018286 38.838857t-16.018286 38.838857l-168.009143 168.009143 168.009143 168.009143q16.018286 16.018286 16.018286 38.838857z" p-id="7350"></path></svg>
      </div>
    </div>
  </transition>
</template>
<script lang="ts">
import { defineComponent, computed, ref, PropType, onMounted, onBeforeUnmount } from 'vue'
// MessageVM is an alias of vue.VNode
import type { MessageVM } from './types'
import { EVENT_CODE } from '@/utils/aria'
import { on, off } from '@/utils/dom'
const TypeMap: Indexable<string> = {
  success: 'success',
  info: 'info',
  warning: 'warning',
  error: 'error',
}
export default defineComponent({
  name: 'UrMessage',
  props: {
    customClass: { type: String, default: '' },
    center: { type: Boolean, default: false },
    dangerouslyUseHTMLString: { type: Boolean, default: false },
    duration: { type: Number, default: 3000 },
    iconClass: { type: String, default: '' },
    id: { type: String, default: '' },
    message: {
      type: [String, Object] as PropType<string | MessageVM>,
      default: '',
    },
    onClose: {
      type: Function as PropType<() => void>,
      required: true,
    },
    showClose: { type: Boolean, default: false },
    type: { type: String, default: 'info' },
    offset: { type: Number, default: 20 },
    zIndex: { type: Number, default: 0 },
  },
  emits: ['destroy'],
  setup(props) {
    const typeClass = computed(() => {
      const type = props.type
      return type && TypeMap[type]
        ? `ur-message__icon ur-icon-${TypeMap[type]}`
        : ''
    })
    const customStyle = computed(() => {
      return {
        top: `${props.offset}px`,
        zIndex: props.zIndex,
      }
    })

    const visible = ref(false)
    let timer = null

    function startTimer() {
      if (props.duration > 0) {
        timer = setTimeout(() => {
          if (visible.value) {
            close()
          }
        }, props.duration)
      }
    }

    function clearTimer() {
      clearTimeout(timer)
      timer = null
    }

    function close() {
      visible.value = false
    }

    function keydown({ code }: KeyboardEvent) {
      if (code === EVENT_CODE.esc) {
        // press esc to close the message
        if (visible.value) {
          close()
        }
      } else {
        startTimer() // resume timer
      }
    }

    onMounted(() => {
      startTimer()
      visible.value = true
      on(document, 'keydown', keydown)
    })

    onBeforeUnmount(() => {
      off(document, 'keydown', keydown)
    })

    return {
      typeClass,
      customStyle,
      visible,

      close,
      clearTimer,
      startTimer,
    }
  },
})
</script>
