<template>
  <div class="form_demo">
    <div class="login-container">
      <ur-form
        ref="loginForm"
        :model="loginForm"
        :rules="loginRules"
        class="login-form"
        label-width="4.1rem"
        auto-complete="on"
        label-position="left"
      >
        <p class="title">UnrealUI-Admin</p>

        <ur-form-item prop="username" label="用户名">
          <ur-input
            ref="username"
            v-model="loginForm.username"
            placeholder="Username"
            name="username"
            type="text"
            tabindex="1"
            auto-complete="on"
          >
            <template #prepend>
              <svg
                t="1620728279621"
                class="icon"
                viewBox="0 0 1039 1024"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                p-id="13279"
                width="20"
                height="20"
              >
                <path
                  d="M462.619289 83.68731c-12.994924 2.598985-40.024365 12.994924-60.816243 22.871066C284.328934 164.255838 244.824365 313.437563 317.076142 425.193909c97.721827 151.780711 335.788832 127.870051 402.322843-40.544163C783.853807 221.433503 637.790863 49.900508 462.619289 83.68731zM369.055838 570.217259c-115.394924 20.791878-212.596954 114.35533-236.507615 227.671066-8.836548 42.62335-9.876142 82.127919-2.598984 96.682233 7.796954 14.034518 40.544162 29.108629 78.48934 36.385787 47.82132 8.316751 429.872081 12.475127 534.871066 5.19797 133.587817-8.316751 166.335025-23.390863 166.335025-75.370559-0.519797-72.251777-29.628426-145.543147-78.48934-198.042639-36.385787-38.464975-70.172589-61.336041-117.993909-80.048731-34.306599-12.994924-37.945178-12.994924-182.968528-14.034518-81.608122-0.519797-153.859898 0-161.137055 1.559391z"
                  p-id="13280"
                  fill="#707070"
                />
              </svg>
            </template>
          </ur-input>
        </ur-form-item>

        <ur-form-item prop="password" label="密码　">
          <ur-input
            :key="passwordType"
            ref="password"
            v-model="loginForm.password"
            :type="passwordType"
            placeholder="Password"
            name="password"
            tabindex="2"
            auto-complete="on"
            @keyup.enter.native="handleLogin"
          >
            <template #prepend>
              <svg
                t="1620727984717"
                class="icon"
                viewBox="0 0 1024 1024"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                p-id="11071"
                width="20"
                height="20"
              >
                <path
                  d="M768.9216 422.72768 372.06016 422.72768C378.88 365.21984 329.37984 131.42016 512.2048 125.72672c173.83424-6.59456 146.78016 213.34016 146.78016 213.34016l85.13536 0.57344c0 0 24.73984-294.4-231.91552-295.8336C232.09984 58.01984 297.82016 377.18016 289.28 422.72768c1.98656 0 4.56704 0 7.29088 0-55.88992 0-101.21216 45.34272-101.21216 101.21216l0 337.38752c0 55.88992 45.34272 101.21216 101.21216 101.21216l472.35072 0c55.88992 0 101.21216-45.34272 101.21216-101.21216L870.13376 523.93984C870.13376 468.0704 824.79104 422.72768 768.9216 422.72768zM566.4768 717.02528l0 76.84096c0 18.57536-15.1552 33.73056-33.73056 33.73056-18.57536 0-33.73056-15.1552-33.73056-33.73056l0-76.84096c-20.09088-11.69408-33.73056-33.21856-33.73056-58.12224 0-37.2736 30.208-67.4816 67.4816-67.4816 37.2736 0 67.4816 30.208 67.4816 67.4816C600.22784 683.80672 586.58816 705.3312 566.4768 717.02528z"
                  p-id="11072"
                  fill="#707070"
                />
              </svg>
            </template>
          </ur-input>
        </ur-form-item>
      </ur-form>
        <ur-checkbox class="checkbox" v-model="checkbox">记住我</ur-checkbox>
        <ur-button class="login_button" :loading="loading" @click.native.prevent="handleLogin">Login</ur-button>
        <div class="link">
    <a href="https://github.com/Zimomo333" target="_blank">
          <ur-button class="space" circle>
            <svg
              t="1620687606295"
              class="icon"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="1626"
              width="18"
              height="18"
            >
              <path
                d="M0 524.992q0 166.016 95.488 298.496t247.488 185.504q6.016 0.992 10.016 0.992t6.496-1.504 4-3.008 2.016-4.992 0.512-4.992v-100.512q-36.992 4-66.016-0.512t-45.504-14.016-28.992-23.488-16.992-25.504-8.992-24-5.504-14.496q-8.992-15.008-27.008-27.488t-27.008-20-2.016-14.496q50.016-26.016 112.992 66.016 34.016 51.008 119.008 30.016 10.016-40.992 40-70.016Q293.984 736 237.984 670.976t-56-158.016q0-87.008 55.008-151.008-22.016-64.992 6.016-136.992 28.992-2.016 64.992 11.488t50.496 23.008 25.504 17.504q56.992-16 128.512-16t129.504 16q12.992-8.992 28.992-19.008t48.992-21.504 60.992-9.504q27.008 71.008 7.008 135.008 56 64 56 151.008 0 92.992-56.992 158.496t-172 85.504q43.008 43.008 43.008 104v128.992q0 0.992 0.992 3.008 0 6.016 0.512 8.992t4.512 6.016 12 3.008q152.992-52 250.496-185.504t97.504-300.512q0-104-40.512-199.008t-108.992-163.488-163.488-108.992T512.032 12.96 313.024 53.472 149.536 162.464t-108.992 163.488-40.512 199.008z"
                p-id="1627"
                fill="#707070"
              />
            </svg>
          </ur-button>
        </a>
        <a href="mailto:lzh120908717@gmail.com" target="_blank">
          <ur-button class="space" circle>
            <svg
              t="1620687690371"
              class="icon"
              viewBox="0 0 1365 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="2657"
              width="18"
              height="18"
            >
              <path
                d="M1365.203314 853.252071a168.115037 168.115037 0 0 1-22.135797 81.814685L911.955814 453.052471 1338.581849 82.009713a169.285211 169.285211 0 0 1 26.621465 90.493477v680.553852zM682.601657 540.718027L1275.587468 21.258166a167.627464 167.627464 0 0 0-81.814684-21.258166H169.967813A168.992667 168.992667 0 0 0 87.76307 21.258166z m163.824398-31.887249L709.223122 629.553757a40.858585 40.858585 0 0 1-56.070851 0L515.851824 508.830778l-434.03714 488.547757a168.212551 168.212551 0 0 0 90.103419 26.231407h1023.902486a168.212551 168.212551 0 0 0 90.103418-26.231407L848.376345 508.830778h-1.95029zM26.621465 82.009713A169.967813 169.967813 0 0 0 0 170.942958v682.601657a167.724979 167.724979 0 0 0 22.135797 81.814684l430.81916-482.014284L26.718979 82.78983z m0 0z"
                p-id="2658"
                fill="#707070"
              />
            </svg>
          </ur-button>
        </a>
        <a href="http://zimomo.top/" target="_blank">
          <ur-button class="space" circle>
            <svg
              t="1620688021085"
              class="icon"
              viewBox="0 0 1000 1000"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="9164"
              width="18"
              height="18"
            >
              <path
                d="M980.779 968.702l0.212-21.22c0-503.961-408.557-912.5-912.539-912.5l-21.221 0.212v148.334c433.662 0 785.207 351.537 785.207 785.174h148.34zM641.018 968.702l0.423-21.22c0-316.444-256.531-572.965-572.989-572.965l-21.221 0.423v148.123c246.132 0 445.659 199.517 445.659 445.641h148.129zM47.231 841.374c0 70.324 57.006 127.328 127.33 127.328 70.327 0 127.33-57.004 127.33-127.328 0-70.315-57.003-127.322-127.33-127.322-70.324-0.001-127.33 57.007-127.33 127.322z"
                p-id="9165"
                fill="#707070"
              />
            </svg>
          </ur-button>
        </a>
        </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data() {
    return {
      loginForm: {
        username: '',
        password: '',
      },
      loginRules: {
        username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
      },
      loading: false,
      passwordType: 'password',
      redirect: undefined,
      checkbox: false,
    };
  },
  methods: {
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
        } else {
          return false;
        }
      });
    },
  },
};
</script>

<style lang="scss">
.form_demo {
  display: flex;
  justify-content: center;

  .login-container {
    position: relative;
    width: 20rem;
    height: 21rem;
    padding: 1.5rem 2rem 1rem;
    border: 0.0625rem solid #d1d9e6;
    border-radius: 0.55rem;
    box-shadow: 3px 3px 6px #b8b9be, -3px -3px 6px #fff;

    .title {
      margin: 0 0 1.5rem;
      text-align: center;
      font-size: 1.5rem;
      font-weight: 700;
    }
  }
  .ur-input-group__prepend {
    padding: 0 0.5rem;
  }
  .login_button {
    width: 20rem;
    display: block;
    margin: 2rem auto 0;
  }
  .checkbox {
    float: right;
    margin: 0 .3rem 1.2rem 1rem;
  }
  .link {
    display: flex;
    justify-content: center;

    a {
      margin: 1.8rem .5rem;
    }
  }
}
</style>