
<template>
  <div class="menu_demo">
    <h5>默认颜色</h5>
    <ur-menu
      default-active="2"
      class="ur-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
    >
      <ur-submenu index="1">
        <template #title>
          <i class="ur-icon-location"></i>
          <span>导航一</span>
        </template>
        <ur-menu-item index="1-1">选项1</ur-menu-item>
        <ur-menu-item index="1-2">选项2</ur-menu-item>
        <ur-menu-item index="1-3">选项3</ur-menu-item>
        <ur-submenu index="1-4">
          <template #title>选项4</template>
          <ur-menu-item index="1-4-1">选项1</ur-menu-item>
        </ur-submenu>
      </ur-submenu>
      <ur-menu-item index="2">
        <i class="ur-icon-menu"></i>
        <template #title>导航二</template>
      </ur-menu-item>
      <ur-menu-item index="3" disabled>
        <i class="ur-icon-document"></i>
        <template #title>导航三</template>
      </ur-menu-item>
      <ur-menu-item index="4">
        <i class="ur-icon-setting"></i>
        <template #title>导航四</template>
      </ur-menu-item>
    </ur-menu>
  </div>
</template>

<script>
export default {
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
  },
};
</script>

<style>
.menu_demo {
  width: 18%;
}
</style>
