<template>
  <div class="signin">
    <div class="signin__dialog">
      <div class="signin__dialog--title">BIM平台</div>
      <el-form :model="form"
               class="signin__dialog--form"
               label-position="left"
               label-width="100px"
               size="medium">
        <el-form-item label="用户名" >
          <el-input v-model="form.uname" autocomplete="off" width="250px"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input type="password" v-model="form.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="signin">登录</el-button>
          <el-button type="text" @click="goToSignup">注册</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
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
      }
    }
  },
  methods: {
    goToSignup: function () {
      this.$router.push('signup')
    },
    signin: function () {
      console.log('signin')
      this.$router.push('main')
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
    background-color: $md-blue1;
    &__dialog {
      display: flex;
      flex-direction: column;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 600px;
      height: 400px;
      padding: 10px;
      border: 1px solid $md-bluegrey3;
      border-radius: 4px;
      background-color: $md-blue2;
      &--title{
         height: 50px;
         line-height: 50px;
         font-weight: 600;
         font-size: 30px;
         text-align: center;
         color: $md-bluegrey9;
       }
      &--form{
         margin: 30px auto;
         height: 350px;
         width: 80%;
       }
     }
  }
</style>
