
<template>
<ur-form ref="form" :model="form" labur-width="80px">
  <ur-form-item label="活动名称">
    <ur-input v-model="form.name"></ur-input>
  </ur-form-item>
  <ur-form-item label="活动区域">
    <ur-select v-model="form.region" placeholder="请选择活动区域">
      <ur-option label="区域一" value="shanghai"></ur-option>
      <ur-option label="区域二" value="beijing"></ur-option>
    </ur-select>
  </ur-form-item>
  <ur-form-item label="活动时间">
    <ur-col :span="11">
      <ur-date-picker type="date" placeholder="选择日期" v-model="form.date1" style="width: 100%;"></ur-date-picker>
    </ur-col>
    <ur-col class="line" :span="2">-</ur-col>
    <ur-col :span="11">
      <ur-time-picker placeholder="选择时间" v-model="form.date2" style="width: 100%;"></ur-time-picker>
    </ur-col>
  </ur-form-item>
  <ur-form-item label="即时配送">
    <ur-switch v-model="form.delivery"></ur-switch>
  </ur-form-item>
  <ur-form-item label="活动性质">
    <ur-checkbox-group v-model="form.type">
      <ur-checkbox label="美食/餐厅线上活动" name="type"></ur-checkbox>
      <ur-checkbox label="地推活动" name="type"></ur-checkbox>
      <ur-checkbox label="线下主题活动" name="type"></ur-checkbox>
      <ur-checkbox label="单纯品牌曝光" name="type"></ur-checkbox>
    </ur-checkbox-group>
  </ur-form-item>
  <ur-form-item label="特殊资源">
    <ur-radio-group v-model="form.resource">
      <ur-radio label="线上品牌商赞助"></ur-radio>
      <ur-radio label="线下场地免费"></ur-radio>
    </ur-radio-group>
  </ur-form-item>
  <ur-form-item label="活动形式">
    <ur-input type="textarea" v-model="form.desc"></ur-input>
  </ur-form-item>
  <ur-form-item>
    <ur-button type="primary" @click="onSubmit">立即创建</ur-button>
    <ur-button>取消</ur-button>
  </ur-form-item>
</ur-form>
</template>

<script>
  export default {
    data() {
      return {
        form: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        }
      }
    },
    methods: {
      onSubmit() {
        console.log('submit!');
      }
    }
  }
</script>

<style>

</style>
