<template>
  <div class="main-header">
    <div class="main-header__logo">
      <span>永丰BIM平台</span>
    </div>
    <div class="main-header__divider"></div>
    <div class="main-header__navbar">
      <Menu :datas="datas.outline" v-width="200" 
            className="main-header__navbar-menu"
            @click="handleClick"
            @select="handleSelectChange"></Menu>
      <Menu :datas="datas.env" v-width="200" 
            className="main-header__navbar-menu" 
            @select="handleSelectChange"
            @click="handleClick"></Menu>
      <Menu :datas="datas.opmonitor" v-width="200" className="main-header__navbar-menu"></Menu>
      <Menu :datas="datas.semonitor" v-width="200" className="main-header__navbar-menu"></Menu>
      <Menu :datas="datas.firemonitor" v-width="200" className="main-header__navbar-menu"></Menu>
      <div class="main-header__tool">
        <i class="el-icon-rank"></i>
        <i class="el-icon-setting"></i>
        <el-button type="text" @click="signout"><i class="el-icon-error"></i></el-button>
      </div>
    </div>  
  </div>
</template>
<script>
export default{
  name: 'Header',
  data () {
    return {
      datas: {
        outline: [{
          title: '项目概况',
          key: '1',
          detail: [
            {
              title: '全区概况',
              key: '1-1'
            },
            {
              title: '建筑概况',
              key: '1-2'
            }
          ]
        }],
        env: [{
          title: '环境信息',
          key: '2',
          children: [
            {
              title: '室内环境',
              key: '2-1',
              children: [
                {
                  title: '建筑环境',
                  key: '2-1-1',
                  detail: [
                    {
                      title: '实时数据',
                      key: '2-1-1-1'
                    },
                    {
                      title: '历史数据',
                      key: '2-1-1-2'
                    }
                  ]
                },
                {
                  title: '楼层环境',
                  key: '2-1-2',
                  detail: [
                    {
                      title: '实时数据',
                      key: '2-1-2-1'
                    },
                    {
                      title: '历史数据',
                      key: '2-1-2-2'
                    }
                  ]
                },
                {
                  title: '房间环境',
                  key: '2-1-3',
                  detail: [
                    {
                      title: '实时数据',
                      key: '2-1-2-1'
                    },
                    {
                      title: '历史数据',
                      key: '2-1-2-2'
                    }
                  ]
                }
              ]
            },
            {
              title: '室外环境',
              key: '2-2',
              children: [
                {
                  title: '实时数据',
                  key: '2-2-1'
                },
                {
                  title: '本日数据',
                  key: '2-2-2',
                  detail: [
                    {
                      title: '本日平均温度',
                      key: '2-2-2-1'
                    },
                    {
                      title: '本日平均湿度',
                      key: '2-2-2-2'
                    },
                    {
                      title: '本日平均风速',
                      key: '2-2-2-3'
                    },
                    {
                      title: '本日平均PM2.5',
                      key: '2-2-2-4'
                    }
                  ]
                },
                {
                  title: '本月数据',
                  key: '2-2-3',
                  detail: [
                    {
                      title: '本月温度',
                      key: '2-2-3-1'
                    },
                    {
                      title: '本月湿度',
                      key: '2-2-3-2'
                    },
                    {
                      title: '本月风速',
                      key: '2-2-3-3'
                    },
                    {
                      title: '本月PM2.5',
                      key: '2-2-3-4'
                    }
                  ]
                },
                {
                  title: '本年数据',
                  key: '2-2-4',
                  detail: [
                    {
                      title: '本年温度',
                      key: '2-2-4-1'
                    },
                    {
                      title: '本年湿度',
                      key: '2-2-4-2'
                    },
                    {
                      title: '本年风速',
                      key: '2-2-4-3'
                    },
                    {
                      title: '本年PM2.5',
                      key: '2-2-4-4'
                    }
                  ]
                }
              ]
            },
            {
              title: '用能情况',
              key: '2-3',
              children: [
                {
                  title: '用能总览',
                  key: '2-3-1'
                },
                {
                  title: '用电情况',
                  key: '2-3-2'
                },
                {
                  title: '用气情况',
                  key: '2-3-3'
                },
                {
                  title: '用水情况',
                  key: '2-3-4'
                },
                {
                  title: '用热情况',
                  key: '2-3-5'
                }
              ]
            }
          ]
        }],
        opmonitor: [{
          title: '运行监控'
        }],
        semonitor: [{
          title: '安防监控'
        }],
        firemonitor: [{
          title: '消防监控'
        }],
      },
      currentActive: null
    }
  },
  methods: {
    handleSelectChange: function (menu) {
      this.currentActive = menu;
      // this.$Message.info(`选中${menu.title}`);
      this.$emit('change', menu);
    },
    handleClick: function(data) {
      console.log(data)
    },
    signout: function () {
      window.sessionStorage.removeItem('isLogin');
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
   // background-image: url('../../assets/title.png');
   // background-color: #545c64;
    display: flex;
    &__logo {
      width: 400px;
      padding-left: 20px;
      span {
        font-size: 50px;
        font-weight: 600;
        color: #01ffff;
      }
     }
    &__divider {
      width: 2px;
      height: 60px;
      background-color: #01ffff;
      box-shadow: 0 0 10px #01ffff;
      -webkit-transform: skew(55deg);
      -moz-transform: skew(55deg);
      -o-transform: skew(55deg);
      -ms-transform: skew(55deg);
    }
    &__navbar {
      margin-left: 41px;
      display: inline-flex;
      flex: 1;
      border-bottom: 1px solid;
      height: 60px;
      border-image: linear-gradient(to right, #01ffff, #023838) 30 30;
      &-menu {
        background: transparent;
        color: #01ffff;
        font-size: 36px;
        z-index: 80;
        .h-menu-li > ul > li > div {
          padding-left: 20px;
        }
        .h-menu-show {
          padding-left: 20px;
        }
        .h-menu-li .h-menu-ul {
          font-size: 32px;
        }
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
