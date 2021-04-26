
<template>
  <ur-tabs v-model="activeName1">
    <ur-tab-pane label="用户管理" name="first">用户管理</ur-tab-pane>
    <ur-tab-pane label="配置管理" name="second">配置管理</ur-tab-pane>
    <ur-tab-pane label="角色管理" name="third">角色管理</ur-tab-pane>
    <ur-tab-pane label="定时任务补偿" name="fourth">定时任务补偿</ur-tab-pane>
  </ur-tabs>

  <ur-tabs v-model="activeName2" tabPosition="left">
    <ur-tab-pane label="用户管理" name="first">用户管理</ur-tab-pane>
    <ur-tab-pane label="配置管理" name="second">配置管理</ur-tab-pane>
    <ur-tab-pane label="角色管理" name="third">角色管理</ur-tab-pane>
    <ur-tab-pane label="定时任务补偿" name="fourth">定时任务补偿</ur-tab-pane>
  </ur-tabs>

  <ur-tabs v-model="activeName2" tabPosition="right">
    <ur-tab-pane label="用户管理" name="first">用户管理</ur-tab-pane>
    <ur-tab-pane label="配置管理" name="second">配置管理</ur-tab-pane>
    <ur-tab-pane label="角色管理" name="third">角色管理</ur-tab-pane>
    <ur-tab-pane label="定时任务补偿" name="fourth">定时任务补偿</ur-tab-pane>
  </ur-tabs>
</template>

<script>
export default {
  data() {
    return {
      activeName1: 'second',
      activeName2: 'second',
    };
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    },
  },
};
</script>

<style>
</style>
