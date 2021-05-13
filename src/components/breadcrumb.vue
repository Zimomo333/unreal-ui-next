<template>
<div class="breadcrumb_wrap">
<ur-breadcrumb separator="/">
  <ur-breadcrumb-item :to="{ path: '/' }">首页</ur-breadcrumb-item>
  <ur-breadcrumb-item><a href="/">活动管理</a></ur-breadcrumb-item>
  <ur-breadcrumb-item>活动列表</ur-breadcrumb-item>
  <ur-breadcrumb-item>活动详情</ur-breadcrumb-item>
</ur-breadcrumb>
<br>
<ur-breadcrumb separator=">">
  <ur-breadcrumb-item :to="{ path: '/' }">首页</ur-breadcrumb-item>
  <ur-breadcrumb-item><a href="/">活动管理</a></ur-breadcrumb-item>
  <ur-breadcrumb-item>活动列表</ur-breadcrumb-item>
  <ur-breadcrumb-item>活动详情</ur-breadcrumb-item>
</ur-breadcrumb>
</div>
</template>

<style>
.breadcrumb_wrap {
  margin: 0 auto;
  width: 35rem;
}
</style>