<template>
    <span class="demonstration">默认</span>
    <ur-date-picker class="space" v-model="value1" type="date" placeholder="选择日期"></ur-date-picker>
    <span class="demonstration">带快捷选项</span>
    <ur-date-picker
      class="space"
      v-model="value2"
      align="right"
      type="date"
      placeholder="选择日期"
      :disabled-date="disabledDate"
      :shortcuts="shortcuts"
    ></ur-date-picker>
</template>

<script>
export default {
  data() {
    return {
      disabledDate(time) {
        return time.getTime() > Date.now();
      },
      shortcuts: [
        {
          text: 'Today',
          value: new Date(),
        },
        {
          text: 'Yesterday',
          value: (() => {
            const date = new Date();
            date.setTime(date.getTime() - 3600 * 1000 * 24);
            return date;
          })(),
        },
        {
          text: 'A week ago',
          value: (() => {
            const date = new Date();
            date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
            return date;
          })(),
        },
      ],
      value1: '',
      value2: '',
    };
  },
};
</script>

<style>
</style>
