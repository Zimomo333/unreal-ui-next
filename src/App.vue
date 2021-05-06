<template>
  <div id="app">
    <div>
      <p class="title">按钮</p>
      <button-demo />
    </div>
    <div>
      <p class="title">单选框</p>
      <radio-demo />
      <p class="title">多选框</p>
      <checkbox-demo />
    </div>
    <div>
      <p class="title">输入框</p>
      <input-demo />
    </div>
    <div>
      <p class="title">计数器</p>
      <input-number-demo />
    </div>
    <div>
      <p class="title">选择器</p>
      <select-demo />
    </div>
    <div>
      <p class="title">开关</p>
      <switch-demo />
    </div>
    <div>
      <p class="title">滑块</p>
      <slider-demo />
    </div>
    <div>
      <p class="title">时间选择器</p>
      <time-picker-demo />
    </div>
    <div>
      <p class="title">时间选择器</p>
      <time-select-demo />
    </div>
    <div>
      <p class="title">日期选择器</p>
      <date-picker-demo />
    </div>
    <div>
      <p class="title">日期时间选择器</p>
      <date-time-picker-demo />
    </div>
    <div>
      <p class="title">表格</p>
      <table-demo />
    </div>
    <div>
      <p class="title">标签</p>
      <tag-demo />
    </div>
    <div>
      <p class="title">进度条</p>
      <progress-demo />
    </div>
    <div>
      <p class="title">分页</p>
      <pagination-demo />
    </div>
    <div>
      <p class="title">消息提示</p>
      <message-demo />
    </div>
    <div>
      <p class="title">弹框</p>
      <message-box-demo />
    </div>
    <div>
      <p class="title">通知</p>
      <notification-demo />
    </div>
    <div>
      <p class="title">标签页</p>
      <tabs-demo />
    </div>
    <div>
      <p class="title">面包屑</p>
      <breadcrumb-demo />
    </div>
    <div>
      <p class="title">对话框</p>
      <dialog-demo />
    </div>
    <div>
      <p class="title">气泡</p>
      <tooltip-demo />
    </div>
    <div>
      <p class="title">跑马灯</p>
      <carousel-demo />
    </div>
    <div>
      <p class="title">柱状图</p>
      <bar-chart-demo />
    </div>
  </div>
</template>

<script>
import { defineComponent, h } from 'vue';
import ButtonDemo from './components/button.vue';
import RadioDemo from './components/radio.vue';
import CheckboxDemo from './components/checkbox.vue';
import InputDemo from './components/input.vue';
import InputNumberDemo from './components/input-number.vue';
import SelectDemo from './components/select.vue';
import SwitchDemo from './components/switch.vue';
import SliderDemo from './components/slider.vue';
import TimePickerDemo from './components/time-picker.vue';
import TimeSelectDemo from './components/time-select.vue';
import DatePickerDemo from './components/date-picker.vue';
import DateTimePickerDemo from './components/date-time-picker.vue';
import TableDemo from './components/table.vue';
import TagDemo from './components/tag.vue';
import ProgressDemo from './components/progress.vue';
import PaginationDemo from './components/pagination.vue';
import MessageDemo from './components/message.vue';
import MessageBoxDemo from './components/message-box.vue';
import NotificationDemo from './components/notification.vue';
import TabsDemo from './components/tabs.vue';
import BreadcrumbDemo from './components/breadcrumb.vue';
import DialogDemo from './components/dialog.vue';
import TooltipDemo from './components/tooltip.vue';
import CarouselDemo from './components/carousel.vue';
import BarChartDemo from './components/bar-chart.vue';

export default defineComponent({
  name: 'App',
  components: {
    ButtonDemo,
    RadioDemo,
    CheckboxDemo,
    InputDemo,
    InputNumberDemo,
    SelectDemo,
    SwitchDemo,
    SliderDemo,
    TimePickerDemo,
    TimeSelectDemo,
    DatePickerDemo,
    DateTimePickerDemo,
    TableDemo,
    TagDemo,
    ProgressDemo,
    PaginationDemo,
    MessageDemo,
    MessageBoxDemo,
    NotificationDemo,
    TabsDemo,
    BreadcrumbDemo,
    DialogDemo,
    TooltipDemo,
    CarouselDemo,
    BarChartDemo,
  },
});
</script>

<style lang="scss">
body {
  background: #e6e7ee;
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
.tag-demo {
  margin: 0 0.4rem;
}
.space {
  margin: 0 0.5rem;
}
.date-margin {
  margin: 0 1rem 22rem;
}
.test {
  width: 4rem;
  height: 4rem;
}
</style>