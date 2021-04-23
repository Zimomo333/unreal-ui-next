<template>
  <ur-time-select placeholder="起始时间" v-model="startTime" start="08:30" step="00:15" end="18:30" class="space"></ur-time-select>
  <ur-time-select
    placeholder="结束时间"
    v-model="endTime"
    start="08:30"
    step="00:15"
    end="18:30"
    :minTime="startTime"
    class="space"
  ></ur-time-select>
</template>

<script>
export default {
  data() {
    return {
      startTime: '',
      endTime: '',
    };
  },
};
</script>

<style>
</style>
