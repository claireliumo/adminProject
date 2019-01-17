<template>
  <div class="indoorhis" id="waterArea">
    <div class="indoorhis-title" @click="expandTable">
      <i class="el-icon-plus" v-if="!isExpand"></i>
      <i class="el-icon-minus" v-else></i>
      {{datas.title}}
    </div>
    <div class="indoorhis-content charts" v-show="isExpand">
      <!-- <div class=""> -->
        <charts
          v-for="(item,key) in waterArea"
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
import axios from "axios";
import qs from "qs";
export default {
  name: 'buildElectricity',
  props: {
    datas: Object
  },
  data() {
    return {
      change: true,
      isExpand: true,
      arge: '',
      xDaydata: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '0'],
      xMonthdata: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30'],
      xYeardata: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
      areaDayData: [351.39, 342.43, 342, 344, 356, 325, 367, 345, 342, 342, 365, 359, 360, 358, 317, 325, 324, 345, 330, 344, 322, 333, 367, 321],
      areaMonthData: [10561, 10928, 10120, 10161, 10591, 10488, 9679, 10632, 10611, 10092, 10444, 10821, 10386, 10354, 9554, 10391, 10771, 9879, 9727, 9800, 10527, 10513, 10938, 10736, 10272, 10513, 10794, 10017, 10001, 10268],
      areaYearData: [136500, 126500, 85500, 75401, 65901, 54401, 79023, 99023, 96500, 116500, 126500, 100000],
      areaData: [
        { value: 335, name: '建筑1' }
      ],
      areaLegend: ['建筑1'],
    }
  },
  computed: {
    waterArea: function () {
      return {
        '3-3-1-1-1': {
          backgroundColor: '',
          title: {
            text: '园区本日用水',
            textStyle: {
              color: '#01ffff',
              fontSize: '20',
              fontWeight: 400
            },
            left: 20,
            top: 10
          },
          grid: {
            top: 80,
            left: 80,
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
              data: this.areaDayData,
              markPoint: {
                data: [
                  { type: 'max', name: '最高用水量' },
                  { type: 'min', name: '最低用水量' }
                ]
              }
            }
          ]
        },
        '3-3-1-1-2': {
          backgroundColor: '',
          title: {
            text: '园区本月用水',
            textStyle: {
              color: '#01ffff',
              fontSize: '20',
              fontWeight: 400
            },
            left: 20,
            top: 10
          },
          grid: {
            top: 80,
            left: 80,
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
              name: '本月用水',
              type: 'bar',
              data: this.areaMonthData,
              markPoint: {
                data: [
                  { type: 'max', name: '最高本月用水' },
                  { type: 'min', name: '最低本月用水' }
                ]
              }
            }
          ]
        },
        '3-3-1-1-3': {
          backgroundColor: '',
          title: {
            text: '园区本年用水',
            textStyle: {
              color: '#01ffff',
              fontSize: '20',
              fontWeight: 400
            },
            left: 20,
            top: 10
          },
          grid: {
            top: 80,
            left: 80,
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
              name: '本年用水',
              type: 'bar',
              data: this.areaYearData,
              markPoint: {
                data: [
                  { type: 'max', name: '最高本年用水' },
                  { type: 'min', name: '最低本年用水' }
                ]
              }
            }
          ]
        },
        '3-3-1-1-4': {
          backgroundColor: '',
          tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
          },
          title: {
            text: '各建筑用水占比',
            textStyle: {
              color: '#01ffff',
              fontSize: '20',
              fontWeight: 400
            },
            left: 20,
            top: 10
          },
          // grid: {
          //   left: '8%',
          //   right: '0',
          // },
          legend: {
            orient: 'vertical',
            x: 'left',
            top: 50,
            left: 20,
            right: 20,
            data: this.areaLegend,
            textStyle: {
              color: '#fff'
            },
          },
          series: [
            {
              name: '各建筑用水占比',
              type: 'pie',
              radius: '70%',
              center: ['60%', '65%'],
              data: this.areaData
            }
          ]
        }
      }
    }
  },
  mounted() {
    console.log(this.datas);
    $("#waterArea").css('height', '1040px');
    var self = this;
    var aa = setInterval(function () {
      self.arge = sessionStorage.getItem("arge");
    }, 500);
    var that = this;
    axios({
      url: this.FACTURL.baseURL+"/energy_water_overview",
      method: "post",
      data: {
        uid: "b58f6e1d-e0cd-11e8-98ce-00163e10c840",
        check_id: 'b01',
      },
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(function (response) {
        console.log(response.data);
        if (response.data.msg == 'success') {
          var ans = response.data.data;
          console.log(ans);
          that.xDaydata = [];
          that.xMonthdata = [];
          that.xYeardata = [];
          that.areaMonthData = [];
          that.areaDayData = [];
          that.areaYearData = [];
          that.areaData = [];
          that.areaLegend = [];
          for (var i = 0; i < ans.live_water.history_year_list.length; i++) {
            that.xYeardata.push(ans.live_water.history_year_list[i].history_time);
            that.areaYearData.push(ans.live_water.history_year_list[i].history_value);
          }
          for (var i = 0; i < ans.live_water.history_month_list.length; i++) {
            that.xMonthdata.push(ans.live_water.history_month_list[i].history_time);
            that.areaMonthData.push(ans.live_water.history_month_list[i].history_value);
          }
          for (var i = 0; i < ans.live_water.history_day_list.length; i++) {
            that.xDaydata.push(ans.live_water.history_day_list[i].history_time);
            that.areaDayData.push(ans.live_water.history_day_list[i].history_value);
          }
          for (var i = 0; i < ans.live_water.ratio_list.length; i++) {
            that.areaLegend.push(ans.live_water.ratio_list[i].ratio_name);
            var obj = {
              value: ans.live_water.ratio_list[i].ratio_value,
              name: ans.live_water.ratio_list[i].ratio_name
            }
            that.areaData.push(obj);
          }
        }
      })
      .catch(function (error) {
        console.log(error);
        that.$message.error("出错啦～");
      });
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
          $("#waterArea").css('height', '1040px');
        } else {
          $("#waterArea").css('height', '');
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

