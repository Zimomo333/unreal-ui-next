
<template>
  <div class="box">
    <div class="top">
      <ur-tooltip class="item" effect="dark" content="Top Left 提示文字" placement="top-start">
        <ur-button>上左</ur-button>
      </ur-tooltip>
      <ur-tooltip class="item" effect="dark" content="Top Center 提示文字" placement="top">
        <ur-button>上边</ur-button>
      </ur-tooltip>
      <ur-tooltip class="item" effect="dark" content="Top Right 提示文字" placement="top-end">
        <ur-button>上右</ur-button>
      </ur-tooltip>
    </div>
    <div class="left">
      <ur-tooltip class="item" effect="dark" content="Left Top 提示文字" placement="left-start">
        <ur-button>左上</ur-button>
      </ur-tooltip>
      <ur-tooltip class="item" effect="dark" content="Left Center 提示文字" placement="left">
        <ur-button>左边</ur-button>
      </ur-tooltip>
      <ur-tooltip class="item" effect="dark" content="Left Bottom 提示文字" placement="left-end">
        <ur-button>左下</ur-button>
      </ur-tooltip>
    </div>

    <div class="right">
      <ur-tooltip class="item" effect="dark" content="Right Top 提示文字" placement="right-start">
        <ur-button>右上</ur-button>
      </ur-tooltip>
      <ur-tooltip class="item" effect="dark" content="Right Center 提示文字" placement="right">
        <ur-button>右边</ur-button>
      </ur-tooltip>
      <ur-tooltip class="item" effect="dark" content="Right Bottom 提示文字" placement="right-end">
        <ur-button>右下</ur-button>
      </ur-tooltip>
    </div>
    <div class="bottom">
      <ur-tooltip class="item" effect="dark" content="Bottom Left 提示文字" placement="bottom-start">
        <ur-button>下左</ur-button>
      </ur-tooltip>
      <ur-tooltip class="item" effect="dark" content="Bottom Center 提示文字" placement="bottom">
        <ur-button>下边</ur-button>
      </ur-tooltip>
      <ur-tooltip class="item" effect="dark" content="Bottom Right 提示文字" placement="bottom-end">
        <ur-button>下右</ur-button>
      </ur-tooltip>
    </div>
  </div>
</template>

<script>
</script>

<style lang="scss">
.box {
  width: 400px;
  margin: 0 auto;

  .top {
    text-align: center;
  }

  .left {
    float: left;
    width: 60px;
  }

  .right {
    float: right;
    width: 60px;
  }

  .bottom {
    clear: both;
    text-align: center;
  }

  .item {
    margin: 4px;
  }

  .left .ur-tooltip__popper,
  .right .ur-tooltip__popper {
    padding: 8px 10px;
  }
}
</style>
