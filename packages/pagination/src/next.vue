<template>
  <button
    type="button"
    class="btn-next"
    :disabled="internalDisabled"
    @click.self.prevent
  >
    <span v-if="nextText">{{ nextText }}</span>
    <svg v-else t="1618080051597" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2118" width="14" height="14"><path d="M730.564 550.46c-0.36 0.359-0.856 0.449-1.214 0.788l-359.113 394.661c-21.692 21.242-56.657 21.489-78.054 0.518-21.398-20.972-21.173-55.193 0.54-76.459l325.045-357.221-325.698-357.92c-21.69-21.263-21.713-55.689-0.045-76.929 21.691-21.218 56.837-21.196 78.55 0.045l359.966 395.608c21.691 21.241 21.713 55.689 0.022 76.908z" fill="#707070" p-id="2119"></path></svg>
  </button>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
export default defineComponent({
  name: 'Next',
  props: {
    disabled: Boolean,
    currentPage: {
      type: Number,
      default: 1,
    },
    pageCount: {
      type: Number,
      default: 50,
    },
    nextText: {
      type: String,
      default: '',
    },
  },
  setup(props) {
    const internalDisabled = computed(() => props.disabled
      || props.currentPage === props.pageCount
      || props.pageCount === 0,
    )

    return {
      internalDisabled,
    }
  },
})
</script>
