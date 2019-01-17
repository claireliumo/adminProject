<template>
  <div class="main-header">
    <div class="main-header__logo">
      <span>永丰BIM平台</span>
    </div>
    <div class="main-header__divider"></div>
    <div class="main-header__navbar">
      <Menu :datas="datas.outline" v-width="200" className="main-header__navbar-menu" @click="handleClick" @select="handleSelectChange"></Menu>
      <Menu :datas="datas.env" v-width="240" className="main-header__navbar-menu" @select="handleSelectChange" @click="handleClick"></Menu>
      <Menu :datas="datas.energy" v-width="240" className="main-header__navbar-menu" @select="handleSelectChange" @click="handleClick"></Menu>
      <Menu :datas="datas.opmonitor" v-width="240" className="main-header__navbar-menu" @select="handleSelectChange" @click="handleClick"></Menu>
      <Menu :datas="datas.semonitor" v-width="240" className="main-header__navbar-menu" @select="handleSelectChange" @click="handleClick"></Menu>
      <Menu :datas="datas.firemonitor" v-width="240" className="main-header__navbar-menu" @select="handleSelectChange" @click="handleClick"></Menu>
      <div class="main-header__tool">
        <i class="el-icon-rank" @click="handleFullScreen"></i>
        <i class="el-icon-setting"></i>
        <el-button type="text" @click="signout">
          <i class="el-icon-error"></i>
        </el-button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "Header",
  data() {
    return {
     fullscreen: false,
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
              detail: [
                {
                  title: '实时数据',
                  key: '2-1-1'
                },
                {
                  title: '历史数据',
                  key: '2-1-2'
                }
              ]
            },
            {
              title: '室外环境',
              key: '2-2',
              detail: [
                {
                  title: '实时数据',
                  key: '2-2-1',
                },
                {
                  title: '历史数据',
                  key: '2-2-2',
                }
              ]
            }
          ]
        }],
        energy: [{
          title: '用能情况',
          key: '3',
          children: [
            {
              title: '用能总览',
              key: '3-1',
              detail: [
                {
                  title: '园区用能总览',
                  key: '3-1-1',
                },
                {
                  title: '建筑用能总览',
                  key: '3-1-2'
                },
                {
                  title: '楼层用能总览',
                  key: '3-1-3'
                }
              ]
            },
            {
              title: '用电情况',
              key: '3-2',
              children: [
                {
                  title: '园区用电',
                  key: '3-2-1',
                  detail:[
                    {
                      title:'园区本日用电',
                      key:'3-2-1-1'
                    },
                    {
                      title:'园区本月用电',
                      key:'3-2-1-2'
                    },
                    {
                      title:'园区本年用电',
                      key:'3-2-1-3'
                    },
                    {
                      title:'各建筑用电占比（本年）',
                      key:'3-2-1-4'
                    }
                  ]
                },
                {
                  title: '建筑用电',
                  key: '3-2-2',
                  detail:[
                    {
                      title:'建筑用电',
                      key:'3-2-2-1'
                    },
                    {
                      title:'楼层用电',
                      key:'3-2-2-2'
                    }
                  ]
                },
                {
                  title: '空调用电',
                  key: '3-2-3',
                  detail:[
                    {
                      title:'本日用电',
                      key:'3-2-3-1'
                    },
                    {
                      title:'本月用电',
                      key:'3-2-3-2'
                    },
                    {
                      title:'本年用电',
                      key:'3-2-3-3'
                    }
                  ]
                },
                {
                  title: '电器用电',
                  key: '3-2-4',
                  detail:[
                    {
                      title:'智能插座用电',
                      key:'3-2-4-1'
                    }
                  ]
                }
              ]
            },
            {
              title: '用水情况',
              key: '3-3',
              children: [
                {
                  title: '生活用水',
                  key: '3-3-1',
                  detail:[
                    {
                      title:'园区用水',
                      key:'3-3-1-1'
                    },
                    {
                      title:'建筑用水',
                      key:'3-3-1-2'
                    },
                    {
                      title:'楼层用水',
                      key:'3-3-1-3'
                    }
                  ]
                },
                {
                  title: '厨房用水',
                  key: '3-3-2',
                  detail:[
                    {
                      title:'本日用水',
                      key:'3-3-2-1'
                    },
                    {
                      title:'本月用水',
                      key:'3-3-2-2'
                    },
                    {
                      title:'本年用水',
                      key:'3-3-2-3'
                    }
                  ]
                },
                {
                  title: '空调用水',
                  key: '3-3-3',
                  detail:[
                    {
                      title:'补水用水',
                      key:'3-3-3-1'
                    }
                  ]
                }
              ]
            },
            {
              title: '用气情况',
              key: '3-4',
              children: [
                {
                  title: '采暖用气',
                  key: '3-4-1',
                  detail:[
                    {
                      title:'本月用气',
                      key:'3-4-1-1'
                    },
                    {
                      title:'本年用气',
                      key:'3-4-1-2'
                    }
                  ]
                },
                {
                  title: '厨房用气',
                  key: '3-4-2',
                  detail:[
                    {
                      title:'本月用气',
                      key:'3-4-2-1'
                    },
                    {
                      title:'本年用气',
                      key:'3-4-2-2'
                    }
                  ]
                }
              ]
            }
          ]
        }],
        opmonitor: [{
          title: '设备监控',
          key: '4',
          children: [
             {
              title: '空调系统',
              key: '4-1',
              detail:[
                {
                  title: '设备信息',
                  key: '4-1-1',
                },
                {
                  title: '运行状态',
                  key: '4-1-2',
                }
              ]
              // children: [
              //   {
              //     title: '风机盘管',
              //     key: '4-1-1',
              //   },
              //   {
              //     title: '热水锅炉',
              //     key: '4-1-2'
              //   },
              //   {
              //     title: '风冷机组',
              //     key: '4-1-3'
              //   },
              //   {
              //     title: '新风机组',
              //     key: '4-1-4'
              //   },
              //   {
              //     title: '空气净化',
              //     key: '4-1-5'
              //   },
              //   {
              //     title: '风机',
              //     key: '4-1-6'
              //   },
              //   {
              //     title: '机房',
              //     key: '4-1-7'
              //   },
              //   {
              //     title: '水泵',
              //     key: '4-1-8'
              //   }
              // ]
            },
            {
              title: '智能设备',
              key: '4-2',
              detail:[
                {
                  title: '设备信息',
                  key: '4-2-1',
                },
                {
                  title: '运行状态',
                  key: '4-2-2',
                }
              ]
              // detail: [
              //   {
              //     title: '智能插座',
              //     key: '4-2-1',
              //   }
              // ]
            },
          ]
        }],
        semonitor: [{
          title: '安防监控',
          key: '5',
          children: [
            {
              title: '安防摄像',
              key: '5-1',
              detail: [
                {
                  title: '设备信息',
                  key: '5-1-1',
                },
                {
                  title: '运行状态',
                  key: '5-1-2',
                }
              ]
            },
            {
              title: '红外报警',
              key: '5-2',
              detail: [
                {
                  title: '设备信息',
                  key: '5-2-1',
                },
                {
                  title: '运行状态',
                  key: '5-2-2',
                }
              ]
            }
          ]
        }],
        firemonitor: [{
          title: '消防监控',
          key: '6',
          children: [
            {
              title: '消防报警',
              key: '6-1',
              detail: [
                {
                  title: '设备信息',
                  key: '6-1-1',
                },
                {
                  title: '运行状态',
                  key: '6-1-2',
                }
              ]
            }
          ]
        }]
      },
      currentActive: null,
      menuChange:'',
    };
  },
  methods: {
    handleSelectChange: function(menu) {
      this.currentActive = menu;
      // this.$Message.info(`选中${menu.title}`);
      this.$emit("change", menu);
    },
    handleClick: function(data) {
      this.menuChange = data;
      console.log(data);
    },
    signout: function() {
      console.log("signout");
      var userAgent = navigator.userAgent;
      if (userAgent.indexOf("Firefox") != -1 || userAgent.indexOf("Chrome") !=-1) {
         window.location.href = "about:blank";
         window.close();
      } else {
        window.opener = null;
        window.open("", "_self");
        window.close();
      }
    },
    //全屏
    handleFullScreen() {
      let element = document.documentElement;
      if (this.fullscreen) {
        if (document.exitFullscreen) {
          document.exitFullscreen();
        } else if (document.webkitCancelFullScreen) {
          document.webkitCancelFullScreen();
        } else if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen();
        } else if (document.msExitFullscreen) {
          document.msExitFullscreen();
        }
      } else {
        if (element.requestFullscreen) {
          element.requestFullscreen();
        } else if (element.webkitRequestFullScreen) {
          element.webkitRequestFullScreen();
        } else if (element.mozRequestFullScreen) {
          element.mozRequestFullScreen();
        } else if (element.msRequestFullscreen) {
          // IE11
          element.msRequestFullscreen();
        }
      }
      this.fullscreen = !this.fullscreen;
    }
  },
  watch:{
    menuChange:{
      handler:function(){
        if(this.menuChange.children.length <= 0){
           $(".h-menu-li").removeClass('h-menu-li-opened')
        }
        if(this.menuChange.key == '1' || this.menuChange.key == '2' || this.menuChange.key == '3' || this.menuChange.key =='4' || this.menuChange.key == '5' || this.menuChange.key == '6'){
           $(".h-menu-li").removeClass('h-menu-li-opened');
        }
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.main-header {
  width: 100%;
  height: 60px;
  line-height: 60px;
  margin: 20px 0px 10px 0px;
  // background-image: url('../../assets/title.png');
  // background-color: #545c64;
  display: flex;
  &__logo {
    width: 400px;
    padding-left: 20px;
    span {
      font-size: 40px;
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
      // background: transparent;
      color: #01ffff;
      font-size: 36px;
      margin-left: -10px;
      z-index: 80;
      // .h-menu-li > ul > li > div {
      //   padding-left: 20px;
      // }
      // li{
      //   font-size: 36px;
      // }
      // .h-menu-show-desc{
      //   font-size: 10px !important;
      // }
      // .h-menu-show .h-menu-show-desc{
      //   padding-left: 20px;
      //   font-size: 10px !important;
      // }
      // .h-menu-li .h-menu-ul {
      //   font-size: 32px;
      // }
    }
  }
  &__tool {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    font-size: 28px;
    margin: auto 20px;
    i {
      width: 40px;
      color: #01ffff;
      font-size: 28px;
    }
  }
}
.el-icon-rank:hover,.el-icon-setting:hover,.el-icon-error:hover{
  color: #e49318 !important;
}
.h-menu-ul{
  background: #002727 !important;
}

</style>
