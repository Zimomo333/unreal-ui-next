<template>
  <div>
    <p class="title">按钮</p>
    <ur-button class="button-demo" size="large">超大尺寸</ur-button>
    <ur-button class="button-demo" size="medium">中等尺寸</ur-button>
    <ur-button class="button-demo" size="small">小型尺寸</ur-button>
    <ur-button class="button-demo" size="mini">超小尺寸</ur-button>
    <ur-button class="button-demo" :loading="true">加载中...</ur-button>
    <ur-button class="button-demo active">按下</ur-button>
  </div>
  <div>
    <p class="title">标签</p>
    <ur-tag
      class="tag-demo"
      v-for="tag in tags"
      :key="tag.name"
      closable
      @close="handleClose"
      :type="tag.type">
      {{tag.name}}
    </ur-tag>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'App',
  components: {
  },
  data() {
    return {
      tags: [
        { name: '标签一', type: '' },
        { name: '标签二', type: 'success' },
        { name: '标签三', type: 'info' },
        { name: '标签四', type: 'warning' },
        { name: '标签五', type: 'danger' }
      ],
    }
  },
  methods: {
    handleClose(tag: any) {
      this.tags.splice(this.tags.indexOf(tag), 1);
    }
  }
})
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
  margin: .8rem 0;
}
.button-demo {
  margin: 0 1rem;
  &.active {
    border: 0;
    box-shadow: inset 2px 2px 5px #b8b9be, inset -3px -3px 7px #FFFFFF;
  }
}
.input-demo {
  margin: 0 0 0.8rem;
  width: 25rem;
}
.tag-demo {
  margin: 0 0.4rem;
}
</style>