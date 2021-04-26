
<template>
  <ur-input-number class="space" v-model="num1" @change="handleChange" :min="1" :max="10" label="描述文字"></ur-input-number>
  <ur-input-number class="space" v-model="num2" :step="2"></ur-input-number>
  <ur-input-number class="space" v-model="num3" :disabled="true"></ur-input-number>
  <ur-input-number class="space" v-model="num4" :precision="2" :step="0.1" :max="10"></ur-input-number>
  <ur-input-number
    class="space"
    v-model="num5"
    controls-position="right"
    @change="handleChange"
    :min="1"
    :max="10"
  ></ur-input-number>
</template>

<script>
export default {
  data() {
    return {
      num1: 1,
      num2: 1,
      num3: 1,
      num4: 1,
      num5: 1,
    };
  },
  methods: {
    handleChange(value) {
      console.log(value);
    },
  },
};
</script>