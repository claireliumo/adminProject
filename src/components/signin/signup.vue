<template>
  <div class="signup">
    <div class="signup__dialog">
      <div class="signup__dialog--title">BIM平台</div>
      <div class="signup__dialog--form">
        <div class="signup__dialog--form-item">
          <span>用户名</span>
          <input v-model="form.uname" name="uname" />
        </div>
        <div class="signup__dialog--form-item">
          <span>昵称</span>
          <input v-model="form.nickname" name="nickname" />
        </div>
        <div class="signup__dialog--form-item">
          <span>密码</span>
          <input v-model="form.password" name="password" type="password" />
        </div>
        <div class="signup__dialog--form-item">
          <span>注册码</span>
          <input v-model="form.apply_code" name="apply_code" type="text" />
        </div>
         <div class="signup__dialog--form-tip" v-show="errortip">
          {{errortip}}
        </div>
        <!-- <div class="signup__dialog--form-tip">{{errortip}}</div> -->
        <div class="signup__dialog--form-ctrl">
          <button @click="signup">马上注册</button>
        </div>
      </div>
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
        apply_code: null,
        nickname: null,
        phone: null
      },
      nameAvailable: false,
      errortip: null,
    }
  },
  watch: {
    'form.uname': function(newVal){
      setTimeout(()=>{
        this.checkName(newVal);
      }, 300);
    }
  },
  methods: {
    backToSignin: function () {
      this.$router.push('signin')
    },
    signup: function () {
      // signup api request
      this.$http.post(this.FACTURL.baseURL+ '/register', this.form).then(response => {
        if(response.data.code === 0){
          this.backToSignin()
        }
        else{
          this.errortip = response.data.msg
        }
        console.log('signup', response);
        
      }).catch(err => {
        console.log(err)
        this.$router.push('signup')
      })
    },
    checkName: function(uname){
      this.$http.post(this.FACTURL.baseURL+'/register_name_check', {'uname': uname}).then(response=>{
        if(response.data.code === 0){
          this.nameAvailable = true;
        }
        else{
          
          this.nameAvailable = false;
        }
        this.errortip = response.data.data;
      })
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
         &-tip {
           color: red;
           height: 20px;
           line-height: 20px;
           text-align: left;
           margin-top: 6px;
         }
       }
     }
  }
</style>
