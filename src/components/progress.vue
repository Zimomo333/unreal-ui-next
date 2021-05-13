
<template>
  <div class="progress_wrap">
    <ur-progress class="progress" :percentage="50"></ur-progress>
    <ur-progress class="progress" :percentage="50" status="success"></ur-progress>
    <!-- <ur-progress class="progress" :percentage="50" status="exception"></ur-progress> -->

    <!-- <ur-progress class="progress" :text-inside="true" :stroke-width="20" :percentage="70"></ur-progress> -->
    <ur-progress
      class="progress"
      :text-inside="true"
      :stroke-width="20"
      :percentage="100"
      status="success"
    ></ur-progress>
    <ur-progress
      class="progress"
      :text-inside="true"
      :stroke-width="20"
      :percentage="50"
      status="exception"
    ></ur-progress>

    <!-- <ur-progress class="progress" percentage="40" :color="customColor"></ur-progress> -->

    <ur-progress class="progress" type="circle" color="#18634b" :percentage="percentage"></ur-progress>
    <ur-button-group>
      <ur-button style="margin: 0 .5rem 0 1rem;" @click="decrease">减</ur-button>
      <ur-button @click="increase">加</ur-button>
    </ur-button-group>
  </div>
</template>

<script>
export default {
  data() {
    return {
      customColor: '#409eff',
      percentage: 40,
    };
  },
  methods: {
    increase() {
      this.percentage += 10;
      if (this.percentage > 100) {
        this.percentage = 100;
      }
    },
    decrease() {
      this.percentage -= 10;
      if (this.percentage < 0) {
        this.percentage = 0;
      }
    },
  },
};
</script>

<style>
.progress {
  margin: 1rem 0;
}
.progress_wrap {
  width: 35rem;
  margin: 0 auto;
}
</style>
