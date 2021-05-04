
<template>
  <div class="block">
    <span class="demonstration">默认</span>
    <ur-slider v-model="value1"></ur-slider>
  </div>
  <div class="block">
    <span class="demonstration">隐藏 Tooltip</span>
    <ur-slider v-model="value2" :show-tooltip="false"></ur-slider>
  </div>
  <div class="block">
    <span class="demonstration">禁用</span>
    <ur-slider v-model="value3" disabled></ur-slider>
  </div>
  <div class="block">
    <span class="demonstration">不显示间断点</span>
    <ur-slider v-model="value4" :step="10"></ur-slider>
  </div>
  <div class="block">
    <span class="demonstration">显示间断点</span>
    <ur-slider v-model="value5" :step="10" show-stops></ur-slider>
  </div>
  <div class="block">
    <ur-slider
      v-model="value6"
      show-input>
    </ur-slider>
  </div>
  <div class="block">
    <ur-slider
      v-model="value7"
      range
      show-stops
      :max="10">
    </ur-slider>
  </div>
  <div class="block">
    <ur-slider
      v-model="value8"
      vertical
      height="200px">
    </ur-slider>
  </div>
</template>

<script>
export default {
  data() {
    return {
      value1: 0,
      value2: 50,
      value3: 36,
      value4: 48,
      value5: 42,
      value6: 42,
      value7: [4, 8],
      value8: 42,
    };
  },
  methods: {
    formatTooltip(val) {
      return val / 100;
    },
  },
};
</script>

<style scoped>
.block {
  width: 40rem;
  margin: 0 auto;
}
.vertical {
  position: absolute;
  top: 2500px;
  left: 150px;
}
</style>
