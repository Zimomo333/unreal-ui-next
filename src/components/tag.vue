<template>
  <ur-tag class="space">标签一</ur-tag>
  <ur-tag class="space" type="success">标签二</ur-tag>
  <ur-tag class="space" type="info">标签三</ur-tag>
  <ur-tag class="space" type="danger">标签五</ur-tag>
  <br />
  <br />
  <ur-tag
    class="space"
    v-for="tag in tags"
    :key="tag.name"
    closable
    :type="tag.type"
    @close="handleClose"
  >{{tag.name}}</ur-tag>
  <br />
  <br />
  <ur-tag class="space" type="success" size="medium" closable>超大标签</ur-tag>
  <ur-tag class="space" type="success" closable>默认标签</ur-tag>
  <ur-tag class="space" type="success" size="small" closable>小型标签</ur-tag>
  <ur-tag class="space" type="success" size="mini" closable>迷你标签</ur-tag>
</template>

<script>
export default {
  data() {
    return {
      tags: [
        { name: '标签一', type: '' },
        { name: '标签二', type: 'success' },
        { name: '标签三', type: 'info' },
        { name: '标签五', type: 'danger' },
      ],
    };
  },
  methods: {
    handleClose(tag) {
      this.tags.splice(this.tags.indexOf(tag), 1);
    },
  },
};
</script>