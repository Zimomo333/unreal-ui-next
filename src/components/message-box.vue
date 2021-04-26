
<template>

      <ur-button class="space" type="text" @click="openMessageBox">点击打开 Message Box</ur-button>
      <ur-button class="space" type="text" @click="openMessageBoxConfirm">确认消息</ur-button>
      <ur-button class="space" type="text" @click="openMessageBoxCommit">提交内容</ur-button>
</template>

<script>
  export default {
    methods: {
      openMessageBox() {
      this.$alert('这是一段内容', '标题名称', {
        confirmButtonText: '确定',
        callback: action => {
          this.$message({
            type: 'info',
            message: `action: ${ action }`
          });
        },
      });
    },

    openMessageBoxConfirm() {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(() => {
          this.$message({
            type: 'success',
            message: '删除成功!',
          });
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除',
          });
        });
    },

    openMessageBoxCommit() {
      this.$prompt('请输入邮箱', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputPattern: /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/,
        inputErrorMessage: '邮箱格式不正确',
      })
        .then(({ value }) => {
          this.$message({
            type: 'success',
            message: '你的邮箱是: ' + value,
          });
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '取消输入',
          });
        });
    },
    }
  }
</script>

<style>

</style>
