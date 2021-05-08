<template>
  <div class="dropdown_demo">
    <ur-dropdown>
      <span>
        <ur-button>
          下拉菜单
          <svg
            t="1620467593457"
            class="icon"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="2585"
            width="20"
            height="20"
          >
            <path
              d="M512 729.86624c-13.70112 0-27.40224-5.23264-37.84704-15.6672l-328.69376-328.704c-20.91008-20.91008-20.91008-54.80448 0-75.70432 20.89984-20.89984 54.79424-20.89984 75.70432 0L512 600.63744l290.83648-290.83648c20.91008-20.89984 54.80448-20.89984 75.70432 0 20.91008 20.89984 20.91008 54.79424 0 75.70432l-328.69376 328.704C539.40224 724.64384 525.70112 729.86624 512 729.86624z"
              p-id="2586"
              fill="#707070"
            />
          </svg>
        </ur-button>
      </span>
      <template #dropdown>
        <ur-dropdown-menu>
          <ur-dropdown-item>选项1</ur-dropdown-item>
          <ur-dropdown-item>选项2</ur-dropdown-item>
          <ur-dropdown-item>选项3</ur-dropdown-item>
          <ur-dropdown-item>选项4</ur-dropdown-item>
          <ur-dropdown-item disabled>选项5</ur-dropdown-item>
          <ur-dropdown-item divided>选项6</ur-dropdown-item>
        </ur-dropdown-menu>
      </template>
    </ur-dropdown>
  </div>
</template>

<style>
.dropdown_demo svg {
  vertical-align: middle;
}
</style>
