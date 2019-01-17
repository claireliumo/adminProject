<template>
  <div class="indoorhis" id="waterBuild">
    <div class="indoorhis-title" @click="expandTable">
      <i class="el-icon-plus" v-if="!isExpand"></i>
      <i class="el-icon-minus" v-else></i>
      {{datas.title}}
    </div>
    <div class="indoorhis-content charts" v-show="isExpand">
      <!-- <div class=""> -->
      <charts
        v-for="(item,key) in waterBuild"
        :containerId="'charts' + key"
        :key="key"
        :customOption="item"
      ></charts>
      <!-- </div> -->
    </div>
  </div>
</template>
<script>
import charts from './charts'
export default {
  name: 'buildWater',
  props: {
    datas: Object
  },
  data() {
    return {
      change: true,
      isExpand: true,
      arge: '',
      xDaydata: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '0'],
      xMonthdata:['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30'],
      xYeardata: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
      buildDayData: [351.39, 342.43, 342, 344, 356, 325, 367, 345, 342, 342, 365, 359, 360, 358, 317, 325, 324, 345, 330, 344, 322, 333, 367, 321],
      buildMonthData:[10561, 10928, 10120, 10161, 10591, 10488, 9679, 10632, 10611, 10092, 10444, 10821, 10386, 10354, 9554, 10391, 10771, 9879, 9727, 9800, 10527, 10513, 10938, 10736, 10272, 10513, 10794, 10017, 10001, 10268],
      buildYearData: [136500, 126500, 85500, 75401, 65901, 54401, 79023, 99023, 96500, 116500, 126500, 100000],
      floorData: [{ value: 345, name: '楼层1' }, { value: 275, name: '楼层2' }, { value: 315, name: '楼层3' }, { value: 285, name: '楼层4' }, { value: 455, name: '楼层5' }],
      floorLegend: ['楼层1', '楼层2', '楼层3', '楼层4', '楼层5'],
    }
  },
  computed: {
    waterBuild: function () {
      return {
            '3-3-1-2-1': {
              backgroundColor:'',
              title: {
                text: '建筑本日用水',
                textStyle: {
                  color: '#01ffff',
                  fontSize: '20',
                  fontWeight: 400
                },
                left: 20,
                top: 10
              },
              grid:{
                top:80,
                left:80,
                bottom:30
              },
              xAxis: {
                type: 'category',
                name: "时",
                boundaryGap: false,
                data: this.xDaydata,
                axisLine: {
                  lineStyle: {
                    color: '#01ffff'
                  }
                }
              },
              yAxis: {
                type: 'value',
                axisLabel: {
                  formatter: '{value} m³'
                },
                axisLine: {
                  lineStyle: {
                    color: '#01ffff'
                  }
                }
              },
              series: [
                {
                  name: '本日用水',
                  type: 'line',
                  data: this.buildDayData,
                  markPoint: {
                    data: [
                      { type: 'max', name: '最高用水量' },
                      { type: 'min', name: '最低用水量' }
                    ]
                  }
                }
              ]
            },
            '3-3-1-2-2': {
              backgroundColor:'',
              title: {
                text: '建筑本月用水',
                textStyle: {
                  color: '#01ffff',
                  fontSize: '20',
                  fontWeight: 400
                },
                left: 20,
                top: 10
              },
              grid:{
                top:80,
                left:80,
                bottom:30
              },
              xAxis: {
                type: 'category',
                name: "日",
                boundaryGap: true,
                data: this.xMonthdata,
                axisLine: {
                  lineStyle: {
                    color: '#01ffff'
                  }
                }
              },
              yAxis: {
                type: 'value',
                axisLabel: {
                  formatter: '{value}m³'
                },
                axisLine: {
                  lineStyle: {
                    color: '#01ffff'
                  }
                }
              },
              series: [
                {
                  name: '本月用水',
                  type: 'bar',
                  data: this.buildMonthData,
                  markPoint: {
                    data: [
                      { type: 'max', name: '最高本月用水' },
                      { type: 'min', name: '最低本月用水' }
                    ]
                  }
                }
              ]
            },
            '3-3-1-2-3': {
              backgroundColor:'',
              title: {
                text: '建筑本年用水',
                textStyle: {
                  color: '#01ffff',
                  fontSize: '20',
                  fontWeight: 400
                },
                left: 20,
                top: 10
              },
              grid:{
                top:80,
                left:80,
                bottom:30
              },
              xAxis: {
                type: 'category',
                name: "月",
                boundaryGap: true,
                data: this.xYeardata,
                axisLine: {
                  lineStyle: {
                    color: '#01ffff'
                  }
                }
              },
              yAxis: {
                type: 'value',
                axisLabel: {
                  formatter: '{value}m³'
                },
                axisLine: {
                  lineStyle: {
                    color: '#01ffff'
                  }
                }
              },
              series: [
                {
                  name: '本年用水',
                  type: 'bar',
                  data: this.buildYearData,
                  markPoint: {
                    data: [
                      { type: 'max', name: '最高本年用水' },
                      { type: 'min', name: '最低本年用水' }
                    ]
                  }
                }
              ]
            },
            '3-3-1-2-4': {
              backgroundColor:'',
              tooltip: {
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c} ({d}%)"
              },
              title: {
                text: '各层用水占比',
                textStyle: {
                  color: '#01ffff',
                  fontSize: '20',
                  fontWeight: 400
                },
                left: 20,
                top: 10
              },
              legend: {
                orient: 'vertical',
                x: 'left',
                top: 50,
                left: 20,
                data: this.floorLegend,
                textStyle: {
                  color: '#fff'
                },
              },
              series: [
                {
                  name: '各层用水占比',
                  type: 'pie',
                  radius: '70%',
                  center: ['50%', '65%'],
                  data: this.floorData
                }
              ]
            }
          }
    }
  },
  mounted() {
    console.log(this.datas);
    $("#waterBuild").css('height', '1040px');
    var self = this;
    var aa = setInterval(function () {
      self.arge = sessionStorage.getItem("arge");
    }, 500);
  },
  methods: {
    expandTable: function () {
      this.isExpand = !this.isExpand;
      //request table data
    }
  },
  components: {
    charts
  },
  watch: {
    isExpand: {
      handler: function () {
        console.log(this.isExpand);
        if (this.isExpand == true) {
          $("#waterBuild").css('height', '1040px');
        } else {
          $("#waterBuild").css('height', '');
        }
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.indoorhis {
    &-title {
        color: #01ffff;
        font-size: 24px;
        text-align: left;
    }
    &-content {
        margin: 20px 0;
        width: 100%;
    }
}
.charts{
    margin: 20px 0;
    width: 100%;
    height: 240px;
}
</style>

