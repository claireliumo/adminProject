<template>
  <div class="indoorhis" id="floorElectricity">
    <div class="indoorhis-title" @click="expandTable">
      <i class="el-icon-plus" v-if="!isExpand"></i>
      <i class="el-icon-minus" v-else></i>
      {{datas.title}}
    </div>
    <div class="indoorhis-choose" v-show="isExpand">
      <p>{{argetrans}}</p>
    </div>
    <div class="indoorhis-content" v-show="isExpand">
      <!-- <p>当前楼层：{{arge}}</p> -->
      <div v-if="change" class="charts">
        <charts
          v-for="(item,key) in floorElectricity"
          :key="key"
          :containerId="'charts' + key"
          :customOption="item"
        ></charts>
      </div>
      <div v-else class="charts">
        <charts
          v-for="(item,key) in floorElectricity"
          :key="key"
          :containerId="'charts' + key"
          :customOption="item"
        ></charts>
      </div>
    </div>
  </div>
</template>
<script>
import charts from './charts'
export default {
  name: 'floorElectricity',
  props: {
    datas: Object
  },
  data() {
    return {
      change: true,
      arge: '',
      argetrans:'',
      isExpand: true,
      xdata: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
      ele: ['建筑', '空调', '电器', '其他'],
      air: ['采暖', '厨房', '其他'],
      water: ['生活', '厨房', '空调', '其他'],
      eledata1: [258, 232, 256, 281, 189, 0, 0],
      eledata2: [388, 312, 331, 379, 340, 0, 0],
      eledata3: [199, 271, 241, 232, 200, 0, 0],
      eledata4: [112, 195, 176, 125, 105, 0, 0],
      airdata1: [7.75, 7.87, 6.68, 6.01, 7.52, 0, 0],
      airdata2: [5.89, 5.12, 4.33, 5.78, 5.18, 0, 0],
      airdata3: [1.11, 2.56, 2.78, 2.23, 2.56, 0, 0],
      waterdata1: [2.01, 1.59, 0.89, 2.12, 2.33, 0, 0],
      waterdata2: [1.13, 1.28, 1.89, 1.77, 1.32, 0, 0],
      waterdata3: [1.32, 1.13, 0.78, 0.91, 2.25, 0, 0],
      waterdata4: [0.12, 0.15, 0.33, 0.81, 0.79, 0, 0]
    }
  },
  computed: {
    floorElectricity: function () {
      return {
        '3-1-3-1': {
          backgroundColor:'',
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'shadow'
            }
          },
          legend: {
            data: this.ele,
            textStyle: {
              color: "white"
            },
             y:'bottom'
          },
          grid:{
            bottom:50,
            left:80
          },
          title: {
            text: '用电总览',
            textStyle: {
              color: '#01ffff',
              fontSize: '20',
              fontWeight: 400
            },
            left: 20,
            top: 10
          },
          xAxis: {
            type: 'category',
            boundaryGap: true,
            data: this.xdata,
            axisLine: {
              lineStyle: {
                color: '#01ffff'
              }
            }
          },
          yAxis: {
            type: 'value',
            axisLabel: {
              formatter: '{value} kwh'
            },
            axisLine: {
              lineStyle: {
                color: '#01ffff'
              }
            }
          },
          series: [
            {
              name: this.ele[0],
              type: 'bar',
              stack: 'elec',
              data: this.eledata1
            },
            {
              name: this.ele[1],
              type: 'bar',
              stack: 'elec',
              data: this.eledata2
            },
            {
              name: this.ele[2],
              type: 'bar',
              stack: 'elec',
              data: this.eledata3
            },
            {
              name: this.ele[3],
              type: 'bar',
              stack: 'elec',
              data: this.eledata4
            }
          ]
        },
        '3-1-3-2': {
          backgroundColor:'',
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'shadow'
            }
          },
          legend: {
            data: this.air,
            textStyle: {
              color: "white"
            },
             y:'bottom'
          },
          grid:{
            bottom:50,
            left:80
          },
          title: {
            text: '用气总览',
            textStyle: {
              color: '#01ffff',
              fontSize: '20',
              fontWeight: 400
            },
            left: 20,
            top: 10
          },
          xAxis: {
            type: 'category',
            boundaryGap: true,
            data: this.xdata,
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
              name: this.air[0],
              type: 'bar',
              stack: 'air',
              data: this.airdata1
            },
            {
              name: this.air[1],
              type: 'bar',
              stack: 'air',
              data: this.airdata2
            },
            {
              name: this.air[2],
              type: 'bar',
              stack: 'air',
              data: this.airdata3
            }
          ]
        },
        '3-1-3-3': {
          backgroundColor:'',
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'shadow'
            }
          },
          legend: {
            data: this.water,
            textStyle: {
              color: "white"
            },
             y:'bottom'
          },
          grid:{
            bottom:50,
            left:80
          },
          title: {
            text: '用水总览',
            textStyle: {
              color: '#01ffff',
              fontSize: '20',
              fontWeight: 400
            },
            left: 20,
            top: 10
          },
          xAxis: {
            type: 'category',
            boundaryGap: true,
            data: this.xdata,
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
              name: this.water[0],
              type: 'bar',
              stack: 'water',
              data: this.waterdata1
            },
            {
              name: this.water[1],
              type: 'bar',
              stack: 'water',
              data: this.waterdata2
            },
            {
              name: this.water[2],
              type: 'bar',
              stack: 'water',
              data: this.waterdata3
            },
            {
              name: this.water[3],
              type: 'bar',
              stack: 'water',
              data: this.waterdata4
            }
          ]
        },
      }
    }
  },
  mounted() {
    console.log(this.datas);
    $("#floorElectricity").css('height', '820px');
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
          $("#floorElectricity").css('height', '820px');
        } else {
          $("#floorElectricity").css('height', '');
        }
      }
    },
    arge: {
      handler: function () {
        var self = this;
        if (self.arge == 'floor_a1f') {
          self.eledata1 = [100, 230, 286, 231, 159, 0, 0];
          self.eledata2 = [368, 316, 332, 375, 320, 0, 0];
          self.eledata3 = [299, 271, 244, 232, 210, 0, 0];
          self.eledata4 = [112, 165, 166, 225, 155, 0, 0];
          self.airdata1 = [7.35, 7.17, 6.68, 6.61, 7.22, 0, 0];
          self.airdata2 = [5.39, 5.32, 4.33, 5.78, 5.68, 0, 0];
          self.airdata3 = [1.61, 2.36, 2.28, 2.63, 2.36, 0, 0];
          self.waterdata1 = [2.51, 1.59, 0.29, 2.52, 2.13, 0, 0];
          self.waterdata2 = [1.53, 1.28, 1.29, 1.17, 1.52, 0, 0];
          self.waterdata3 = [1.82, 1.23, 0.58, 1.91, 2.65, 0, 0];
          self.waterdata4 = [0.22, 0.15, 0.03, 0.11, 0.19, 0, 0];
          self.change = !self.change;
        }
        if (self.arge == 'floor_a2f') {
          self.eledata1 = [120, 222, 246, 221, 119, 0, 0];
          self.eledata2 = [358, 352, 351, 359, 370, 0, 0];
          self.eledata3 = [149, 241, 241, 242, 240, 0, 0];
          self.eledata4 = [112, 195, 176, 115, 165, 0, 0];
          self.airdata1 = [6.75, 7.57, 4.68, 7.01, 9.52, 0, 0];
          self.airdata2 = [5.79, 4.12, 8.33, 9.78, 2.18, 0, 0];
          self.airdata3 = [6.11, 3.56, 1.78, 0.23, 6.56, 0, 0];
          self.waterdata1 = [2.01, 1.79, 0.99, 2.82, 6.33, 0, 0];
          self.waterdata2 = [1.73, 1.98, 4.89, 2.77, 6.32, 0, 0];
          self.waterdata3 = [1.62, 1.83, 0.48, 0.78, 3.25, 0, 0];
          self.waterdata4 = [1.12, 0.98, 0.65, 1.81, 0.78, 0, 0];
          self.change = !self.change;
        }
        if (self.arge == 'floor_a3f') {
          self.eledata1 = [330, 242, 236, 181, 179, 0, 0];
          self.eledata2 = [380, 314, 371, 179, 320, 0, 0];
          self.eledata3 = [120, 171, 231, 212, 400, 0, 0];
          self.eledata4 = [120, 180, 190, 130, 110, 0, 0];
          self.airdata1 = [7.15, 3.87, 5.68, 3.01, 6.52, 0, 0];
          self.airdata2 = [5.89, 5.12, 4.33, 5.78, 6.18, 0, 0];
          self.airdata3 = [5.11, 1.56, 2.20, 2.26, 2.36, 0, 0];
          self.waterdata1 = [3.01, 2.59, 1.89, 2.42, 1.33, 0, 0];
          self.waterdata2 = [4.13, 2.28, 1.19, 1.79, 3.32, 0, 0];
          self.waterdata3 = [2.32, 1.73, 1.78, 1.91, 1.25, 0, 0];
          self.waterdata4 = [0.10, 0.10, 0.93, 9.81, 1.79, 0, 0];
          self.change = !self.change;
        }
        if (self.arge == 'floor_a4f') {
          self.eledata1 = [200, 232, 246, 280, 189, 0, 0];
          self.eledata2 = [298, 312, 231, 389, 340, 0, 0];
          self.eledata3 = [109, 271, 441, 322, 100, 0, 0];
          self.eledata4 = [112, 295, 376, 125, 135, 0, 0];
          self.airdata1 = [1.75, 7.87, 2.68, 6.91, 7.52, 0, 0];
          self.airdata2 = [4.89, 5.12, 3.33, 5.78, 5.18, 0, 0];
          self.airdata3 = [2.11, 1.56, 2.79, 2.23, 2.56, 0, 0];
          self.waterdata1 = [3.01, 1.49, 1.89, 2.12, 1.33, 0, 0];
          self.waterdata2 = [1.13, 2.28, 1.99, 1.77, 4.32, 0, 0];
          self.waterdata3 = [1.72, 2.13, 0.78, 1.91, 2.25, 0, 0];
          self.waterdata4 = [1.12, 0.95, 0.63, 0.41, 0.79, 0, 0];
          self.change = !self.change;
        }
        if (self.arge == 'floor_a5f') {
          self.eledata1 = [400, 232, 156, 181, 189, 0, 0];
          self.eledata2 = [378, 212, 331, 379, 340, 0, 0];
          self.eledata3 = [199, 271, 241, 532, 200, 0, 0];
          self.eledata4 = [112, 195, 176, 325, 105, 0, 0];
          self.airdata1 = [2.75, 4.87, 6.88, 6.01, 7.52, 0, 0];
          self.airdata2 = [4.89, 5.12, 3.33, 2.78, 4.18, 0, 0];
          self.airdata3 = [1.11, 2.56, 4.78, 1.23, 6.56, 0, 0];
          self.waterdata1 = [2.01, 2.09, 0.89, 2.12, 2.33, 0, 0];
          self.waterdata2 = [1.13, 3.28, 1.89, 6.77, 1.32, 0, 0];
          self.waterdata3 = [1.32, 1.13, 0.78, 1.91, 0.25, 0, 0];
          self.waterdata4 = [7.12, 1.15, 3.33, 3.81, 1.79, 0, 0];
          self.change = !self.change;
        }
        if (!self.arge) {
          self.eledata1 = [258, 232, 256, 281, 189, 0, 0];
          self.eledata2 = [388, 312, 331, 379, 340, 0, 0];
          self.eledata3 = [199, 271, 241, 232, 200, 0, 0];
          self.eledata4 = [112, 195, 176, 125, 105, 0, 0];
          self.airdata1 = [7.75, 7.87, 6.68, 6.01, 7.52, 0, 0];
          self.airdata2 = [5.89, 5.12, 4.33, 5.78, 5.18, 0, 0];
          self.airdata3 = [1.11, 2.56, 2.78, 2.23, 2.56, 0, 0];
          self.waterdata1 = [2.01, 1.59, 0.89, 2.12, 2.33, 0, 0];
          self.waterdata2 = [1.13, 1.28, 1.89, 1.77, 1.32, 0, 0];
          self.waterdata3 = [1.32, 1.13, 0.78, 0.91, 2.25, 0, 0];
          self.waterdata4 = [0.12, 0.15, 0.33, 0.81, 0.79, 0, 0];
          self.change = !self.change;
        }
        console.log(self.change);
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.indoorhis {
    &-choose {
      color: #01ffff;
      font-size: 24px;
      text-align: left;
      margin:20px 0 -10px 5px;
    }
    &-title {
        color: #01ffff;
        font-size: 24px;
        text-align: left;
    }
    &-content {
        margin: 20px 0 0 0;
        width: 100%;
        height: 240px;
    }
}
.charts{
  margin: 20px 0;
  width: 100%;
  height: 240px;
}
</style>

