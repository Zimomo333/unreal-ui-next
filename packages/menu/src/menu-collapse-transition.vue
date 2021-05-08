<template>
  <transition mode="out-in" v-on="on">
    <slot></slot>
  </transition>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import { addClass, removeClass, hasClass } from '@/utils/dom'

export default defineComponent({
  name: 'UrMenuCollapseTransition',
  setup() {
    return {
      on: {
        beforeEnter(el) {
          el.style.opacity = 0.2
        },

        enter(el, done) {
          addClass(el, 'ur-opacity-transition')
          el.style.opacity = 1
          done()
        },

        afterEnter(el) {
          removeClass(el, 'ur-opacity-transition')
          el.style.opacity = ''
        },

        beforeLeave(el) {
          if (!el.dataset) el.dataset = {}

          if (hasClass(el, 'ur-menu--collapse')) {
            removeClass(el, 'ur-menu--collapse')
            el.dataset.oldOverflow = el.style.overflow
            el.dataset.scrollWidth = el.clientWidth
            addClass(el, 'ur-menu--collapse')
          } else {
            addClass(el, 'ur-menu--collapse')
            el.dataset.oldOverflow = el.style.overflow
            el.dataset.scrollWidth = el.clientWidth
            removeClass(el, 'ur-menu--collapse')
          }

          el.style.width = el.scrollWidth + 'px'
          el.style.overflow = 'hidden'
        },

        leave(el) {
          addClass(el, 'horizontal-collapse-transition')
          el.style.width = el.dataset.scrollWidth + 'px'
        },
      },
    }
  },
})
</script>
