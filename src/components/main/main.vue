<template>
  <div class="main">
   <Header @change="handleSelectChange"/>
   <div class="main-content">
     <div class="main-content__utity">
       <div class="main-content__utity-content">
         <h1>Utity Area</h1>
       </div>
       <div class="main-content__utity-footer">
         <div class="title">{{buildingInfo.building + '-' + buildingInfo.floor + '-' + buildingInfo.room + '-' + buildingInfo.airConditioner}}</div>
         <div class="content">
           <a class="status" v-for="(item, index) in status"
              :key="index"
              :class="{'active': item.active}"
              @click="statusChange(item, index)">
              {{item.text}}
            </a>
         </div>
       </div>
     </div>
     <div class="main-content__echarts">
       <div class="main-content__echarts-title">
         <div>{{currentActive && currentActive.title}}</div>
         <div class="divider"></div>
        </div>
       <div class="main-content__echarts-content">
         <div class="main-content__echarts-park">
           <div class="title" @click="expandClick('park')">
             <i class="el-icon-plus" v-if="!parkExpand"></i>
             <i class="el-icon-minus" v-else></i>
             <span>{{'园区总' + currentActive.title.substring(0,2)}}</span>
           </div>
           <div class="chart" v-show="parkExpand">
             <div id="chart3" class="chart-container"></div>
             <div id="chart4" class="chart-container"></div>
           </div>
         </div>
         <div class="main-content__echarts-building">
           <div class="title" @click="expandClick('build')">
             <i class="el-icon-plus" v-if="!buildExpand"></i>
             <i class="el-icon-minus" v-else></i>
             <span>{{'建筑总' + currentActive.title.substring(0,2)}}</span>
           </div>
           <div class="chart" v-show="buildExpand">
             <div id="chart1" class="chart-container"></div>
             <div id="chart2" class="chart-container"></div>
           </div>
         </div>
       </div>
     </div>
   </div>
  </div>
</template>
<script>
import Header from './header.vue'
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
        title: '用水情况',
        key: '2-3-4'
      },
      parkExpand: false,
      buildExpand: true
    }
  },
  mounted(){
    
    setTimeout(()=>{
      if(this.buildExpand) {
      this.drawLine('chart1')
      this.drawBar('chart2')
    }
    }, 300)
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
    expandClick(type){
      this.parkExpand = !this.parkExpand;
      this.buildExpand = !this.buildExpand;
      setTimeout(()=>{
        if(this.buildExpand){
          this.drawLine('chart1')
          this.drawBar('chart2')
        }
        else {
          this.drawLine('chart3')
          this.drawBar('chart4')
        }
      }, 300)
      
     
    },
    drawLine(id) {
      let lineChart = this.$echarts.init(document.getElementById(id))

      let lineChartOption = {
        backgroundColor: '#011f1f',
        title: {
          text: '折线图',
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
            boundaryGap: false,
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
        series: [
            {
                name:'邮件营销',
                type:'line',
                stack: '总量',
                data:[120, 132, 101, 134, 90, 230, 210]
            },
            {
            name:'联盟广告',
            type:'line',
            stack: '总量',
            data:[220, 182, 191, 234, 290, 330, 310]
        },
        {
            name:'视频广告',
            type:'line',
            stack: '总量',
            data:[150, 232, 201, 154, 190, 330, 410]
        },
        {
            name:'直接访问',
            type:'line',
            stack: '总量',
            data:[320, 332, 301, 334, 390, 330, 320]
        }
        ]
      }
      lineChart.setOption(lineChartOption)
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
    Header
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
          height: 840px;
          border: 2px solid #01ffff;
          color: #fff;
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
