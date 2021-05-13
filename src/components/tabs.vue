
<template>
  <div class="tabs_wrap">
    <ur-tabs v-model="activeName">
      <ur-tab-pane label="用户管理" name="first">用户管理</ur-tab-pane>
      <ur-tab-pane label="配置管理" name="second">配置管理</ur-tab-pane>
      <ur-tab-pane label="角色管理" name="third">角色管理</ur-tab-pane>
      <ur-tab-pane label="定时任务补偿" name="fourth">定时任务补偿</ur-tab-pane>
    </ur-tabs>

    <ur-radio-group v-model="tabPosition" style="margin-bottom: 30px;">
      <ur-radio label="top">top</ur-radio>
      <ur-radio label="right">right</ur-radio>
      <ur-radio label="bottom">bottom</ur-radio>
      <ur-radio label="left">left</ur-radio>
    </ur-radio-group>

    <ur-tabs :tab-position="tabPosition" style="height: 200px;">
      <ur-tab-pane label="用户管理">用户管理</ur-tab-pane>
      <ur-tab-pane label="配置管理">配置管理</ur-tab-pane>
      <ur-tab-pane label="角色管理">角色管理</ur-tab-pane>
      <ur-tab-pane label="定时任务补偿">定时任务补偿</ur-tab-pane>
    </ur-tabs>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeName: 'second',
      tabPosition: 'left',
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
.tabs_wrap {
  margin: 0 auto;
  width: 35rem;
}
.ur-tab-pane {
  height: 12rem;
}
</style>
