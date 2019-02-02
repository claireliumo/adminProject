<template>
  <div class="signin">
    <div class="signin__dialog">
      <div class="signin__dialog--title">BIM平台</div>
      <div class="signin__dialog--form">
        <div class="signin__dialog--form-item">
          <span>用户名</span>
          <input v-model="form.uname" name="uname" @keyup.enter="signin"/>
        </div>
        <div class="signin__dialog--form-item">
          <span>密码</span>
          <input v-model="form.password" name="password" type="password" @keyup.enter="signin"/>
        </div>
        <div class="signin__dialog--form-msg" v-show="err">
          {{err}}
        </div>
        <div class="signin__dialog--form-ctrl">
          <button @click="signin">登录</button>
          <router-link to="/signup" class="toSignup">注册</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  name: 'Signin',
  mounted () {
    // to do check login status

  },
  data () {
    return {
      form: {
        uname: null,
        password: null
      },
      err: null
    }
  },
  methods: {
    signin: function () {
     // this.$http.post(this.FACTURL.baseURL+ '/login', this.form).then(response => {
      this.$http.post('api/login', this.form).then(response => {
        console.log(response);
        if (response.data.code === 0) {
          window.sessionStorage.setItem('isLogin', true);
         // window.sessionStorage.setItem('')
          this.err = null;
          this.$router.push('/main')
        } else {
          this.err = response.data.data
        }
      });
    }
  }
}
</script>
<style lang="scss" scoped>
  @import '../../styles/imports.scss';
  .signin {
    width: 100%;
    height: 100%;
    position: relative;
    background: linear-gradient(#023838, #011f1f);
   // background-color: $md-blue1;
    &__dialog {
      display: flex;
      flex-direction: column;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 650px;
      height: 400px;
      padding: 10px;
      border: 4px solid;
      border-image: linear-gradient(#01ffff, #023838) 30 30;
      background-color: #011f1f;
      box-shadow: inset 0 0 100px #01ffff;
      &--title{
         height: 60px;
         line-height: 60px;
         font-weight: 600;
         font-size: 60px;
         text-align: center;
         color: #01ffff;
         margin-top: 30px;
       }
      &--form{
         margin: 30px auto;
         height: 350px;
         width: 80%;
         &-item {
           height: 60px;
           line-height: 60px;
           border-bottom: 2px solid #01ffff;
           display: flex;
           justify-content: baseline;
           span {
             color: #01ffff;
             font-size: 26px;
             font-weight: 600;
             opacity: 0.9;
             width: 100px;
           }
           input {
             flex: 1;
             height: 100%;
             color: #01ffff;
             font-size: 26px;
             background: transparent;
             border: none;
             &:focus{
               border: none;
               outline: none;
             }
           }
         }
         &-msg {
            color: red;
            height: 20px;
            line-height: 20px;
            text-align: left;
            margin-top: 6px;
          }
         &-ctrl {
           display: flex;
           margin-top: 45px;
           justify-content: space-evenly;
           button, .toSignup {
             width: 120px;
             text-align: center;
             font-size: 26px;
             font-weight: 600;
             color: #01ffff;
             cursor: pointer;
             background: transparent;
             border:none;
           }
         }
       }
     }
  }
</style>
