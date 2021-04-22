<template>
  <div class="block">
    <span class="demonstration">默认</span>
    <ur-date-picker v-model="value1" type="datetime" placeholder="选择日期时间"></ur-date-picker>
  </div>
  <div class="block">
    <span class="demonstration">带快捷选项</span>
    <ur-date-picker
      v-model="value2"
      type="datetime"
      placeholder="选择日期时间"
      align="right"
      :shortcuts="shortcuts"
    ></ur-date-picker>
  </div>
  <div class="block">
    <span class="demonstration">设置默认时间</span>
    <ur-date-picker
      v-model="value3"
      type="datetime"
      placeholder="选择日期时间"
      :default-time="defaultTime"
    ></ur-date-picker>
  </div>
</template>

<script>
export default {
  data() {
    return {
      shortcuts: [
        {
          text: '今天',
          value: new Date(),
        },
        {
          text: '昨天',
          value: (() => {
            const date = new Date();
            date.setTime(date.getTime() - 3600 * 1000 * 24);
            return date;
          })(),
        },
        {
          text: '一周前',
          value: (() => {
            const date = new Date();
            date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
            return date;
          })(),
        },
      ],
      value1: '',
      value2: '',
      value3: '',
      defaultTime: new Date(2000, 1, 1, 12, 0, 0), // '12:00:00'
    };
  },
};
</script>

<style>
</style>
