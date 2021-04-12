<template>
  <span
    v-if="!disableTransitions"
    :class="classes"
    :style="{ backgroundColor: color }"
    @click="handleClick"
  >
    <slot></slot>
    <svg v-if="closable" class="ur-tag__close" @click="handleClose" fill="#707070" t="1616421224350" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2058" width="200" height="200"><path d="M810.666667 273.493333L750.506667 213.333333 512 451.84 273.493333 213.333333 213.333333 273.493333 451.84 512 213.333333 750.506667 273.493333 810.666667 512 572.16 750.506667 810.666667 810.666667 750.506667 572.16 512z" p-id="2059"></path></svg>
  </span>
  <transition v-else name="ur-zoom-in-center">
    <span
      :class="classes"
      :style="{ backgroundColor: color }"
      @click="handleClick"
    >
      <slot></slot>
    <svg v-if="closable" class="ur-tag__close" @click="handleClose" fill="#707070" t="1616421224350" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2058" width="200" height="200"><path d="M810.666667 273.493333L750.506667 213.333333 512 451.84 273.493333 213.333333 213.333333 273.493333 451.84 512 213.333333 750.506667 273.493333 810.666667 512 572.16 750.506667 810.666667 810.666667 750.506667 572.16 512z" p-id="2059"></path></svg>
    </span>
  </transition>
</template>

<script lang='ts'>
import { computed, defineComponent } from 'vue'
import { useGlobalConfig } from '@/utils/util'
import { isValidComponentSize } from '@/utils/validators'

import type { PropType } from 'vue'

export default defineComponent({
  name: 'UrTag',
  props: {
    closable: Boolean,
    type: {
      type: String,
      default: '',
    },
    hit: Boolean,
    disableTransitions: Boolean,
    color: {
      type: String,
      default: '',
    },
    size: {
      type: String as PropType<ComponentSize>,
      validator: isValidComponentSize,
    },
    effect: {
      type: String,
      default: 'light',
      validator: (val: string): boolean => {
        return ['dark', 'light', 'plain'].indexOf(val) !== -1
      },
    },
  },
  emits: ['close','click'],
  setup(props, ctx) {
    const ELEMENT = useGlobalConfig()

    const tagSize = computed(() => {
      return props.size || ELEMENT.size
    })
    const classes = computed(() => {
      const { type, hit, effect } = props
      return [
        'ur-tag',
        type ? `ur-tag--${type}` : '',
        tagSize.value ? `ur-tag--${tagSize.value}` : '',
        effect ? `ur-tag--${effect}` : '',
        hit && 'is-hit',
      ]
    })

    // methods
    const handleClose = event => {
      event.stopPropagation()
      ctx.emit('close', event)
    }

    const handleClick = event => {
      ctx.emit('click', event)
    }

    return {
      tagSize,
      classes,
      handleClose,
      handleClick,
    }
  },
})
</script>
