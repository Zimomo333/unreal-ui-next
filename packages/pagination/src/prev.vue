<template>
  <button
    type="button"
    class="btn-prev"
    :disabled="internalDisabled"
    @click.self.prevent
  >
    <span v-if="prevText ">{{ prevText }}</span>
    <svg v-else t="1618080037820" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1988" width="14" height="14"><path d="M277.382 553.022c-23.136-22.633-23.113-59.378 0.024-82.035l383.961-421.98c23.16-22.657 60.65-22.68 83.786-0.048 23.112 22.657 23.088 59.378-0.048 82.058l-347.407 381.779 346.713 381.035c23.16 22.681 23.401 59.186 0.576 81.555-22.825 22.368-60.122 22.104-83.258-0.553l-383.052-420.97c-0.382-0.361-0.91-0.457-1.294-0.84z" fill="#707070" p-id="1989"></path></svg>
  </button>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'

export default defineComponent({
  name: 'Prev',
  props: {
    disabled: Boolean,
    currentPage: {
      type: Number,
      default: 1,
    },
    prevText: {
      type: String,
      default: '',
    },
  },
  setup(props) {
    const internalDisabled = computed(() => props.disabled || props.currentPage <= 1)
    return {
      internalDisabled,
    }
  },
})
</script>
