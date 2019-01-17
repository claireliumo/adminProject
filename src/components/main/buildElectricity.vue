<template>
  <div class="indoorhis" id="buildElectricity">
    <div class="indoorhis-title" @click="expandTable">
      <i class="el-icon-plus" v-if="!isExpand"></i>
      <i class="el-icon-minus" v-else></i>
      {{datas.title}}
    </div>
    <div class="indoorhis-content" v-if="isExpand">
      <charts
        v-for="(item,key) in buildElectricity"
        :key="key"
        :containerId="'charts' + key"
        :customOption="item"
      ></charts>
    </div>
  </div>
</template>
<script>
import charts from './charts'
import axios from "axios";
import qs from "qs";
export default {
  name: 'buildElectricity',
  props: {
    datas: Object
  },
  data() {
    return {
      isExpand: true,
      xdata: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
      ele: ['建筑', '空调', '电器', '其他'],
      air: ['采暖', '厨房', '其他'],
      water: ['生活', '厨房', '空调', '其他'],
      eledata1: [1158, 1232, 1256, 1281, 1189, 10, 10],
      eledata2: [1588, 1612, 1631, 1579, 1640, 20, 10],
      eledata3: [999, 978, 1100, 1121, 988, 5, 5],
      eledata4: [412, 395, 376, 425, 405, 0, 0],
      airdata1: [36.75, 35.87, 38.68, 37.01, 36.52, 2, 2],
      airdata2: [24.89, 25.12, 25.33, 24.78, 25.18, 1.5, 1.5],
      airdata3: [10.11, 10.56, 9.78, 9.23, 10.56, 0, 0],
      waterdata1: [8.01, 7.59, 7.89, 8.12, 8.33, 0, 0],
      waterdata2: [6.13, 6.28, 5.89, 5.77, 6.32, 0, 0],
      waterdata3: [4.32, 4.13, 3.78, 3.91, 4.25, 0, 0],
      waterdata4: [2, 2.15, 2.33, 1.81, 1.79, 0, 0]
    }
  },
  computed: {
    buildElectricity: function () {
      return {
        '3-1-2-1': {
          backgroundColor: '',
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
            y: 'bottom'
          },
          grid: {
            bottom: 50,
            left: 80
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
        '3-1-2-2': {
          backgroundColor: '',
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
            y: 'bottom'
          },
          grid: {
            bottom: 50,
            left: 80
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
        '3-1-2-3': {
          backgroundColor: '',
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
            y: 'bottom'
          },
          grid: {
            bottom: 50,
            left: 80
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
    $("#buildElectricity").css('height', '820px');
    console.log(this.datas);
    // var that = this;
    // axios({
    //   url: this.FACTURL.baseURL+"/energy_electricity_overview",
    //   method: "post",
    //   data: {
    //     uid: "b58f6e1d-e0cd-11e8-98ce-00163e10c840",
    //     check_id: 'b01',
    //   },
    //   headers: {
    //     "Content-Type": "application/json"
    //   }
    // })
    //   .then(function (response) {
    //     console.log(response.data);
    //     if (response.data.msg == 'success') {
    //       var ans = response.data.data;
    //       that.xdata = [];
    //       that.eledata1 = [];
    //       that.eledata2 = [];
    //       that.eledata3 = [];
    //       that.eledata4 = [];
    //       that.airdata1 = [];
    //       that.airdata2 = [];
    //       that.airdata3 = [];
    //       that.ele = [];
    //       that.air = [];
    //       that.water = [];
    //       that.waterdata1 = [];
    //       that.waterdata2 = [];
    //       that.waterdata3 = [];
    //       that.waterdata4 = [];
    //       for (var i = 0; i < ans.electricity.length; i++) {
    //         that.xdata.push(ans.electricity[i].time)
    //         that.eledata1.push(ans.electricity[i].value_list[0].value);
    //         that.eledata2.push(ans.electricity[i].value_list[1].value);
    //         that.eledata3.push(ans.electricity[i].value_list[2].value);
    //         that.eledata4.push(ans.electricity[i].value_list[3].value);
    //       }
    //       for (var j = 0; j < ans.electricity[0].value_list.length; j++) {
    //         that.ele.push(ans.electricity[0].value_list[j].name);
    //       }
    //       for (var k = 0; k < ans.gas.length; k++) {
    //         that.airdata1.push(ans.gas[k].value_list[0].value);
    //         that.airdata2.push(ans.gas[k].value_list[1].value);
    //         that.airdata3.push(ans.gas[k].value_list[2].value);
    //       }
    //       for (var j = 0; j < ans.gas[0].value_list.length; j++) {
    //         that.air.push(ans.gas[0].value_list[j].name);
    //       }
    //       for (var k = 0; k < ans.water.length; k++) {
    //         that.waterdata1.push(ans.water[k].value_list[0].value);
    //         that.waterdata2.push(ans.water[k].value_list[1].value);
    //         that.waterdata3.push(ans.water[k].value_list[2].value);
    //         that.waterdata4.push(ans.water[k].value_list[3].value);
    //       }
    //       for (var j = 0; j < ans.water[0].value_list.length; j++) {
    //         that.water.push(ans.water[0].value_list[j].name);
    //       }
    //     }
    //   })
    //   .catch(function (error) {
    //     console.log(error);
    //     that.$message.error("出错啦～");
    //   });
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
          $("#buildElectricity").css('height', '820px');
        } else {
          $("#buildElectricity").css('height', '');
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
        margin: 20px 0 0 0;
        width: 100%;
        height: 240px;
    }
}
</style>

