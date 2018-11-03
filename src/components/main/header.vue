<template>
  <div class="main-header">
    <div class="main-header__logo">
      <i class="el-icon-service"></i>
    </div>
    <el-menu mode="horizontal"
             background-color="#545c64"
             text-color="#fff"
             active-text-color="#ffd04b"
             @select="handleSelectChange">
      <el-submenu index="environment">
        <template slot="title">环境</template>
        <el-menu-item index="internal">室内环境</el-menu-item>
        <el-menu-item index="outdoor">室外环境</el-menu-item>
      </el-submenu>
      <el-submenu index="power">
        <template slot="title">能源消耗</template>
        <el-menu-item index="elec">用电</el-menu-item>
        <el-menu-item index="water">用水</el-menu-item>
      </el-submenu>
      <el-menu-item index="status">运行状态</el-menu-item>
      <el-menu-item index="security">门禁管理</el-menu-item>
      <el-menu-item index="fire">消防</el-menu-item>
    </el-menu>
    <div class="main-header__tool">
      <i class="el-icon-rank"></i>
      <i class="el-icon-setting"></i>
      <el-button type="text" @click="signout">登出</el-button>
    </div>
  </div>
</template>
<script>
export default{
  name: 'Header',
  methods: {
    handleSelectChange: function (key) {
      console.log(key)
    },
    signout: function() {
      console.log('signout')
      this.$router.push('/signin')
    }
  }
}
</script>
<style lang="scss" scoped>
  .main-header {
    width: 100%;
    height: 60px;
    line-height: 60px;
    background-color: #545c64;
    display: flex;
    &__logo {
      i{
        width: 50px;
        height: 50px;
        line-height: 50px;
        margin: 5px;
        font-size: 32px;
        color: #fff;
        border: 2px solid #fff;
        border-radius: 50%;
      }
     }
    &__tool {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: flex-end;
      font-size: 28px;
      margin: auto 20px;
      i{
        width: 40px;
      }
     }
  }
</style>
