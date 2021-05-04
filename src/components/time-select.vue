
<template>
  <div class="time-select-wrap">
    <!-- <ur-time-select
    class="space"
    v-model="value"
    start="08:30"
    step="00:15"
    end="18:30"
    placeholder="选择时间"
  ></ur-time-select>
    <br /><br />-->
    <ur-time-select
      class="space"
      placeholder="起始时间"
      v-model="startTime"
      start="08:30"
      step="00:15"
      end="18:30"
    ></ur-time-select>
    <ur-time-select
      class="space"
      placeholder="结束时间"
      v-model="endTime"
      start="08:30"
      step="00:15"
      end="18:30"
      :minTime="startTime"
    ></ur-time-select>
  </div>
</template>

<script>
export default {
  data() {
    return {
      value: '',
      startTime: '',
      endTime: '',
    };
  },
};
</script>

<style>
.time-select-wrap {
  margin-bottom: 20rem;
}
</style>
