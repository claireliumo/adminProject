<template>
  <div class="signup">
    <div class="signup__dialog">
      <div class="signup__dialog--title">BIM平台</div>
      <form class="signup__dialog--form">
        <div class="signup__dialog--form-item">
          <span>用户名</span>
          <input v-model="form.uname" name="uname" />
        </div>
        <div class="signup__dialog--form-item">
          <span>密码</span>
          <input v-model="form.password" name="password" type="password" />
        </div>
        <div class="signup__dialog--form-item">
          <span>注册码</span>
          <input v-model="form.code" name="password" type="password" />
        </div>
        <div class="signup__dialog--form-ctrl">
          <button @click="goToSignup">马上注册</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Signup',
  data () {
    return {
      form: {
        uname: null,
        password: null,
        confirmPassword: null,
        code: null
      }
    }
  },
  methods: {
    backToSignin: function () {
      this.$router.push('signin')
    },
    signup: function () {
      // signup api request
      this.backToSignin()
    }
  }
}
</script>
<style lang="scss" scoped>
@import '../../styles/imports.scss';
  .signup {
    width: 100%;
    height: 100%;
    position: relative;
    background: linear-gradient(#023838, #011f1f);
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
      border-radius: 4px;
      background: transparent;
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
         &-ctrl {
           display: flex;
           margin-top: 45px;
           justify-content: center;
           button {
             width: 50%;
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
