<template>
  <ur-radio-group v-model="radioGoup">
    <ur-radio :label="1">单选1</ur-radio>
    <ur-radio :label="2">单选2</ur-radio>
    <ur-radio :label="3">单选3</ur-radio>
  </ur-radio-group>
  <br>
  <ur-radio disabled v-model="radio" label="禁用">禁用</ur-radio>
  <ur-radio disabled v-model="radio" label="选中且禁用">选中且禁用</ur-radio>
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