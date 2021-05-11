<template>
  <div class="ur-bar-chart">
    <div class="chart">
      <div class="bar" v-for="(item, index) in data" :key="item">
        <ur-tooltip effect="dark" :content="item" placement="top">
          <ur-slider
            :modelValue="percentageFormat(item)"
            :width="width"
            :bgColor="bgColor"
            :height="height"
            vertical
            disabled
          ></ur-slider>
        </ur-tooltip>
        <span class="xAxis">{{xAxis[index]}}</span>
      </div>
      <div class="yAxis" :style="{ height: height }">
        <div class="line" v-for="(y, index) in yAxis" :key="y" :style="{ bottom: index * 25 + '%'}">
          <span>{{y}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import UrSlider from '@/packages/slider';
import UrTooltip from '@/packages/tooltip';

export default {
  name: 'UrBarChart',
  components: {
    UrSlider,
    UrTooltip,
  },
  props: {
    xAxis: {
      type: Array,
      default: [],
    },
    data: {
      type: Array,
      default: [],
    },
    width: {
      type: String,
      default: '2rem',
    },
    height: {
      type: String,
      default: '200px',
    },
    bgColor: {
      type: String,
      default: '#18634b',
    },
  },
  computed: {
    yMax() {
      return Math.max(...this.data);
    },
    yMin() {
      return Math.min(...this.data);
    },
    yAxis() {
      const step = parseInt((this.yMax - this.yMin) / 4);
      const array = [];
      for (let i = this.yMin; i <= this.yMax; i+=step) {
        array.push(i);
      }
      return array;
    },
  },
  methods: {
    percentageFormat(item) {
      return parseInt((item / this.yMax) * 100);
    },
  },
};
</script>