<template>
  <div id="app">
    <div>
      <p class="title">按钮</p>
      <button-demo/>
    </div>
    <div>
      <p class="title">输入框</p>
      <ur-input class="input-demo" v-model="input" placeholder="请输入内容" clearable>
        <template #prepend>Http://</template>
      </ur-input>
      <br />
      <ur-input class="input-demo" placeholder="请输入内容" clearable>
        <template #append>.com</template>
      </ur-input>
      <br />
      <ur-input class="input-demo" v-model="input" placeholder="请输入内容" show-password>
        <template #prepend>密码</template>
        <template #append>
          <ur-button>提交</ur-button>
        </template>
      </ur-input>
    </div>
    <div>
      <p class="title">标签</p>
      <ur-tag
        class="tag-demo"
        v-for="tag in tags"
        :key="tag.name"
        closable
        @close="handleClose"
        :type="tag.type"
      >{{tag.name}}</ur-tag>
    </div>
    <div style="padding-bottom: 20rem;">
      <p class="title">下拉框多选</p>
      <ur-select class="space" v-model="value" multiple placeholder="请选择">
        <ur-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></ur-option>
      </ur-select>
      <select-demo class="space"/>
    </div>
    <div>
      <p class="title">面包屑</p>
      <ur-breadcrumb separator="/">
        <ur-breadcrumb-item :to="{ path: '/' }">首页</ur-breadcrumb-item>
        <ur-breadcrumb-item>
          <a href="/">活动管理</a>
        </ur-breadcrumb-item>
        <ur-breadcrumb-item>活动列表</ur-breadcrumb-item>
      </ur-breadcrumb>
    </div>
    <div>
      <p class="title">单选框</p>
      <ur-radio-group v-model="radio">
        <ur-radio :label="3">备选项</ur-radio>
        <ur-radio :label="6">备选项</ur-radio>
        <ur-radio :label="9">备选项</ur-radio>
      </ur-radio-group>
      <p class="title">多选框</p>
      <ur-checkbox-group v-model="checkList">
        <ur-checkbox label="复选框 A"></ur-checkbox>
        <ur-checkbox label="复选框 B"></ur-checkbox>
        <ur-checkbox label="复选框 C"></ur-checkbox>
        <ur-checkbox label="禁用" disabled></ur-checkbox>
        <ur-checkbox label="选中且禁用" disabled></ur-checkbox>
      </ur-checkbox-group>
    </div>
    <div>
      <p class="title">分页</p>
      <ur-pagination background layout="total, sizes, prev, pager, next, jumper" :total="50"></ur-pagination>
    </div>
    <div>
      <p class="title">开关</p>
      <ur-switch v-model="switchValue" active-text="按月付费" inactive-text="按年付费" />
    </div>
    <div>
      <p class="title">计数器</p>
      <ur-input-number
        controls-position="right"
        v-model="inputNumber"
        :min="1"
        :max="10"
        label="描述文字"
      />
    </div>
    <div>
      <p class="title">气泡</p>
      <ur-tooltip class="item" content="Top Left 提示文字" placement="right">
        <ur-button>上左</ur-button>
      </ur-tooltip>
    </div>
    <div>
      <p class="title">滑块</p>
      <span>默认</span>
      <ur-slider v-model="sliderValue"></ur-slider>
      <span>带输入框</span>
      <ur-slider v-model="sliderValue" show-input></ur-slider>
      <span>禁用</span>
      <ur-slider v-model="sliderValue" disabled></ur-slider>
      <span>竖向</span>
      <ur-slider v-model="sliderValue" vertical style="height: 150px;"></ur-slider>
    </div>
    <div>
      <p class="title">进度条</p>
      <ur-progress :percentage="50"></ur-progress>
      <ur-progress :percentage="10" type="circle"></ur-progress>
    </div>
    <div>
      <p class="title">通知</p>
      <ur-button class="space" plain @click="open1">可自动关闭</ur-button>
      <ur-button class="space" plain @click="open2">不会自动关闭</ur-button>
    </div>
    <div>
      <p class="title">弹框</p>
      <ur-button class="space" type="text" @click="openMessageBox">点击打开 Message Box</ur-button>
      <ur-button class="space" type="text" @click="openMessageBoxConfirm">确认消息</ur-button>
      <ur-button class="space" type="text" @click="openMessageBoxCommit">提交内容</ur-button>
    </div>
    <div>
      <p class="title">对话框</p>
      <ur-button class="space" @click="dialogVisible = true">打开</ur-button>
      <ur-button class="space" type="text" @click="outerVisible = true">点击打开外层 Dialog</ur-button>
      <ur-dialog title="提示" v-model="dialogVisible" width="30%" :before-close="handleDialogClose">
        <span>这是一段信息</span>
        <template #footer>
          <span class="dialog-footer">
            <ur-button @click="dialogVisible = false">取 消</ur-button>
            <ur-button type="primary" @click="dialogVisible = false">确 定</ur-button>
          </span>
        </template>
      </ur-dialog>
      <ur-dialog title="外层 Dialog" v-model="outerVisible">
        <ur-dialog width="30%" title="内层 Dialog" v-model="innerVisible" append-to-body></ur-dialog>
        <template #footer>
          <div class="dialog-footer">
            <ur-button @click="outerVisible = false">取 消</ur-button>
            <ur-button type="primary" @click="innerVisible = true">打开内层 Dialog</ur-button>
          </div>
        </template>
      </ur-dialog>
    </div>
    <div>
      <p class="title">标签页</p>
      <ur-tabs v-model="tabActiveName">
        <ur-tab-pane label="用户管理" name="first">用户管理</ur-tab-pane>
        <ur-tab-pane label="配置管理" name="second">配置管理</ur-tab-pane>
        <ur-tab-pane label="角色管理" name="third">角色管理</ur-tab-pane>
        <ur-tab-pane label="定时任务补偿" name="fourth">定时任务补偿</ur-tab-pane>
      </ur-tabs>
    </div>
    <div>
      <p class="title">时间选择器</p>
      <time-picker/>
    </div>
    <div>
      <p class="title">时间选择器</p>
      <time-select/>
    </div>
    <div>
      <p class="title">日期选择器</p>
      <date-picker/>
    </div>
    <div>
      <p class="title">日期时间选择器</p>
      <date-time-picker/>
    </div>
    <div>
      <p class="title">表格</p>
      <table-demo/>
    </div>
    <div>
      <p class="title">跑马灯</p>
      <test-carousel></test-carousel>
    </div>
  </div>
</template>

<script>
import { defineComponent, h } from 'vue';
import ButtonDemo from './components/button.vue';
import SelectDemo from './components/select.vue';
import TestCarousel from './components/carousel.vue';
import TimePicker from './components/time-picker.vue';
import TimeSelect from './components/time-select.vue';
import DatePicker from './components/date-picker.vue';
import DateTimePicker from './components/date-time-picker.vue';
import TableDemo from './components/table.vue';

export default defineComponent({
  name: 'App',
  components: {
    ButtonDemo,
    SelectDemo,
    TestCarousel,
    TimePicker,
    TimeSelect,
    DatePicker,
    DateTimePicker,
    TableDemo,
  },
  data() {
    return {
      input: '',
      tags: [
        { name: '标签一', type: '' },
        { name: '标签二', type: 'success' },
        { name: '标签三', type: 'info' },
        { name: '标签四', type: 'warning' },
        { name: '标签五', type: 'danger' },
      ],
      options: [
        {
          value: '选项1',
          label: '选项1',
        },
        {
          value: '选项2',
          label: '选项2',
        },
        {
          value: '选项3',
          label: '选项3',
        },
        {
          value: '选项4',
          label: '选项4',
        },
        {
          value: '选项5',
          label: '选项5',
        },
        {
          value: '选项6',
          label: '选项6',
        },
        {
          value: '选项7',
          label: '选项7',
        },
        {
          value: '选项8',
          label: '选项8',
        },
        {
          value: '选项9',
          label: '选项9',
        },
      ],
      value: '',
      radio: 3,
      checkList: ['选中且禁用', '复选框 A'],
      switchValue: true,
      inputNumber: 1,
      sliderValue: 0,
      dialogVisible: false,
      outerVisible: false,
      innerVisible: false,
      tabActiveName: 'second',
    };
  },
  mounted() {},
  methods: {
    handleClose(tag) {
      this.tags.splice(this.tags.indexOf(tag), 1);
    },
    open1() {
      this.$notify({
        title: '标题名称',
        message: h('i', {}, '这是提示文案这是提示文案这是提示文案这是提示文案这是提示文案这是提示文案这是提示文案这是提示文案'),
      });
    },

    open2() {
      this.$notify({
        title: '提示',
        message: '这是一条不会自动关闭的消息',
        duration: 0,
      });
    },

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

    handleDialogClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done();
        })
        .catch(_ => {});
    },
  },
});
</script>

<style lang="scss">
body {
  background: #e6e7ee;
  display: flex;
  justify-content: center;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.title {
  font-size: 1.5rem;
  margin: 0.8rem 0;
}
.button {
  margin: 0 1rem;
  &.active {
    border: 0;
    box-shadow: inset 2px 2px 5px #b8b9be, inset -3px -3px 7px #ffffff;
  }
}
.input-demo {
  margin: 0 0 0.8rem;
  width: 25rem;
}
.tag-demo {
  margin: 0 0.4rem;
}

.space {
  margin: 0 .5rem;
}
</style>