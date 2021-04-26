<template>
  <ur-radio-group v-model="radioGoup">
    <ur-radio :label="3">备选项</ur-radio>
    <ur-radio :label="6">备选项</ur-radio>
    <ur-radio :label="9">备选项</ur-radio>
  </ur-radio-group>
  <br>
  <ur-radio disabled v-model="radio" label="禁用">备选项</ur-radio>
  <ur-radio disabled v-model="radio" label="选中且禁用">备选项</ur-radio>
</template>

<script>
export default {
  data() {
    return {
      radioGoup: 3,
      radio: '选中且禁用',
    };
  },
};
</script>