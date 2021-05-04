
<template>
  <ur-button class="space" type="text" @click="dialogVisible = true">点击打开 Dialog</ur-button>

  <ur-dialog title="提示" v-model="dialogVisible" width="30%" :before-close="handleClose">
    <span>这是一段信息</span>
    <template #footer>
      <span class="dialog-footer">
        <ur-button class="space" @click="dialogVisible = false">取 消</ur-button>
        <ur-button class="space" @click="dialogVisible = false">确 定</ur-button>
      </span>
    </template>
  </ur-dialog>
  <ur-button class="space" type="text" @click="outerVisible = true">点击打开外层 Dialog</ur-button>

  <ur-dialog title="外层 Dialog" v-model="outerVisible">
    <ur-dialog width="30%" title="内层 Dialog" v-model="innerVisible" append-to-body></ur-dialog>
    <template #footer>
      <div class="dialog-footer">
        <ur-button class="space" @click="outerVisible = false">取 消</ur-button>
        <ur-button class="space" @click="innerVisible = true">打开内层 Dialog</ur-button>
      </div>
    </template>
  </ur-dialog>

  <ur-button type="text" class="space" @click="dialogTableVisible = true">打开嵌套表格的 Dialog</ur-button>

  <ur-dialog title="收货地址" v-model="dialogTableVisible">
    <ur-table :data="gridData">
      <ur-table-column property="date" label="日期" width="150"></ur-table-column>
      <ur-table-column property="name" label="姓名" width="200"></ur-table-column>
      <ur-table-column property="address" label="地址"></ur-table-column>
    </ur-table>
  </ur-dialog>
</template>

<script>
export default {
  data() {
    return {
      dialogVisible: false,
      outerVisible: false,
      innerVisible: false,
      dialogTableVisible: false,
      gridData: [
        {
          date: '2021-05-02',
          name: '梁梓豪',
          address: '广东省东莞市松山湖',
        },
        {
          date: '2021-05-02',
          name: '梁梓豪',
          address: '广东省东莞市松山湖',
        },
        {
          date: '2021-05-02',
          name: '梁梓豪',
          address: '广东省东莞市松山湖',
        },
        {
          date: '2021-05-02',
          name: '梁梓豪',
          address: '广东省东莞市松山湖',
        },
      ],
    };
  },
  methods: {
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done();
        })
        .catch(_ => {});
    },
  },
};
</script>

<style>
</style>
