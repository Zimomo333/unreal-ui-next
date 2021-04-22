<template>
  <teleport to="body" :disabled="!appendToBody">
    <transition
      name="dialog-fade"
      @after-enter="afterEnter"
      @after-leave="afterLeave"
      @before-leave="beforeLeave"
    >
      <ur-overlay
        v-show="visible"
        :mask="modal"
        :overlay-class="modalClass"
        :z-index="zIndex"
        @click="onModalClick"
      >
        <div
          ref="dialogRef"
          v-trap-focus
          :class="[
            'ur-dialog',
            {
              'is-fullscreen': fullscreen,
              'ur-dialog--center': center,
            },
            customClass,
          ]"
          aria-modal="true"
          role="dialog"
          :aria-label="title || 'dialog'"
          :style="style"
          @click.stop=""
        >
          <div class="ur-dialog__header">
            <slot name="title">
              <span class="ur-dialog__title">
                {{ title }}
              </span>
            </slot>
            <button
              v-if="showClose"
              aria-label="close"
              class="ur-dialog__headerbtn"
              type="button"
              @click="handleClose"
            >
              <svg t="1619082429459" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2019" width="14" height="14"><path d="M583.168 523.776L958.464 148.48c18.944-18.944 18.944-50.176 0-69.12l-2.048-2.048c-18.944-18.944-50.176-18.944-69.12 0L512 453.12 136.704 77.312c-18.944-18.944-50.176-18.944-69.12 0l-2.048 2.048c-19.456 18.944-19.456 50.176 0 69.12l375.296 375.296L65.536 899.072c-18.944 18.944-18.944 50.176 0 69.12l2.048 2.048c18.944 18.944 50.176 18.944 69.12 0L512 594.944 887.296 970.24c18.944 18.944 50.176 18.944 69.12 0l2.048-2.048c18.944-18.944 18.944-50.176 0-69.12L583.168 523.776z" p-id="2020" fill="#707070"></path></svg>
            </button>
          </div>
          <template v-if="rendered">
            <div class="ur-dialog__body">
              <slot></slot>
            </div>
          </template>
          <div v-if="$slots.footer" class="ur-dialog__footer">
            <slot name="footer"></slot>
          </div>
        </div>
      </ur-overlay>
    </transition>
  </teleport>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { TrapFocus } from '@/directives'
import { isValidWidthUnit } from '@/utils/validators'

import { Overlay } from '@/packages/overlay'
import {
  default as useDialog,
  CLOSE_EVENT,
  CLOSED_EVENT,
  OPEN_EVENT,
  OPENED_EVENT,
  UPDATE_MODEL_EVENT,
} from './useDialog'

import type { PropType, SetupContext } from 'vue'


export default defineComponent({
  name: 'UrDialog',
  components: {
    'ur-overlay': Overlay,
  },
  directives: {
    TrapFocus,
  },
  props: {
    appendToBody: {
      type: Boolean,
      default: false,
    },
    beforeClose: {
      type: Function as PropType<(...args: any[]) => unknown>,
    },
    destroyOnClose: {
      type: Boolean,
      default: false,
    },
    center: {
      type: Boolean,
      default: false,
    },
    customClass: {
      type: String,
      default: '',
    },
    closeOnClickModal: {
      type: Boolean,
      default: true,
    },
    closeOnPressEscape: {
      type: Boolean,
      default: true,
    },
    fullscreen: {
      type: Boolean,
      default: false,
    },
    lockScroll: {
      type: Boolean,
      default: true,
    },
    modal: {
      type: Boolean,
      default: true,
    },
    showClose: {
      type: Boolean,
      default: true,
    },
    title: {
      type: String,
      default: '',
    },
    openDelay: {
      type: Number,
      default: 0,
    },
    closeDelay: {
      type: Number,
      default: 0,
    },
    top: {
      type: String,
      default: '15vh',
    },
    modelValue: {
      type: Boolean,
      required: true,
    },
    modalClass: String,
    width: {
      type: [String, Number],
      default: '50%',
      validator: isValidWidthUnit,
    },
    zIndex: {
      type: Number,
    },
  },
  emits: [
    OPEN_EVENT,
    OPENED_EVENT,
    CLOSE_EVENT,
    CLOSED_EVENT,
    UPDATE_MODEL_EVENT,
  ],
  setup(props, ctx) {
    const dialogRef = ref<HTMLElement>(null)
    return {
      ...useDialog(props, ctx as SetupContext, dialogRef),
      dialogRef,
    }
  },
})
</script>
