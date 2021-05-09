
<template>
<ur-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
  <ur-form-item label="活动名称" prop="name">
    <ur-input v-model="ruleForm.name"></ur-input>
  </ur-form-item>
  <ur-form-item label="活动区域" prop="region">
    <ur-select v-model="ruleForm.region" placeholder="请选择活动区域">
      <ur-option label="区域一" value="shanghai"></ur-option>
      <ur-option label="区域二" value="beijing"></ur-option>
    </ur-select>
  </ur-form-item>
  <ur-form-item label="活动时间" required>
    <ur-col :span="11">
      <ur-form-item prop="date1">
        <ur-date-picker type="date" placeholder="选择日期" v-model="ruleForm.date1" style="width: 100%;"></ur-date-picker>
      </ur-form-item>
    </ur-col>
    <ur-col class="line" :span="2">-</ur-col>
    <ur-col :span="11">
      <ur-form-item prop="date2">
        <ur-time-picker placeholder="选择时间" v-model="ruleForm.date2" style="width: 100%;"></ur-time-picker>
      </ur-form-item>
    </ur-col>
  </ur-form-item>
  <ur-form-item label="即时配送" prop="delivery">
    <ur-switch v-model="ruleForm.delivery"></ur-switch>
  </ur-form-item>
  <ur-form-item label="活动性质" prop="type">
    <ur-checkbox-group v-model="ruleForm.type">
      <ur-checkbox label="美食/餐厅线上活动" name="type"></ur-checkbox>
      <ur-checkbox label="地推活动" name="type"></ur-checkbox>
      <ur-checkbox label="线下主题活动" name="type"></ur-checkbox>
      <ur-checkbox label="单纯品牌曝光" name="type"></ur-checkbox>
    </ur-checkbox-group>
  </ur-form-item>
  <ur-form-item label="特殊资源" prop="resource">
    <ur-radio-group v-model="ruleForm.resource">
      <ur-radio label="线上品牌商赞助"></ur-radio>
      <ur-radio label="线下场地免费"></ur-radio>
    </ur-radio-group>
  </ur-form-item>
  <ur-form-item label="活动形式" prop="desc">
    <ur-input type="textarea" v-model="ruleForm.desc"></ur-input>
  </ur-form-item>
  <ur-form-item>
    <ur-button type="primary" @click="submitForm('ruleForm')">立即创建</ur-button>
    <ur-button @click="resetForm('ruleForm')">重置</ur-button>
  </ur-form-item>
</ur-form>
</template>

<script>
  export default {
    data() {
      return {
        ruleForm: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        },
        rules: {
          name: [
            { required: true, message: '请输入活动名称', trigger: 'blur' },
            { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
          region: [
            { required: true, message: '请选择活动区域', trigger: 'change' }
          ],
          date1: [
            { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
          ],
          date2: [
            { type: 'date', required: true, message: '请选择时间', trigger: 'change' }
          ],
          type: [
            { type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change' }
          ],
          resource: [
            { required: true, message: '请选择活动资源', trigger: 'change' }
          ],
          desc: [
            { required: true, message: '请填写活动形式', trigger: 'blur' }
          ]
        }
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
  }
</script>

<style>

</style>
