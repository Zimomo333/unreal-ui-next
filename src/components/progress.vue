
<template>
<ur-progress class="progress" :percentage="50"></ur-progress>
<ur-progress class="progress" :percentage="50" status="success"></ur-progress>
<ur-progress class="progress" :percentage="50" status="exception"></ur-progress>

<ur-progress class="progress" :text-inside="true" :stroke-width="20" :percentage="70"></ur-progress>
<ur-progress class="progress" :text-inside="true" :stroke-width="20" :percentage="100" status="success"></ur-progress>
<ur-progress class="progress" :text-inside="true" :stroke-width="20" :percentage="50" status="exception"></ur-progress>

<ur-progress class="progress" percentage="40" :color="customColor"></ur-progress>

<ur-progress class="progress" type="circle" :percentage="percentage"></ur-progress>
<ur-button-group>
    <ur-button @click="decrease">减</ur-button>
    <ur-button @click="increase">加</ur-button>
  </ur-button-group>
</template>

<script>
  export default {
    data() {
      return {
        customColor: '#409eff',
        percentage: 40,
      }
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
      }
    }
  };
</script>

<style>
.progress {
  margin: 1rem 0;
}
</style>
