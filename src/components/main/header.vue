<template>
  <div class="main-header">
    <div class="main-header__logo">
      <span>永丰BIM平台</span>
    </div>
    <el-menu mode="horizontal"
             text-color="#01ffff"
             background-color="transparent"
             class="customHeader"
             active-text-color="#feb302"
             @select="handleSelectChange">
      <!-- <el-submenu index="environment" style="background-color: transparent">
        <template slot="title">项目概况</template>
        <el-menu-item index="internal">室内环境</el-menu-item>
        <el-menu-item index="outdoor">室外环境</el-menu-item>
      </el-submenu> -->
       <el-menu-item index="outline">项目概况</el-menu-item>
      <el-submenu index="power">
        <template slot="title">环境信息</template>
        <el-menu-item index="internal">室内环境</el-menu-item>
        <el-menu-item index="outdoor">室外环境</el-menu-item>
        <el-menu-item index="outdoor">用能情况</el-menu-item>
      </el-submenu>
      <el-menu-item index="status">运行监控</el-menu-item>
      <el-menu-item index="security">门禁管理</el-menu-item>
      <el-menu-item index="fire">消防</el-menu-item>
    </el-menu>
    <div class="main-header__tool">
      <i class="el-icon-rank"></i>
      <i class="el-icon-setting"></i>
      <el-button type="text" @click="signout"><i class="el-icon-error"></i></el-button>
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
    signout: function () {
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
   // background-color: #545c64;
    display: flex;
    .customHeader {
      .el-menu-item {
        font-size: 36px !important;
      }

      .el-submenu {
        .el-submenu__title {
          font-size: 36px !important;
        }
      }
      .el-submenu:hover .el-submenu__title {
        background: transparent !important;
      }
    }

    &__logo {
      width: 400px;
      padding-left: 20px;
      span {
        font-size: 50px;
        font-weight: 600;
        color: #01ffff;
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
        color: #01ffff;
        font-size: 28px;
      }
     }
  }
</style>
