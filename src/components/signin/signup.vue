<template>
  <div class="signup">
    <div class="signup__dialog">
      <div class="signup__dialog--title">BIM平台</div>
      <el-form :model="form"
               class="signin__dialog--form"
               label-position="left"
               label-width="100px"
               size="medium">
        <el-form-item label="用户名" >
          <el-input v-model="form.uname" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input type="password" v-model="form.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="确认密码">
          <el-input type="password" v-model="form.confirmPassword" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="注册码" >
          <el-input v-model="form.code" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="signup">现在注册</el-button>
          <el-button type="text" @click="backToSignin">返回登录</el-button>
        </el-form-item>
      </el-form>
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
</style>
