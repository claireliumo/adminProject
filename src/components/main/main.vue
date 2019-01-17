<template>
  <div class="main">
    <Header @change="handleSelectChange"/>
    <div class="main-content">
      <div class="main-content__utity">
        <div class="main-content__utity-content">
          <!-- <h1>Utity Area</h1> -->
          <!-- /Users/ClaireLiu/WebstormProjects/adminProject/src/assets/webgl/B5WebGLDemo.json -->
          <utity
            src="../../../static/webgl/1812273.json"
            width="100%"
            height="836px"
            utityLoader="../../../static/webgl/UtityLoader.js"
          ></utity>
        </div>
        <!-- <div class="main-content__utity-footer">
         <div class="title">{{buildingInfo.building + '-' + buildingInfo.floor + '-' + buildingInfo.room + '-' + buildingInfo.airConditioner}}</div>
         <div class="content">
           <a class="status" v-for="(item, index) in status"
              :key="index"
              :class="{'active': item.active}"
              @click="statusChange(item, index)">
              {{item.text}}
            </a>
         </div>
        </div>-->
      </div>
      <div class="main-content__echarts">
        <div class="main-content__echarts-title">
          <div>{{currentActive && currentActive.title}}</div>
          <div class="divider"></div>
        </div>
        <div class="main-content__echarts-content">
          <div class="info" v-if="currentActive.key === '1'">
            <Info v-for="item in currentActive.detail" :key="item.key" :datas="item"></Info>
          </div>
          <div class="indoorInfo" v-if="currentActive.key=== '2-1'">
            <indoor-real :datas="currentActive.detail[0]"></indoor-real>
            <indoor-his :datas="currentActive.detail[1]"></indoor-his>
          </div>
          <div class="indoorInfo" v-if="currentActive.key=== '2-2'">
            <outdoor-info :datas="currentActive.detail[0]"></outdoor-info>
            <outdoor-ave :datas="currentActive.detail[1]"></outdoor-ave>
          </div>
          <div class="energy" v-if="currentActive.key=== '3-1'">
            <area-electricity :datas="currentActive.detail[0]"></area-electricity>
            <build-electricity :datas="currentActive.detail[1]"></build-electricity>
            <floor-electricity :datas="currentActive.detail[2]"></floor-electricity>
          </div>
          <div class="energy" v-if="currentActive.key=== '3-2-1'">
            <elec-area :datas="currentActive.datail"></elec-area>
          </div>
          <div class="energy" v-if="currentActive.key=== '3-2-2'">
            <elec-build :datas="currentActive.detail[0]"></elec-build>
            <elec-floor :datas="currentActive.detail[1]"></elec-floor>
          </div>
          <div class="energy" v-if="currentActive.key=== '3-2-3'">
            <elec-air :datas="currentActive.detail"></elec-air>
          </div>
          <div class="energy" v-if="currentActive.key=== '3-2-4'">
            <elec-equi :datas="currentActive.detail[0]"></elec-equi>
          </div>
          <div class="energy" v-if="currentActive.key=== '3-3-1'">
            <water-area :datas="currentActive.detail[0]"></water-area>
            <water-build :datas="currentActive.detail[1]"></water-build>
            <water-floor :datas="currentActive.detail[2]"></water-floor>
            <!-- <water-life :datas="currentActive.detail"></water-life> -->
          </div>
          <div class="energy" v-if="currentActive.key=== '3-3-2'">
            <water-kit :datas="currentActive.detail"></water-kit>
          </div>
          <div class="energy" v-if="currentActive.key=== '3-3-3'">
            <water-air :datas="currentActive.detail[0]"></water-air>
          </div>
          <div class="energy" v-if="currentActive.key=== '3-4-1'">
            <gas-warm :datas="currentActive.detail"></gas-warm>
          </div>
          <div class="energy" v-if="currentActive.key=== '3-4-2'">
            <gas-kit :datas="currentActive.detail"></gas-kit>
          </div>
          <div class="state" v-if="currentActive.key=== '4-1'">
            <air-state-info :datas="currentActive.detail[0]"></air-state-info>
            <air-state-state :datas="currentActive.detail[1]"></air-state-state>
            <!-- <state-coil :datas="currentActive.detail[0]"></state-coil>
            <state-boiler :datas="currentActive.detail[1]"></state-boiler>
            <state-aircool :datas="currentActive.detail[2]"></state-aircool>
            <state-freshair :datas="currentActive.detail[3]"></state-freshair>
            <state-airpur :datas="currentActive.detail[4]"></state-airpur>
            <state-fan :datas="currentActive.detail[5]"></state-fan>
            <state-aircon :datas="currentActive.detail[6]"></state-aircon>
            <state-pump :datas="currentActive.detail[7]"></state-pump> -->
          </div>
          <div class="state" v-if="currentActive.key=== '4-2'">
            <elec-info :datas="currentActive.detail[0]"></elec-info>
            <elec-state :datas="currentActive.detail[1]"></elec-state>
          </div>
          <div class="security" v-if="currentActive.key=== '5-1'">
            <sec-info :datas="currentActive.detail[0]"></sec-info>
            <sec-state :datas="currentActive.detail[1]"></sec-state>
          </div>
          <div class="security" v-if="currentActive.key=== '5-2'">
            <red-info :datas="currentActive.detail[0]"></red-info>
            <red-state :datas="currentActive.detail[1]"></red-state>
          </div>
          <div class="fire" v-if="currentActive.key=== '6-1'">
            <fire-info :datas="currentActive.detail[0]"></fire-info>
            <fire-state :datas="currentActive.detail[1]"></fire-state>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Header from './header.vue'
import Info from './info.vue'
import OutdoorInfo from './outdoorInfo'
import OutdoorAve from './outdoorAve'
import IndoorReal from './indoorReal'
import IndoorHis from './indoorHis'
import areaElectricity from './areaElectricity'
import buildElectricity from './buildElectricity'
import floorElectricity from './floorElectricity'
import elecArea from './elec_area'
import elecAir from './elec_air'
import elecBuild from './elec_build'
import elecFloor from './elec_floor'
import elecEqui from './elec_equi'
import waterAir from './water_air'
import waterKit from './water_kit'
import waterLife from './water_life'
import waterArea from './water_area'
import waterBuild from './water_build'
import waterFloor from './water_floor'
import gasWarm from './gas_warm'
import gasKit from './gas_kit'
import stateCoil from './state_coil'
import stateBoiler from './state_boiler'
import stateAircool from './state_aircool'
import stateFreshair from './state_freshair'
import stateAirpur from './state_airpur'
import stateFan from './state_fan'
import stateAircon from './state_aircon'
import statePump from './state_pump'
import stateSocket from './state_socket'
import secInfo from './sec_info'
import secState from './sec_state'
import fireInfo from './fire_info'
import fireState from './fire_state'

import airStateInfo from './airStateInfo'
import airStateState from './airStateState'
import elecInfo from './elecInfo'
import elecState from './elecState'
import redInfo from './redInfo'
import redState from './redState'

import Utity from 'vue-unity-webgl'
export default {
  name: 'Main',
  data() {
    return {
      arge: '',
      // buildingInfo: {
      //   building: '建筑1',
      //   floor: '楼层1',
      //   room: '房间104',
      //   airConditioner: '空调2'
      // },
      // status: [
      //   {
      //     text: '通风',
      //     acitve: 'false'
      //   },
      //   {
      //     text: '采暖',
      //     acitve: false
      //   },
      //   {
      //     text: '照明',
      //     acitve: false
      //   },
      //   {
      //     text: '电梯',
      //     acitve: false
      //   },
      //   {
      //     text: '插座',
      //     acitve: false
      //   },
      //   {
      //     text: '厨房',
      //     acitve: false
      //   },
      //   {
      //     text: '安防',
      //     acitve: false
      //   },
      //   {
      //     text: '消防',
      //     acitve: false
      //   }
      // ],
      currentActive: {
        title: '项目概况',
        key: '1'
      },
    }
  },
  methods: {
    handleSelectChange: function (menu) {
      console.log(menu)
      this.currentActive = menu;
      if (menu.title == '室内环境') {
        sessionStorage.clear();
      }
    },
    statusChange: function (item, index) {
      this.$set(this.status, index, {
        text: item.text,
        active: !item.status
      })
    },
    drawBar(id) {
      let barChart = this.$echarts.init(document.getElementById(id))

      let barChartOption = {
        backgroundColor: '#011f1f',
        title: {
          text: '柱状',
          textStyle: {
            color: '#01ffff',
            fontSize: '20'
          },
          left: 20,
          top: 10
        },
        color: [
          "#2ec7c9",
          "#b6a2de",
          "#5ab1ef",
          "#ffb980",
          "#d87a80",
          "#8d98b3",
          "#e5cf0d",
          "#97b552",
          "#95706d",
          "#dc69aa",
          "#07a2a4",
          "#9a7fd1",
          "#588dd5",
          "#f5994e",
          "#c05050",
          "#59678c",
          "#c9ab00",
          "#7eb00a",
          "#6f5553",
          "#c14089"
        ],
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: ['邮件营销', '联盟广告', '视频广告', '直接访问', '搜索引擎'],
          orient: 'horizontal',
          textStyle: {
            color: '#01ffff',
            fontSize: '12'
          },
          left: 'right',
          top: 10
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        toolbox: {
          show: false
        },
        xAxis: {
          type: 'category',
          // boundaryGap: false,
          data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
          axisLine: {
            lineStyle: {
              color: '#01ffff'
            }
          }
        },
        yAxis: {
          type: 'value',
          axisLine: {
            lineStyle: {
              color: '#01ffff'
            }
          }
        },
        series: [
          {
            name: '直接访问',
            type: 'bar',
            data: [320, 332, 301, 334, 390, 330, 320]
          },
          {
            name: '邮件营销',
            type: 'bar',
            stack: '广告',
            data: [120, 132, 101, 134, 90, 230, 210]
          },
          {
            name: '联盟广告',
            type: 'bar',
            stack: '广告',
            data: [220, 182, 191, 234, 290, 330, 310]
          },
          {
            name: '视频广告',
            type: 'bar',
            stack: '广告',
            data: [150, 232, 201, 154, 190, 330, 410]
          },
          {
            name: '搜索引擎',
            type: 'bar',
            data: [862, 1018, 964, 1026, 1679, 1600, 1570],
            markLine: {
              lineStyle: {
                normal: {
                  type: 'dashed'
                }
              },
              data: [
                [{ type: 'min' }, { type: 'max' }]
              ]
            }
          },
          {
            name: '百度',
            type: 'bar',
            barWidth: 5,
            stack: '搜索引擎',
            data: [620, 732, 701, 734, 1090, 1130, 1120]
          },
          {
            name: '谷歌',
            type: 'bar',
            stack: '搜索引擎',
            data: [120, 132, 101, 134, 290, 230, 220]
          },
          {
            name: '必应',
            type: 'bar',
            stack: '搜索引擎',
            data: [60, 72, 71, 74, 190, 130, 110]
          },
          {
            name: '其他',
            type: 'bar',
            stack: '搜索引擎',
            data: [62, 82, 91, 84, 109, 110, 120]
          }
        ]
      }
      barChart.setOption(barChartOption)
    }
  },
  mounted() {
    var self = this;
    var aa = setInterval(function () {
      self.arge = sessionStorage.getItem("arge");
    }, 500);
  },
  components: {
    Header,
    Info,
    OutdoorInfo,
    OutdoorAve,
    IndoorReal,
    IndoorHis,
    Utity,
    areaElectricity,
    buildElectricity,
    floorElectricity,
    elecArea,
    elecAir,
    elecBuild,
    elecFloor,
    elecEqui,
    waterAir,
    waterKit,
    waterLife,
    waterArea,
    waterBuild,
    waterFloor,
    gasWarm,
    gasKit,
    stateBoiler,
    stateCoil,
    stateAircool,
    stateFreshair,
    stateAirpur,
    stateFan,
    stateAircon,
    statePump,
    stateSocket,
    secInfo,
    secState,
    fireInfo,
    fireState,
    //新加的
    airStateInfo,
    airStateState,
    elecInfo,
    elecState,
    redInfo,
    redState
  }
}
</script>
<style lang="scss">
  .main{
    background: linear-gradient(#023838, #011f1f);
    width: 100%;
    height: 100%;
    overflow: auto;
    &-content {
      display: flex;
      margin-top: 20px;
      height: 90%;
      &__utity {

        width: 70%;
        // height: 100%;
        display: flex;
        flex-direction: column;
        &-content {
          width: 100%;
          height: 100%;
          border: 2px solid #01ffff;
          color: #fff;
        //   background-image: url('../../assets/utityDemo.jpg');
          background-size: 100%;
          background-repeat: no-repeat;
        }
        &-footer {
          margin-top: 20px;
          width: 100%;
          height: 100px;
          // border: 2px solid #01ffff;
          display: flex;
          .title {
            // width: 30%;
            height: 35px;
            line-height: 35px;
            margin: 32px 0 32px 15px;
            padding-right: 15px;
            color: #01ffff;
            font-size: 32px;
            border-right: 3px solid #01ffff;
          }
          .content {
            display: flex;
            align-items: center;
            .status {
              width: 60px;
              height: 35px;
              line-height: 35px;
              border-radius: 25px;
              border: 2px solid #01ffff;
              color: #01ffff;
              font-size: 18px;
              background: transparent;
              margin-left: 20px;
              cursor: pointer;
              &.active {
                 background-color: #01ffff;
                 color: #011f1f;
              }
              &:hover {
                background-color: #01ffff;
                color: #011f1f;
              }
            }
          }
        }
      }
      &__echarts {
        flex: 1;
        display: flex;
        flex-direction: column;
        margin: 0 20px;
        
        // border: 1px solid #01ffff;
        color: #01ffff;
        &-title{
          height: 50px;
          display: flex;
          div {
            width: 200px;
            border-top: 2px solid #01ffff;
            border-left: 2px solid #01ffff;
            font-size: 28px;
            line-height: 50px;
          }
          .divider {
            width: 3px;
            margin-left: 32px;
            height: 50px;
            background-color: #01ffff;
            box-shadow: 0 0 10px #01ffff;
            -webkit-transform: skew(55deg);
            -moz-transform: skew(55deg);
            -o-transform: skew(55deg);
            -ms-transform: skew(55deg);
          }
        }
        &-content{
          flex: 1;
          border: 2px solid transparent;
          border-image: linear-gradient(to right bottom, #01ffff, #023838) 30 30;
          padding: 30px 10px;
          height: 800px;
          overflow: auto;
          .title{
            color: #01ffff;
            font-size: 24px;
            text-align: left;
          }
          .chart {
            width: 95%;
            margin: auto;
            // border: 1px solid;
            .chart-container {
              width: 100%;
              height: 300px;
              margin-top: 30px;
            }
            /* #chart1 {
              width: 100%;
              height: 300px;
              margin-top: 30px;
            } */
          }
        }
      }
    }
  }
#unity-container{
    background:#002120 !important;
    height: 100%;
}
.webgl-content{
  height: 100%;
}
.energy{
  height: 100%;
}
.h-select-input-border .h-select-show {
  background-color: black !important;
  width: 50%;
  margin-left:15px;
  margin-bottom: 10px;
  border: 1px solid #00ffff;
}
.h-menu-ul{
  background: #002727 !important;
}
.fullscreen{
  display: none;
}
</style>
