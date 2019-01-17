<template>
  <div class="indoorhis" id="waterFloor">
    <div class="indoorhis-title" @click="expandTable">
      <i class="el-icon-plus" v-if="!isExpand"></i>
      <i class="el-icon-minus" v-else></i>
      {{datas.title}}
    </div>
    <div class="indoorhis-floor" v-show="isExpand">
      {{argetrans}}
    </div>
    <div class="indoorhis-content charts" v-show="isExpand">
      <!-- <div class="charts"> -->
      <charts
        v-for="(item,key) in waterFloor"
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
  name: 'floorWater',
  props: {
    datas: Object
  },
  data() {
    return {
      change: true,
      isExpand: true,
      arge: '',
      argetrans: "",
      xDaydata: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '0'],
      xMonthdata:['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30'],
      xYeardata: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
      floorDayData: [70.39, 68.43, 64, 62, 56, 65, 67, 56, 52, 72, 65, 69, 60, 58, 47, 75, 54, 65, 60, 54, 62, 63, 67, 71],
      floorMonthData:[1539, 1855, 2089, 2059, 1640, 2058, 2051, 1507, 1567, 2028, 1511, 1973, 2088, 1646, 1797, 1517, 1825, 2036, 1660, 1763, 1923, 1753, 1990, 1594, 1735, 1956, 1653, 2016, 2056, 1527],
      floorYearData: [27300, 25300, 17100, 15080.2, 13180.2, 10880.2, 15804.6, 19804.6, 19300, 23300, 25300, 20000],
    }
  },
  computed: {
    waterFloor: function () {
      return {
            '3-3-1-3-1': {
              backgroundColor:'',
              title: {
                text: '本日用水',
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
                  name: '本日用水',
                  type: 'line',
                  data: this.floorDayData,
                  markPoint: {
                    data: [
                      { type: 'max', name: '最高用水量' },
                      { type: 'min', name: '最低用水量' }
                    ]
                  }
                }
              ]
            },
            '3-3-1-3-2': {
              backgroundColor:'',
              title: {
                text: '本月用水',
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
                  data: this.floorMonthData,
                  markPoint: {
                    data: [
                      { type: 'max', name: '最高本水用电' },
                      { type: 'min', name: '最低本水用电' }
                    ]
                  }
                }
              ]
            },
            '3-3-1-3-3': {
              backgroundColor:'',
              title: {
                text: '本年用水',
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
                  data: this.floorYearData,
                  markPoint: {
                    data: [
                      { type: 'max', name: '最高本年用水' },
                      { type: 'min', name: '最低本年用水' }
                    ]
                  }
                }
              ]
            }
        }
    }
  },
  mounted() {
    console.log(this.datas);
    $("#waterFloor").css('height', 'auto');
    var self = this;
    var aa = setInterval(function () {
      self.arge = sessionStorage.getItem("arge");
      if (self.arge == "floor_a1f") {
        self.argetrans = "a建筑1楼层";
      }
      if (self.arge == "floor_a2f") {
        self.argetrans = "a建筑2楼层";
      }
      if (self.arge == "floor_a3f") {
        self.argetrans = "a建筑3楼层";
      }
      if (self.arge == "floor_a4f") {
        self.argetrans = "a建筑4楼层";
      }
      if (self.arge == "floor_a5f") {
        self.argetrans = "a建筑5楼层";
      }
      if (!self.arge) {
        self.argetrans = "a建筑";
      }
    }, 500);
  },
  methods: {
    expandTable: function () {
      this.isExpand = !this.isExpand;
      //request table data
    },
    randomdata(max,min,des,num){
      var arr=[];
      for(var i=0;i<num;i++){
        arr.push(Number((Math.random() * (max - min) + min).toFixed(des)));
      }
      return arr;
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
          $("#waterFloor").css('height', 'auto');
        } else {
          $("#waterFloor").css('height', '');
        }
      }
    },
    arge: {
      handler: function () {
        var self = this;
          self.floorDayData = self.randomdata(90,30,1,24);
          self.floorMonthData = self.randomdata(2100,1500,0,30),
          self.floorYearData = self.randomdata(25200,18000,0,12);
          self.change = !self.change;
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
    &-floor {
        color: #01ffff;
        font-size: 24px;
        text-align: left;
        margin:20px 0 -10px 5px;
    }
    &-content {
        margin: 0 0 0 10px;
        width: 100%;
    }
}
.charts{
    margin: 20px 0;
    width: 100%;
    height: 240px;
}
</style>

