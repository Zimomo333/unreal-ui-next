
<template>
  <ur-button class="space" plain @click="open1">可自动关闭</ur-button>
  <ur-button class="space" plain @click="open2">不会自动关闭</ur-button>
</template>

<script>
import { h } from 'vue';

export default {
  methods: {
    open1() {
      this.$notify({
        title: '标题名称',
        message: h('i', { style: 'color: green' }, '这是提示文案这是提示文案这是提示文案这是提示文案'),
      });
    },

    open2() {
      this.$notify({
        title: '提示',
        message: '这是一条不会自动关闭的消息',
        duration: 0,
      });
    },
  },
};
</script>

<style>
</style>
