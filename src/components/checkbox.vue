
<template>

  <ur-checkbox-group v-model="checkList">
    <ur-checkbox label="多选框 A"></ur-checkbox>
    <ur-checkbox label="多选框 B"></ur-checkbox>
    <ur-checkbox label="多选框 C"></ur-checkbox>
    <ur-checkbox label="禁用" disabled></ur-checkbox>
    <ur-checkbox label="选中且禁用" disabled></ur-checkbox>
  </ur-checkbox-group>
  <br>
  <ur-checkbox v-model="checked1" disabled>选项1</ur-checkbox>
  <ur-checkbox v-model="checked2" disabled>选项2</ur-checkbox>
  <br><br>
  <ur-checkbox-group
    v-model="checkedCities"
    :min="1"
    :max="2">
    <ur-checkbox v-for="city in cities" :label="city" :key="city">{{city}}</ur-checkbox>
  </ur-checkbox-group>
</template>

<script>
  const cityOptions = ['上海', '北京', '广州', '深圳'];
  export default {
    data () {
      return {
        checkList: ['选中且禁用','复选框 A'],
        checked1: false,
        checked2: true,
        checkedCities: ['上海', '北京'],
        cities: cityOptions,
      };
    }
  };
</script>