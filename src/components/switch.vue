<template>
  <ur-switch class="space" v-model="value1"></ur-switch>
  <ur-switch class="space" v-model="value2" active-text="激活" inactive-text="未激活"></ur-switch>
  <ur-switch class="space" v-model="value3" disabled></ur-switch>
  <ur-switch class="space" v-model="value4" disabled></ur-switch>
</template>

<script>
export default {
  data() {
    return {
      value1: true,
      value2: true,
      value3: true,
      value4: false,
    };
  },
};
</script>

<style>
</style>
