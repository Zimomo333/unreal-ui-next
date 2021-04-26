<template>
  <ur-time-picker
    v-model="value1"
    :disabled-hours="disabledHours"
    :disabled-minutes="disabledMinutes"
    :disabled-seconds="disabledSeconds"
    placeholder="任意时间点">
  </ur-time-picker>
  <ur-time-picker
    is-range
    arrow-control
    v-model="value2"
    range-separator="至"
    start-placeholder="开始时间"
    end-placeholder="结束时间"
    placeholder="选择时间范围"
    class="space"
  ></ur-time-picker>
</template>

<script>
export default {
  data() {
    return {
      value1: new Date(2016, 9, 10, 8, 40),
      value2: [new Date(2016, 9, 10, 8, 40), new Date(2016, 9, 10, 9, 40)],
    };
  },
};
</script>

<style>
</style>
