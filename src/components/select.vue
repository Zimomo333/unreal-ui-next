<template>
  <ur-select class="select-space1" v-model="value1" placeholder="请选择">
    <ur-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></ur-option>
  </ur-select>
  <ur-select class="select-space1" v-model="value2" placeholder="请选择">
    <ur-option
      v-for="item in options2"
      :key="item.value"
      :label="item.label"
      :value="item.value"
      :disabled="item.disabled"
    ></ur-option>
  </ur-select>
  <ur-select class="select-space1" v-model="value3" disabled placeholder="请选择">
    <ur-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></ur-option>
  </ur-select>
  <ur-select class="select-space1" v-model="value3" clearable placeholder="请选择">
    <ur-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></ur-option>
  </ur-select>

  <ur-select class="select-space1" v-model="value4" multiple placeholder="请选择">
    <ur-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></ur-option>
  </ur-select>

  <ur-select class="select-space1" v-model="value5" multiple collapse-tags placeholder="请选择">
    <ur-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></ur-option>
  </ur-select>
</template>

<script>
export default {
  data() {
    return {
      options: [
        {
          value: '选项1',
          label: '选项1',
        },
        {
          value: '选项2',
          label: '选项2',
        },
        {
          value: '选项3',
          label: '选项3',
        },
        {
          value: '选项4',
          label: '选项4',
        },
        {
          value: '选项5',
          label: '选项5',
        },
      ],
      value1: '',
      options2: [
        {
          value: '选项1',
          label: '选项1',
        },
        {
          value: '选项2',
          label: '选项2',
          disabled: true,
        },
        {
          value: '选项3',
          label: '选项3',
        },
        {
          value: '选项4',
          label: '选项4',
        },
        {
          value: '选项5',
          label: '选项5',
        },
      ],
      value2: '',
      value3: '',
      value4: '',
      value5: '',
    };
  },
};
</script>

<style>
.select-space {
  margin: 1rem 1rem;
}
.select-space1 {
  margin: 0 1rem 20rem;
}
</style>
