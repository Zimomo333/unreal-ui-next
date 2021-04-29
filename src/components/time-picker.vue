<template>
  <ur-time-picker
    v-model="value1"
    :disabled-hours="disabledHours"
    :disabled-minutes="disabledMinutes"
    :disabled-seconds="disabledSeconds"
    placeholder="任意时间点"
  ></ur-time-picker>
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
const makeRange = (start, end) => {
  const result = [];
  for (let i = start; i <= end; i++) {
    result.push(i);
  }
  return result;
};
export default {
  data() {
    return {
      value1: new Date(2016, 9, 10, 8, 40),
      value2: [new Date(2016, 9, 10, 8, 40), new Date(2016, 9, 10, 9, 40)],
    };
  },
  methods: {
    // 如允许 17:30:00 - 18:30:00
    disabledHours() {
      return makeRange(0, 16).concat(makeRange(19, 23));
    },
    disabledMinutes(hour) {
      if (hour === 17) {
        return makeRange(0, 29);
      }
      if (hour === 18) {
        return makeRange(31, 59);
      }
    },
    disabledSeconds(hour, minute) {
      if (hour === 18 && minute === 30) {
        return makeRange(1, 59);
      }
    },
  },
};
</script>

<style>
</style>
