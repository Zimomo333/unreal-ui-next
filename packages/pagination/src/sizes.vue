<template>
  <span class="ur-pagination__sizes">
    <ur-select
      :model-value="innerPageSize"
      :disabled="disabled"
      :popper-class="popperClass"
      size="mini"
      @change="handleChange"
    >
      <ur-option
        v-for="item in innerPagesizes"
        :key="item"
        :value="item"
        :label="item + t('el.pagination.pagesize')"
      />
    </ur-select>
  </span>
</template>

<script lang="ts">
import { defineComponent, watch, computed, ref } from 'vue'
import UrSelect from '@/packages/select'
import UrOption from '@/packages/option'
import { t } from '@/locale'
import isEqual from 'lodash/isEqual'
import { usePagination } from './usePagination'

export default defineComponent({
  name: 'Sizes',
  components: {
    UrSelect,
    UrOption,
  },
  props: {
    pageSize: Number,
    pageSizes: {
      type: Array,
      default: () => {
        return [10, 20, 30, 40, 50, 100]
      },
    },
    popperClass: {
      type: String,
      default: '',
    },
    disabled: Boolean,
  },
  emits: ['page-size-change'],
  setup(props, { emit }) {
    const { pagination } = usePagination()
    const innerPageSize = ref<Nullable<number>>(props.pageSize)

    watch(() => props.pageSizes, (newVal, oldVal) => {
      if (isEqual(newVal, oldVal)) return
      if (Array.isArray(newVal)) {
        const pageSize = newVal.indexOf(props.pageSize) > -1
          ? props.pageSize
          : props.pageSizes[0]
        emit('page-size-change', pageSize)
      }
    })

    watch(() => props.pageSize, newVal => {
      innerPageSize.value = newVal
    })

    const innerPagesizes = computed(() => props.pageSizes)

    function handleChange(val: number) {
      if (val !== innerPageSize.value) {
        innerPageSize.value = val
        pagination?.handleSizesChange(Number(val))
      }
    }

    return {
      t,
      innerPagesizes,
      innerPageSize,
      handleChange,
    }
  },
})
</script>
