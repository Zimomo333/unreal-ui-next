<template>
  <div
    ref="breadcrumb"
    class="ur-breadcrumb"
    aria-label="Breadcrumb"
    role="navigation"
  >
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { defineComponent, provide, ref, onMounted } from 'vue'

interface IBreadcrumbProps {
  separator: string
  separatorClass: string
}

export default defineComponent({
  name: 'UrBreadcrumb',
  props: {
    separator: {
      type: String,
      default: '/',
    },
    separatorClass: {
      type: String,
      default: '',
    },
  },
  setup(props: IBreadcrumbProps) {
    const breadcrumb = ref(null)

    provide('breadcrumb', props)

    onMounted(() => {
      const items = breadcrumb.value.querySelectorAll('.ur-breadcrumb__item')
      if (items.length) {
        items[items.length - 1].setAttribute('aria-current', 'page')
      }
    })

    return {
      breadcrumb,
    }
  },
})
</script>
