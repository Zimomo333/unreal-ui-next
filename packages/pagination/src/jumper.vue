<template>
  <span class="ur-pagination__jump">
    {{ t('el.pagination.goto') }}
    <ur-input
      size="mini"
      class="ur-pagination__editor is-in-pagination"
      :min="1"
      :max="pageCount"
      :disabled="disabled"
      :model-value="innerValue"
      type="number"
      @update:modelValue="handleInput"
      @change="handleChange"
    />
    {{ t('el.pagination.pageClassifier') }}
  </span>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  ref,
} from 'vue'
import { t } from '@/locale'
import UrInput from '@/packages/input'
import { usePagination } from './usePagination'

export default defineComponent({
  components: {
    UrInput,
  },
  setup() {
    const { pagination, pageCount, disabled, currentPage } = usePagination()
    const userInput = ref<Nullable<number>>(null)
    const innerValue = computed(() => userInput.value ?? currentPage.value)

    function handleInput(val: number | string) {
      userInput.value = Number(val)
    }

    function handleChange(val: number | string) {
      pagination?.changeEvent(Number(val))
      userInput.value = null
    }

    return {
      t,
      userInput,
      pageCount,
      disabled,
      handleInput,
      handleChange,
      innerValue,
    }
  },
})
</script>
