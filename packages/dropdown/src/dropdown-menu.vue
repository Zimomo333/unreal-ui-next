<template>
  <ul
    v-clickOutside:[triggerElm]="innerHide"
    :class="[size && `ur-dropdown-menu--${size}`]"
    class="ur-dropdown-menu"
    @mouseenter.stop="show"
    @mouseleave.stop="hide"
  >
    <slot></slot>
  </ul>
</template>
<script lang='ts'>
import { defineComponent, getCurrentInstance, onMounted } from 'vue'
import { ClickOutside } from '@/directives'
import { useDropdown, initDropdownDomEvent } from './useDropdown'

export default defineComponent({
  name: 'UrDropdownMenu',
  directives: {
    ClickOutside,
  },
  setup() {
    const { _urDropdownSize, urDropdown } = useDropdown()
    const size = _urDropdownSize.value

    function show() {
      if (['click', 'contextmenu'].includes(urDropdown.trigger.value)) return
      urDropdown.show?.()
    }
    function hide() {
      if (['click', 'contextmenu'].includes(urDropdown.trigger.value)) return
      _hide()
    }
    function _hide() {
      urDropdown.hide?.()
    }

    onMounted(() => {
      const dropdownMenu = getCurrentInstance()
      initDropdownDomEvent(dropdownMenu, urDropdown.triggerElm.value, urDropdown.instance)
    })

    return {
      size,
      show,
      hide,
      innerHide: _hide,
      triggerElm: urDropdown.triggerElm,
    }
  },
})
</script>

