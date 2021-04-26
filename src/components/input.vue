
<template>
  <ur-input class="input-demo" v-model="input1" placeholder="请输入内容"></ur-input>
  <br />
  <ur-input class="input-demo" placeholder="请输入内容" v-model="input2" :disabled="true"></ur-input>
  <br />
  <ur-input class="input-demo" placeholder="请输入内容" v-model="input3" clearable></ur-input>
  <br />
  <ur-input class="input-demo" placeholder="请输入密码" v-model="input4" show-password></ur-input>
  <br />
  <ur-input class="input-demo2" type="textarea" :rows="2" placeholder="请输入内容" v-model="textarea"></ur-input>
  <br />
  <ur-input class="input-demo2" type="textarea" autosize placeholder="请输入内容" v-model="textarea1"></ur-input>
  <br />
  <ur-input
    class="input-demo2"
    type="textarea"
    :autosize="{ minRows: 2, maxRows: 4}"
    placeholder="请输入内容"
    v-model="textarea4"
  ></ur-input>
  <br />
  <ur-input
    class="input-demo2"
    type="text"
    placeholder="请输入内容"
    v-model="textarea2"
    maxlength="10"
    show-word-limit
  ></ur-input>
  <br />
  <ur-input
    class="input-demo2"
    type="textarea"
    placeholder="请输入内容"
    v-model="textarea3"
    maxlength="30"
    show-word-limit
  ></ur-input>
  <br />
  <ur-input class="input-demo2" v-model="input5" placeholder="请输入内容" clearable>
    <template #prepend>Http://</template>
  </ur-input>
  <br />
  <ur-input class="input-demo2" v-model="input6" placeholder="请输入内容" clearable>
    <template #append>.com</template>
  </ur-input>
  <br />
  <ur-input class="input-demo2" v-model="input7" placeholder="请输入内容" show-password>
    <template #prepend>密码</template>
    <template #append>
      <ur-button>提交</ur-button>
    </template>
  </ur-input>
</template>

<script>
import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup() {
    return {
      input1: ref(''),
      input2: ref(''),
      input3: ref(''),
      input4: ref(''),
      input5: ref(''),
      input6: ref(''),
      input7: ref(''),
      textarea: ref(''),
      textarea1: ref(''),
      textarea2: ref(''),
      textarea3: ref(''),
      textarea4: ref(''),
    };
  },
});
</script>

<style>
.input-demo {
  margin: 0 0 0.8rem;
  width: 14rem;
}

.input-demo2 {
  margin: 0 0 0.8rem;
  width: 24rem;
}
</style>
