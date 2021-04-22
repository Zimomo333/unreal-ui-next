<template>
  <transition name="ur-notification-fade" @before-leave="onClose" @after-leave="$emit('destroy')">
    <div
      v-show="visible"
      :id="id"
      :class="['ur-notification', customClass, horizontalClass]"
      :style="positionStyle"
      role="alert"
      @mouseenter="clearTimer"
      @mouseleave="startTimer"
      @click="onClick"
    >
      <i
        v-if="type || iconClass"
        class="ur-notification__icon"
        :class="[typeClass, iconClass]"
      ></i>
      <div
        class="ur-notification__group"
        :class="{ 'is-with-icon': typeClass || iconClass }"
      >
        <h2 class="ur-notification__title" v-text="title"></h2>
        <div v-show="message" class="ur-notification__content" :style="!!title ? null : 'margin: 0'">
          <slot>
            <p v-if="!dangerouslyUseHTMLString">{{ message }}</p>
            <!-- Caution here, message could've been compromized, nerver use user's input as message -->
            <!-- eslint-disable-next-line -->
            <p v-else v-html="message"></p>
          </slot>
        </div>
        <div
          v-if="showClose"
          class="ur-notification__closeBtn ur-icon-close"
          @click.stop="close"
        >
          <svg t="1619082429459" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2019" width="14" height="14"><path d="M583.168 523.776L958.464 148.48c18.944-18.944 18.944-50.176 0-69.12l-2.048-2.048c-18.944-18.944-50.176-18.944-69.12 0L512 453.12 136.704 77.312c-18.944-18.944-50.176-18.944-69.12 0l-2.048 2.048c-19.456 18.944-19.456 50.176 0 69.12l375.296 375.296L65.536 899.072c-18.944 18.944-18.944 50.176 0 69.12l2.048 2.048c18.944 18.944 50.176 18.944 69.12 0L512 594.944 887.296 970.24c18.944 18.944 50.176 18.944 69.12 0l2.048-2.048c18.944-18.944 18.944-50.176 0-69.12L583.168 523.776z" p-id="2020" fill="#707070"></path></svg>        </div>
      </div>
    </div>
  </transition>
</template>
<script lang="ts">
import { defineComponent, computed, ref, onMounted, onBeforeUnmount } from 'vue'
// notificationVM is an alias of vue.VNode
import { EVENT_CODE } from '@/utils/aria'
import { on, off } from '@/utils/dom'

import type { PropType } from 'vue'
import type { NotificationVM, Position } from './notification.type'

const TypeMap: Indexable<string> = {
  success: 'success',
  info: 'info',
  warning: 'warning',
  error: 'error',
}

export default defineComponent({
  name: 'UrNotification',
  props: {
    customClass: { type: String, default: '' },
    dangerouslyUseHTMLString: { type: Boolean, default: false },
    duration: { type: Number, default: 4500 },
    iconClass: { type: String, default: '' },
    id: { type: String, default: '' },
    message: {
      type: [String, Object] as PropType<string | NotificationVM>,
      default: '',
    },
    offset: { type: Number, default: 0 },
    onClick: {
      type: Function as PropType<() => void>,
      default: () => void 0,
    },
    onClose: {
      type: Function as PropType<() => void>,
      required: true,
    },
    position: {
      type: String as PropType<Position>,
      default: 'top-right',
    },
    showClose: { type: Boolean, default: true },
    title: { type: String, default: '' },
    type: { type: String, default: '' },
    zIndex: { type: Number, default: 0 },
  },
  emits: ['destroy'],

  setup(props) {
    const visible = ref(false)
    let timer = null

    const typeClass = computed(() => {
      const type = props.type
      return type && TypeMap[type] ? `ur-icon-${TypeMap[type]}` : ''
    })

    const horizontalClass = computed(() => {
      return props.position.indexOf('right') > 1 ? 'right' : 'left'
    })

    const verticalProperty = computed(() => {
      return props.position.startsWith('top') ? 'top' : 'bottom'
    })

    const positionStyle = computed(() => {
      return {
        [verticalProperty.value]: `${props.offset}px`,
      }
    })

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

    function onKeydown({ code }: KeyboardEvent) {
      if (code === EVENT_CODE.delete || code === EVENT_CODE.backspace) {
        clearTimer() // press delete/backspace clear timer
      } else if (code === EVENT_CODE.esc) {
        // press esc to close the notification
        if (visible.value) {
          close()
        }
      } else {
        startTimer() // resume timer
      }
    }

    // lifecycle
    onMounted(() => {
      startTimer()
      visible.value = true
      on(document, 'keydown', onKeydown)
    })

    onBeforeUnmount(() => {
      off(document, 'keydown', onKeydown)
    })

    return {
      horizontalClass,
      typeClass,
      positionStyle,
      visible,

      close,
      clearTimer,
      startTimer,
    }
  },
})
</script>
