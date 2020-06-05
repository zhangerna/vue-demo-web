<template>
  <div class="login">
    <div class="app flex-row align-items-center">
      <div class="container">
        <div class="justify-content-center logo">
          <img src="@/assets/pages-img/logo.svg" width="300px">
          <p>{{ $t('m.register.title') }}</p>
        </div>
        <b-row class="justify-content-center">
          <b-col md="8">
            <b-card-group>
              <b-card no-body class="p-4">
                <b-card-body>
                  <b-form>
                    <h1>{{ $t('m.login.title2') }}</h1>
                    <p class="text-muted">{{ $t('m.login.l_p') }}</p>
                    <b-input-group class="mb-3">
                      <b-input-group-prepend><b-input-group-text><i class="icon-user"></i></b-input-group-text></b-input-group-prepend>
                      <b-form-input type="text" :class="errorUsername" v-model="username" class="form-control" :placeholder="$t('m.login.p_username')" autocomplete="username email" @keyup.enter.native="handleLogin" />
                    </b-input-group>
                    <b-input-group class="mb-4">
                      <b-input-group-prepend><b-input-group-text><i class="icon-lock"></i></b-input-group-text></b-input-group-prepend>
                      <b-form-input type="password" class="form-control" :class="errorPass" v-model="password" :placeholder="$t('m.login.p_password')" autocomplete="current-password" @keyup.enter.native="handleLogin" />
                    </b-input-group>
                    <b-row>
                      <b-col cols="6">
                        <b-button @click="handleLogin" variant="primary" class="px-4">{{ $t('m.login.title2') }}</b-button>
                      </b-col>
                      <b-col cols="6" class="text-right">
                        <b-button variant="link" class="px-0" @click="$router.push('/forget-password')">{{ $t('m.login.forgot_password') }}</b-button>
                      </b-col>
                    </b-row>
                  </b-form>
                </b-card-body>
              </b-card>
              <b-card no-body class="text-white bg-primary py-5 d-md-down-none" style="width:44%">
                <b-card-body class="text-center">
                  <div>
                    <h2>{{ $t('m.login.title3') }}</h2>
                    <p>{{ $t('m.login.r_desc') }}</p>
                  </div>
                </b-card-body>
              </b-card>
            </b-card-group>
          </b-col>
        </b-row>
      </div>
    </div>
    <div class="text-center cn-beian">
      <a href="https://zus.ai">ZUS.ai</a>
      <span class="ml-1">© Copyright No NDA Inc., All Rights Reserved</span>
      <span class="ml-1">沪ICP备19032313号 </span>
      <a href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=31011202011601">沪公网安备 31011202011601号</a>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .logo {
    text-align: center;
    p {
      font-size: 32px;
      margin: 20px 0;
    }
  }
  .cn-beian {
    margin-bottom: 10px;
  }
</style>

<script>

import httpclient from '../../utils/httpclient';
import {saveTokenExpireAt, saveUserInfo,saveUserId} from '../../utils/token'

export default {
  name: 'Login',
  data(){
    return {
      username: '',
      password: '',
      errorUsername: '',
      errorPass: ''
    }
  },
  methods: {
    handleLogin(){
      this.errorUsername = "";
      this.errorPass = "";
      if (!this.username || this.username.indexOf("@") < 1) {
        this.errorUsername = "is-invalid";
        return;
      }
      if (!this.password || this.password.length < 6) {
        this.errorPass = "is-invalid";
        return;
      }
      httpclient.post('/api/v1/login',{
        username: this.username,
        password: this.password
      }).then((response)=>{
        localStorage.setItem("user_info", JSON.stringify(response.data.data.user));
        localStorage.setItem("role", response.data.data.user.roleCode);
        this.$store.dispatch("user_info", response.data.data.user);
        saveTokenExpireAt(response.data.data.token.expireAt);
        saveUserInfo(response.data.data.user.userEmail);
        saveUserId(response.data.data.user.userId);
        this.$router.push({ path: '/index'});
      }).catch((err) => {
          alert("Login Failed, Username or Password Incorrect!")
      })

    }
  }
}
</script>
