<template>
  <transition name="ur-scrollbar-fade">
    <div
      v-show="visible"
      ref="instance"
      :class="['ur-scrollbar__bar', 'is-' + bar.key]"
      @mousedown="clickTrackHandler"
    >
      <div
        ref="thumb"
        class="ur-scrollbar__thumb"
        :style="thumbStyle"
        @mousedown="clickThumbHandler"
      ></div>
    </div>
  </transition>
</template>

<script lang="ts">
import { computed, defineComponent, inject, onBeforeUnmount, onMounted, ref, Ref } from 'vue'
import { off, on } from '@/utils/dom'
import { BAR_MAP, renderThumbStyle } from './util'

export default defineComponent({
  name: 'Bar',
  props: {
    vertical: Boolean,
    size: String,
    move: Number,
  },
  setup(props) {
    const instance = ref(null)
    const thumb = ref(null)
    const scrollbar = inject('scrollbar', {} as Ref<Nullable<HTMLElement>>)
    const wrap = inject('scrollbar-wrap', {} as Ref<Nullable<HTMLElement>>)
    const bar = computed(() => BAR_MAP[props.vertical ? 'vertical' : 'horizontal'])
    const barStore = ref({})
    const cursorDown = ref(null)
    const visible = ref(false)
    let onselectstartStore = null

    const clickThumbHandler = e => {
      // prevent click event of middle and right button
      e.stopPropagation()
      if (e.ctrlKey || [1, 2].includes(e.button)) {
        return
      }
      startDrag(e)
      barStore.value[bar.value.axis] = (e.currentTarget[bar.value.offset] - (e[bar.value.client] - e.currentTarget.getBoundingClientRect()[bar.value.direction]))
    }

    const clickTrackHandler = e => {
      const offset = Math.abs(e.target.getBoundingClientRect()[bar.value.direction] - e[bar.value.client])
      const thumbHalf = (thumb.value[bar.value.offset] / 2)
      const thumbPositionPercentage = ((offset - thumbHalf) * 100 / instance.value[bar.value.offset])

      wrap.value[bar.value.scroll] = (thumbPositionPercentage * wrap.value[bar.value.scrollSize] / 100)
    }

    const startDrag = e => {
      e.stopImmediatePropagation()
      cursorDown.value = true
      on(document, 'mousemove', mouseMoveDocumentHandler)
      on(document, 'mouseup', mouseUpDocumentHandler)
      onselectstartStore = document.onselectstart
      document.onselectstart = () => false
    }

    const mouseMoveDocumentHandler = e => {
      if (cursorDown.value === false) return
      const prevPage = barStore.value[bar.value.axis]

      if (!prevPage) return

      const offset = ((instance.value.getBoundingClientRect()[bar.value.direction] - e[bar.value.client]) * -1)
      const thumbClickPosition = (thumb.value[bar.value.offset] - prevPage)
      const thumbPositionPercentage = ((offset - thumbClickPosition) * 100 / instance.value[bar.value.offset])
      wrap.value[bar.value.scroll] = (thumbPositionPercentage * wrap.value[bar.value.scrollSize] / 100)
    }

    const mouseUpDocumentHandler = () => {
      cursorDown.value = false
      barStore.value[bar.value.axis] = 0
      off(document, 'mousemove', mouseMoveDocumentHandler)
      document.onselectstart = onselectstartStore
    }

    const thumbStyle = computed(() => renderThumbStyle({
      size: props.size,
      move: props.move,
      bar: bar.value,
    }))

    const showBar = () => {
      visible.value = !!props.size
    }

    const hideBar = () => {
      visible.value = false
    }

    onMounted(() => {
      on(scrollbar.value, 'mousemove', showBar)
      on(scrollbar.value, 'mouseleave', hideBar)
    })

    onBeforeUnmount(() => {
      off(document, 'mouseup', mouseUpDocumentHandler)
      off(scrollbar.value, 'mousemove', showBar)
      off(scrollbar.value, 'mouseleave', hideBar)
    })

    return {
      instance,
      thumb,
      bar,
      clickTrackHandler,
      clickThumbHandler,
      thumbStyle,
      visible,
    }
  },
})

</script>
