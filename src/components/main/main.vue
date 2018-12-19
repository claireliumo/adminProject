<template>
  <div class="main">
   <Header @change="handleSelectChange"/>
   <div class="main-content">
     <div class="main-content__utity">
       <div class="main-content__utity-content">
         <!-- <h1>Utity Area</h1> --><!-- /Users/ClaireLiu/WebstormProjects/adminProject/src/assets/webgl/B5WebGLDemo.json -->
         <utity src="../../../static/webgl/B5WebGLDemo.json" width="1256" height="836" utityLoader="../../../static/webgl/UtityLoader.js"></utity>
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
       </div> -->
     </div>
     <div class="main-content__echarts">
       <div class="main-content__echarts-title">
         <div>{{currentActive && currentActive.title}}</div>
         <div class="divider"></div>
        </div>
       <div class="main-content__echarts-content">
         <div class="info" v-if="currentActive.key === '1'">
           <Info v-for="item in currentActive.detail" :key="item.title" :datas="item"></Info>
         </div>
         <div class="outdoorInfo" v-if="currentActive.key=== '2-2-1'">
           <outdoor-info></outdoor-info>
         </div>
         <div class="outdoorInfo" v-if="currentActive.key=== '2-2-2'">
           <outdoor-ave v-for="item in currentActive.detail" 
                :key="item.title"
                :datas="item" :options="outdoorAveOp[item.key]"></outdoor-ave>
         </div>
         <div class="outdoorInfo" v-if="currentActive.key=== '2-2-3'">
           <outdoor-ave v-for="item in currentActive.detail" 
                :key="item.title"
                :datas="item" :options="outdoorMonAveOp[item.key]"></outdoor-ave>
         </div>
         <div class="outdoorInfo" v-if="currentActive.key=== '2-2-4'">
           <outdoor-ave v-for="item in currentActive.detail" 
                :key="item.title"
                :datas="item" :options="outdoorYearAveOp[item.key]"></outdoor-ave>
         </div>
         <div class="indoorInfo" v-if="currentActive.key.substring(0,3)=== '2-1'">
           <indoor-real :datas="currentActive.detail[0]"></indoor-real>
           <indoor-his :datas="currentActive.detail[1]"></indoor-his>
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
import Utity from 'vue-unity-webgl'
export default{
  name: 'Main',
  data () {
    return {
      buildingInfo: {
        building: '建筑1',
        floor: '楼层1',
        room: '房间104',
        airConditioner: '空调2'
      },
      status: [
        {
          text: '通风',
          acitve: 'false'
        },
        {
          text: '采暖',
          acitve: false
        },
        {
          text: '照明',
          acitve: false
        },
        {
          text: '电梯',
          acitve: false
        },
        {
          text: '插座',
          acitve: false
        },
        {
          text: '厨房',
          acitve: false
        },
        {
          text: '安防',
          acitve: false
        },
        {
          text: '消防',
          acitve: false
        }
      ],
      currentActive: {
        title: '项目概况',
        key: '1'
      },
      outdoorAveOp: {
        '2-2-2-1': {
          title: {
              text: '整点天气实况',
              textStyle: {
                  color: '#01ffff',
                  fontSize: '20'
              },
              left: 20,
              top: 10
          },
          xAxis: {
              type: 'category',
              boundaryGap: false,
              data: ['1','2','3','4','5','6','7','8','9','10','11','12','13','14','15','16','17','18','19','20','21','22','23','0'],
              axisLine: {
                  lineStyle: {
                      color: '#01ffff'
                  }
              }
          },
          yAxis: {
              type: 'value',
              axisLabel: {
                  formatter: '{value} °C'
              },
              axisLine: {
                  lineStyle: {
                      color: '#01ffff'
                  }
              }
          },
          series: [
              {
                  name:'温度',
                  type:'line',
                  data:[11, 11, 15, 13, 12, 13, 10, 11, 11, 15, 13, 12, 13, 10,11, 11, 15, 13, 12, 13, 10,7,6,7],
                  markPoint: {
                      data: [
                          {type: 'max', name: '最高温度'},
                          {type: 'min', name: '最低温度'}
                      ]
                  }
              }
          ]
        },
        '2-2-2-2': {
          title: {
              text: '整点湿度实况',
              textStyle: {
                  color: '#01ffff',
                  fontSize: '20'
              },
              left: 20,
              top: 10
          },
          xAxis: {
              type: 'category',
              boundaryGap: false,
              data: ['1','2','3','4','5','6','7','8','9','10','11','12','13','14','15','16','17','18','19','20','21','22','23','0'],
              axisLine: {
                  lineStyle: {
                      color: '#01ffff'
                  }
              }
          },
          yAxis: {
              type: 'value',
              axisLabel: {
                  formatter: '{value} %'
              },
              axisLine: {
                  lineStyle: {
                      color: '#01ffff'
                  }
              }
          },
          series: [
              {
                  name:'湿度',
                  type:'line',
                  data:[11, 11, 15, 13, 12, 13, 10, 11, 11, 15, 13, 12, 13, 10,11, 11, 15, 13, 12, 13, 10,7,6,7],
                  markPoint: {
                      data: [
                          {type: 'max', name: '最高湿度'},
                          {type: 'min', name: '最低温度'}
                      ]
                  }
              }
          ]
        },
        '2-2-2-3':{
          title: {
              text: '整点风速实况',
              textStyle: {
                  color: '#01ffff',
                  fontSize: '20'
              },
              left: 20,
              top: 10
          },
          xAxis: {
              type: 'category',
              boundaryGap: false,
              data: ['1','2','3','4','5','6','7','8','9','10','11','12','13','14','15','16','17','18','19','20','21','22','23','0'],
              axisLine: {
                  lineStyle: {
                      color: '#01ffff'
                  }
              }
          },
          yAxis: {
              type: 'value',
              axisLabel: {
                  formatter: '{value} m/s'
              },
              axisLine: {
                  lineStyle: {
                      color: '#01ffff'
                  }
              }
          },
          series: [
              {
                  name:'风速',
                  type:'line',
                  data:[11, 11, 15, 13, 12, 13, 10, 11, 11, 15, 13, 12, 13, 10,11, 11, 15, 13, 12, 13, 10,7,6,7],
                  markPoint: {
                      data: [
                          {type: 'max', name: '最大风速'},
                          {type: 'min', name: '最小风速'}
                      ]
                  }
              }
          ]
        },
        '2-2-2-4':{
          title: {
              text: '整点PM2.5实况',
              textStyle: {
                  color: '#01ffff',
                  fontSize: '20'
              },
              left: 20,
              top: 10
          },
          xAxis: {
              type: 'category',
              boundaryGap: true,
              data: ['1','2','3','4','5','6','7','8','9','10','11','12','13','14','15','16','17','18','19','20','21','22','23','0'],
              axisLine: {
                  lineStyle: {
                      color: '#01ffff'
                  }
              }
          },
          yAxis: {
              type: 'value',
              axisLabel: {
                  formatter: '{value} '
              },
              axisLine: {
                  lineStyle: {
                      color: '#01ffff'
                  }
              }
          },
          series: [
              {
                  name:'PM2.5',
                  type:'bar',
                  data:[11, 11, 15, 13, 12, 13, 10, 11, 11, 15, 13, 12, 13, 10,11, 11, 15, 13, 12, 13, 10,7,6,7],
                  markPoint: {
                      data: [
                          {type: 'max', name: '最高PM2.5'},
                          {type: 'min', name: '最低PM2.5'}
                      ]
                  }
              }
          ]
        }
      },
      outdoorMonAveOp: {
        '2-2-3-1': {
          title: {
              text: '每日天气实况',
              textStyle: {
                  color: '#01ffff',
                  fontSize: '20'
              },
              left: 20,
              top: 10
          },
          xAxis: {
              type: 'category',
              boundaryGap: false,
              data: ['1','2','3','4','5','6','7','8','9','10','11','12','13','14','15','16','17','18','19','20','21','22','23','24','25', '26', '27','28','29','30'],
              axisLine: {
                  lineStyle: {
                      color: '#01ffff'
                  }
              }
          },
          yAxis: {
              type: 'value',
              axisLabel: {
                  formatter: '{value} °C'
              },
              axisLine: {
                  lineStyle: {
                      color: '#01ffff'
                  }
              }
          },
          series: [
              {
                  name:'温度',
                  type:'line',
                  data:[11, 11, 15, 13, 12, 13, 10, 11, 11, 15, 13, 12, 13, 10,11, 11, 15, 13, 12, 13, 10,7,6,7,11, 11, 15, 13, 12, 13],
                  markPoint: {
                      data: [
                          {type: 'max', name: '最高温度'},
                          {type: 'min', name: '最低温度'}
                      ]
                  }
              }
          ]
        },
        '2-2-3-2': {
          title: {
              text: '每日湿度实况',
              textStyle: {
                  color: '#01ffff',
                  fontSize: '20'
              },
              left: 20,
              top: 10
          },
          xAxis: {
              type: 'category',
              boundaryGap: false,
              data: ['1','2','3','4','5','6','7','8','9','10','11','12','13','14','15','16','17','18','19','20','21','22','23','24','25', '26', '27','28','29','30'],
              axisLine: {
                  lineStyle: {
                      color: '#01ffff'
                  }
              }
          },
          yAxis: {
              type: 'value',
              axisLabel: {
                  formatter: '{value} %'
              },
              axisLine: {
                  lineStyle: {
                      color: '#01ffff'
                  }
              }
          },
          series: [
              {
                  name:'湿度',
                  type:'line',
                  data:[11, 11, 15, 13, 12, 13, 10, 11, 11, 15, 13, 12, 13, 10,11, 11, 15, 13, 12, 13, 10,7,6,7, 11, 11, 15, 13, 12, 13,],
                  markPoint: {
                      data: [
                          {type: 'max', name: '最高湿度'},
                          {type: 'min', name: '最低温度'}
                      ]
                  }
              }
          ]
        },
        '2-2-3-3':{
          title: {
              text: '每日风速实况',
              textStyle: {
                  color: '#01ffff',
                  fontSize: '20'
              },
              left: 20,
              top: 10
          },
          xAxis: {
              type: 'category',
              boundaryGap: false,
              data: ['1','2','3','4','5','6','7','8','9','10','11','12','13','14','15','16','17','18','19','20','21','22','23','24','25', '26', '27','28','29','30'],
              axisLine: {
                  lineStyle: {
                      color: '#01ffff'
                  }
              }
          },
          yAxis: {
              type: 'value',
              axisLabel: {
                  formatter: '{value} m/s'
              },
              axisLine: {
                  lineStyle: {
                      color: '#01ffff'
                  }
              }
          },
          series: [
              {
                  name:'风速',
                  type:'line',
                  data:[11, 11, 15, 13, 12, 13, 10, 11, 11, 15, 13, 12, 13, 10,11, 11, 15, 13, 12, 13, 10,7,6,7, 11, 11, 15, 13, 12, 13],
                  markPoint: {
                      data: [
                          {type: 'max', name: '最大风速'},
                          {type: 'min', name: '最小风速'}
                      ]
                  }
              }
          ]
        },
        '2-2-3-4':{
          title: {
              text: '每日PM2.5实况',
              textStyle: {
                  color: '#01ffff',
                  fontSize: '20'
              },
              left: 20,
              top: 10
          },
          xAxis: {
              type: 'category',
              boundaryGap: true,
              data: ['1','2','3','4','5','6','7','8','9','10','11','12','13','14','15','16','17','18','19','20','21','22','23','24','25', '26', '27','28','29','30'],
              axisLine: {
                  lineStyle: {
                      color: '#01ffff'
                  }
              }
          },
          yAxis: {
              type: 'value',
              axisLabel: {
                  formatter: '{value} '
              },
              axisLine: {
                  lineStyle: {
                      color: '#01ffff'
                  }
              }
          },
          series: [
              {
                  name:'PM2.5',
                  type:'bar',
                  data:[11, 11, 15, 13, 12, 13, 10, 11, 11, 15, 13, 12, 13, 10,11, 11, 15, 13, 12, 13, 10,7,6,7,11, 11, 15, 13, 12, 13],
                  markPoint: {
                      data: [
                          {type: 'max', name: '最高PM2.5'},
                          {type: 'min', name: '最低PM2.5'}
                      ]
                  }
              }
          ]
        }
      },
      outdoorYearAveOp: {
        '2-2-4-1': {
          title: {
              text: '月均天气',
              textStyle: {
                  color: '#01ffff',
                  fontSize: '20'
              },
              left: 20,
              top: 10
          },
          xAxis: {
              type: 'category',
              boundaryGap: false,
              data: ['1','2','3','4','5','6','7','8','9','10','11','12'],
              axisLine: {
                  lineStyle: {
                      color: '#01ffff'
                  }
              }
          },
          yAxis: {
              type: 'value',
              axisLabel: {
                  formatter: '{value} °C'
              },
              axisLine: {
                  lineStyle: {
                      color: '#01ffff'
                  }
              }
          },
          series: [
              {
                  name:'温度',
                  type:'line',
                  data:[11, 11, 15, 13, 12, 13, 10, 11, 11, 15, 13, 12],
                  markPoint: {
                      data: [
                          {type: 'max', name: '最高温度'},
                          {type: 'min', name: '最低温度'}
                      ]
                  }
              }
          ]
        },
        '2-2-4-2': {
          title: {
              text: '月均湿度',
              textStyle: {
                  color: '#01ffff',
                  fontSize: '20'
              },
              left: 20,
              top: 10
          },
          xAxis: {
              type: 'category',
              boundaryGap: false,
              data: ['1','2','3','4','5','6','7','8','9','10','11','12'],
              axisLine: {
                  lineStyle: {
                      color: '#01ffff'
                  }
              }
          },
          yAxis: {
              type: 'value',
              axisLabel: {
                  formatter: '{value} %'
              },
              axisLine: {
                  lineStyle: {
                      color: '#01ffff'
                  }
              }
          },
          series: [
              {
                  name:'湿度',
                  type:'line',
                  data:[11, 11, 15, 13, 12, 13, 10, 11, 11, 15, 13, 12],
                  markPoint: {
                      data: [
                          {type: 'max', name: '最高湿度'},
                          {type: 'min', name: '最低温度'}
                      ]
                  }
              }
          ]
        },
        '2-2-4-3':{
          title: {
              text: '月均风速',
              textStyle: {
                  color: '#01ffff',
                  fontSize: '20'
              },
              left: 20,
              top: 10
          },
          xAxis: {
              type: 'category',
              boundaryGap: false,
              data: ['1','2','3','4','5','6','7','8','9','10','11','12'],
              axisLine: {
                  lineStyle: {
                      color: '#01ffff'
                  }
              }
          },
          yAxis: {
              type: 'value',
              axisLabel: {
                  formatter: '{value} m/s'
              },
              axisLine: {
                  lineStyle: {
                      color: '#01ffff'
                  }
              }
          },
          series: [
              {
                  name:'风速',
                  type:'line',
                  data:[11, 11, 15, 13, 12, 13, 10, 11, 11, 15, 13, 12],
                  markPoint: {
                      data: [
                          {type: 'max', name: '最大风速'},
                          {type: 'min', name: '最小风速'}
                      ]
                  }
              }
          ]
        },
        '2-2-4-4':{
          title: {
              text: '月均PM2.5',
              textStyle: {
                  color: '#01ffff',
                  fontSize: '20'
              },
              left: 20,
              top: 10
          },
          xAxis: {
              type: 'category',
              boundaryGap: true,
              data: ['1','2','3','4','5','6','7','8','9','10','11','12'],
              axisLine: {
                  lineStyle: {
                      color: '#01ffff'
                  }
              }
          },
          yAxis: {
              type: 'value',
              axisLabel: {
                  formatter: '{value} '
              },
              axisLine: {
                  lineStyle: {
                      color: '#01ffff'
                  }
              }
          },
          series: [
              {
                  name:'PM2.5',
                  type:'bar',
                  data:[13, 10,11, 11, 15, 13, 12, 13, 10,7,6,7],
                  markPoint: {
                      data: [
                          {type: 'max', name: '最高PM2.5'},
                          {type: 'min', name: '最低PM2.5'}
                      ]
                  }
              }
          ]
        }
      }
    }
  },
  methods: {
    handleSelectChange: function (menu) {
      console.log('mainChange')
      this.currentActive = menu;
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
            data:['邮件营销','联盟广告','视频广告','直接访问','搜索引擎'],
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
            data: ['周一','周二','周三','周四','周五','周六','周日'],
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
        series : [
        {
            name:'直接访问',
            type:'bar',
            data:[320, 332, 301, 334, 390, 330, 320]
        },
        {
            name:'邮件营销',
            type:'bar',
            stack: '广告',
            data:[120, 132, 101, 134, 90, 230, 210]
        },
        {
            name:'联盟广告',
            type:'bar',
            stack: '广告',
            data:[220, 182, 191, 234, 290, 330, 310]
        },
        {
            name:'视频广告',
            type:'bar',
            stack: '广告',
            data:[150, 232, 201, 154, 190, 330, 410]
        },
        {
            name:'搜索引擎',
            type:'bar',
            data:[862, 1018, 964, 1026, 1679, 1600, 1570],
            markLine : {
                lineStyle: {
                    normal: {
                        type: 'dashed'
                    }
                },
                data : [
                    [{type : 'min'}, {type : 'max'}]
                ]
            }
        },
        {
            name:'百度',
            type:'bar',
            barWidth : 5,
            stack: '搜索引擎',
            data:[620, 732, 701, 734, 1090, 1130, 1120]
        },
        {
            name:'谷歌',
            type:'bar',
            stack: '搜索引擎',
            data:[120, 132, 101, 134, 290, 230, 220]
        },
        {
            name:'必应',
            type:'bar',
            stack: '搜索引擎',
            data:[60, 72, 71, 74, 190, 130, 110]
        },
        {
            name:'其他',
            type:'bar',
            stack: '搜索引擎',
            data:[62, 82, 91, 84, 109, 110, 120]
        }
    ]
      }
      barChart.setOption(barChartOption)
    }
  },
  components: {
    Header,
    Info,
    OutdoorInfo,
    OutdoorAve,
    IndoorReal,
    IndoorHis,
    Utity
  }
}
</script>
<style lang="scss">
  .main{
    background: linear-gradient(#023838, #011f1f);
    width: 1920px;
    height: 1080px;
    overflow: auto;
    &-content {
      display: flex;
      margin-top: 20px;
      
      &__utity {

        width: 1260px;
        height: 100%;
        display: flex;
        flex-direction: column;
        &-content {
          width: 100%;
          height: 940px;
          border: 2px solid #01ffff;
          color: #fff;
          background-image: url('../../assets/utityDemo.jpg');
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
</style>
