<template>
  <div class="indoorhis" id="waterAir">
    <div class="indoorhis-title" @click="expandTable">
      <i class="el-icon-plus" v-if="!isExpand"></i>
      <i class="el-icon-minus" v-else></i>
      {{datas.title}}
    </div>
    <div class="indoorhis-content" v-if="isExpand">
      <div v-for="(itemm,index) in waterAir">
        <div v-for="(item,key) in itemm.content" class="charts">
          <charts :key="key" :containerId="'charts' + key" :customOption="item"></charts>
        </div>
      </div>
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
      xDaydata: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '0'],
      xMonthdata: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30'],
      xYeardata: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
      airDayData: [351.39, 342.43, 342, 344, 356, 325, 367, 345, 342, 342, 365, 359, 360, 358, 317, 325, 324, 345, 330, 344, 322, 333, 367, 321],
      airMonthData: [1468, 1052, 1280, 1462, 1494, 1026, 1219, 1378, 1001, 1378, 1464, 1420, 1135, 1108, 1041, 1086, 1050, 1373, 1137, 1140, 1355, 1235, 1377, 1193, 1331, 1460, 1482, 1436, 1443, 1278],
      airYearData: [136500, 126500, 85500, 75401, 65901, 54401, 79023, 99023, 96500, 116500, 126500, 100000],
    }
  },
  mounted() {
    console.log(this.datas);
    $("#waterAir").css('height', 'auto');
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
          that.airDayData = [];
          that.airMonthData = [];
          that.airYearData = [];
          for (var i = 0; i < ans.ac_water.history_year_list.length; i++) {
            that.xYeardata.push(ans.ac_water.history_year_list[i].history_time);
            that.airYearData.push(ans.ac_water.history_year_list[i].history_value);
          }
          for (var i = 0; i < ans.ac_water.history_month_list.length; i++) {
            that.xMonthdata.push(ans.ac_water.history_month_list[i].history_time);
            that.airMonthData.push(ans.ac_water.history_month_list[i].history_value);
          }
          for (var i = 0; i < ans.ac_water.history_day_list.length; i++) {
            that.xDaydata.push(ans.ac_water.history_day_list[i].history_time);
            that.airDayData.push(ans.ac_water.history_day_list[i].history_value);
          }
        }
      })
      .catch(function (error) {
        console.log(error);
        that.$message.error("出错啦～");
      });
  },
  computed: {
    waterAir: function () {
      return [
        {
          name: "补水用水",
          content: {
            '3-3-3-1': {
              backgroundColor: '',
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
                  data: this.airDayData,
                  markPoint: {
                    data: [
                      { type: 'max', name: '最高本日用水' },
                      { type: 'min', name: '最低本日用水' }
                    ]
                  }
                }
              ]
            },
            '3-3-3-2': {
              backgroundColor: '',
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
              grid: {
                top: 80,
                left: 80,
                bottom:30
              },
              xAxis: {
                type: 'category',
                name: "日",
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
                  name: '本月用水',
                  type: 'line',
                  data: this.airMonthData,
                  markPoint: {
                    data: [
                      { type: 'max', name: '最高本月用水' },
                      { type: 'min', name: '最低本月用水' }
                    ]
                  }
                }
              ]
            },
            '3-3-3-3': {
              backgroundColor: '',
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
                  data: this.airYearData,
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
      ]
    }
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
          $("#waterAir").css('height', 'auto');
        } else {
          $("#waterAir").css('height', '');
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

