<template>
  <div class="table">
    <ur-table class="table" :data="tableData" style="width: 100%">
      <ur-table-column prop="date" label="日期" width="140"></ur-table-column>
      <ur-table-column prop="name" label="姓名" width="180"></ur-table-column>
      <ur-table-column prop="address" label="地址"></ur-table-column>
    </ur-table>
  </div>
  <div class="table">
    <span class="table-title">斑马纹表格</span>
    <ur-table :data="tableData" stripe style="width: 100%">
      <ur-table-column prop="date" label="日期" width="140"></ur-table-column>
      <ur-table-column prop="name" label="姓名" width="180"></ur-table-column>
      <ur-table-column prop="address" label="地址"></ur-table-column>
    </ur-table>
  </div>
  <div class="table">
    <span class="table-title">带边框表格</span>
    <ur-table :data="tableData" border style="width: 100%">
      <ur-table-column prop="date" label="日期" width="120"></ur-table-column>
      <ur-table-column prop="name" label="姓名" width="120"></ur-table-column>
      <ur-table-column prop="address" label="地址"></ur-table-column>
    </ur-table>
  </div>
  <div class="table">
    <span class="table-title">固定表头</span>
    <ur-table :data="tableData" height="250" border style="width: 100%">
      <ur-table-column prop="date" label="日期" width="120"></ur-table-column>
      <ur-table-column prop="name" label="姓名" width="120"></ur-table-column>
      <ur-table-column prop="address" label="地址"></ur-table-column>
    </ur-table>
  </div>
  <div class="table">
    <span class="table-title">固定列</span>
    <ur-table :data="tableData" border style="width: 100%">
      <ur-table-column fixed prop="date" label="日期" width="120"></ur-table-column>
      <ur-table-column prop="name" label="姓名" width="120"></ur-table-column>
      <ur-table-column prop="address" label="地址" width="600"></ur-table-column>
      <ur-table-column fixed="right" label="操作" width="120">
        <template #default="scope">
          <ur-button class="table_button" @click="handleClick(scope.row)" type="text" size="small">查看</ur-button>
          <ur-button type="text" size="small">编辑</ur-button>
        </template>
      </ur-table-column>
    </ur-table>
  </div>
  <div class="table">
    <span class="table-title">多选</span>
    <ur-table ref="multipleTable" :data="tableData" tooltip-effect="dark" style="width: 100%">
      <ur-table-column type="selection" width="55"></ur-table-column>
      <ur-table-column label="日期" width="120">
        <template #default="scope">{{ scope.row.date }}</template>
      </ur-table-column>
      <ur-table-column prop="name" label="姓名" width="120"></ur-table-column>
      <ur-table-column prop="address" label="地址"></ur-table-column>
    </ur-table>
  </div>
  <div class="table">
    <span class="table-title">自定义操作</span>
    <ur-table :data="tableData" style="width: 100%">
      <ur-table-column label="日期" width="140">
        <template #default="scope">
          <i class="ur-icon-time"></i>
          <span style="margin-left: 10px">{{ scope.row.date }}</span>
        </template>
      </ur-table-column>
      <ur-table-column label="姓名" width="180">
        <template #default="scope">
          <p>姓名: {{ scope.row.name }}</p>
        </template>
      </ur-table-column>
      <ur-table-column label="操作">
        <template #default="scope">
          <ur-button size="small" class="table_button" @click="handleEdit(scope.$index, scope.row)">编辑</ur-button>
          <ur-button size="small" @click="handleDelete(scope.$index, scope.row)">删除</ur-button>
        </template>
      </ur-table-column>
    </ur-table>
  </div>
  <div class="table">
    <span class="table-title">排序</span>
    <ur-table
      :data="tableData"
      style="width: 100%"
      :default-sort="{prop: 'date', order: 'descending'}"
    >
      <ur-table-column prop="date" label="日期" sortable width="180"></ur-table-column>
      <ur-table-column prop="name" label="姓名" sortable width="180"></ur-table-column>
      <ur-table-column prop="address" label="地址" :formatter="formatter"></ur-table-column>
    </ur-table>
  </div>
  <div class="table">
    <span class="table-title">展开行</span>
    <ur-table :data="tableData" style="width: 100%">
      <ur-table-column type="expand">
        <template #default="props">
          <span>{{ props.row.date }}</span>
          <span>{{ props.row.name }}</span>
          <span>{{ props.row.address }}</span>
        </template>
      </ur-table-column>
      <ur-table-column prop="date" label="日期" sortable width="180"></ur-table-column>
      <ur-table-column prop="name" label="姓名" sortable width="180"></ur-table-column>
      <ur-table-column prop="address" label="地址" :formatter="formatter"></ur-table-column>
    </ur-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [
        {
          date: '2021-05-01',
          name: 'Zimomo',
          address: '广东省东莞市松山湖',
        },
        {
          date: '2021-05-02',
          name: 'Zimomo',
          address: '广东省东莞市松山湖',
        },
        {
          date: '2021-05-03',
          name: 'Zimomo',
          address: '广东省东莞市松山湖',
        },
        {
          date: '2021-05-04',
          name: 'Zimomo',
          address: '广东省东莞市松山湖',
        },
      ],
    };
  },
  methods: {
    handleEdit(index, row) {
      console.log(index, row);
    },
    handleDelete(index, row) {
      console.log(index, row);
    },
  },
};
</script>

<style>
.table {
  width: 35rem;
  margin: 0 auto;
}
.table-title {
  display: block;
  margin: 0.8rem 0;
  font-size: 1.5rem;
}
.table_button {
  margin: 0 .6rem 0 .2rem;
}
</style>
