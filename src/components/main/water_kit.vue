<template>
  <div class="indoorhis" id="waterKit">
    <div v-for="detail in waterKit">
      <div class="indoorhis-title">{{detail.name}}</div>
      <!-- <div class="indoorhis-title" @click="expandTable(detail)">
            <i class="el-icon-plus" v-if="!(detail.isExpand)"></i>
            <i class="el-icon-minus" v-else></i>
                {{detail.name}}
      </div>-->
      <div class="indoorhis-content">
        <div v-for="(item,key) in detail.content" class="charts">
          <charts :key="key" :containerId="'charts' + key" :customOption="item"></charts>
        </div>
      </div>
      <br>
    </div>
  </div>
</template>
<script>
import charts from './charts'
import axios from "axios";
import qs from "qs";
export default {
  name: 'kitWater',
  props: {
    datas: Array
  },
  data() {
    return {
      isExpand: true,
      xDaydata: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '0'],
      xMonthdata: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30'],
      xYeardata: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
      kitDayData: [351.39, 342.43, 342, 344, 356, 325, 367, 345, 342, 342, 365, 359, 360, 358, 317, 325, 324, 345, 330, 344, 322, 333, 367, 321],
      kitMonthData: [8328, 8020, 8159, 8090, 8101, 8047, 8206, 8282, 8185, 8239, 8384, 8084, 8215, 8293, 8076, 8386, 8124, 8251, 8309, 8284, 8033, 8137, 8031, 8022, 8365, 8224, 8253, 8241, 8346, 8280],
      kitYearData: [136500, 126500, 85500, 75401, 65901, 54401, 79023, 99023, 96500, 116500, 126500, 100000],
    }
  },
  mounted() {
    console.log(this.datas);
    $("#waterKit").css('height', '490px');
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
          that.kitDayData = [];
          that.kitYearData = [];
          that.kitMonthData = [];
          for (var i = 0; i < ans.kitchen_water.history_year_list.length; i++) {
            that.xYeardata.push(ans.kitchen_water.history_year_list[i].history_time);
            that.kitYearData.push(ans.kitchen_water.history_year_list[i].history_value);
          }
          for (var i = 0; i < ans.kitchen_water.history_month_list.length; i++) {
            that.xMonthdata.push(ans.kitchen_water.history_month_list[i].history_time);
            that.kitMonthData.push(ans.kitchen_water.history_month_list[i].history_value);
          }
          for (var i = 0; i < ans.kitchen_water.history_day_list.length; i++) {
            that.xDaydata.push(ans.kitchen_water.history_day_list[i].history_time);
            that.kitDayData.push(ans.kitchen_water.history_day_list[i].history_value);
          }
        }
      })
      .catch(function (error) {
        console.log(error);
        that.$message.error("出错啦～");
      });
  },
  computed: {
    waterKit: function () {
      return [
        {
          name: '本日用水',
          content: {
            '3-3-2-1': {
              backgroundColor: '',
              title: {
                text: '',
                textStyle: {
                  color: '#01ffff',
                  fontSize: '20',
                  fontWeight: 400
                },
                left: 20
              },
              grid: {
                top: 30,
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
                  data: this.kitDayData,
                  markPoint: {
                    data: [
                      { type: 'max', name: '最高用水量' },
                      { type: 'min', name: '最低用水量' }
                    ]
                  }
                }
              ]
            },
          }
        },
        {
          name: '本月用水',
          content: {
            '3-3-2-2': {
              backgroundColor: '',
              title: {
                text: '',
                textStyle: {
                  color: '#01ffff',
                  fontSize: '20',
                  fontWeight: 400
                },
                left: 20
              },
              grid: {
                top: 30,
                left: 80,
                bottom:30
              },
              xAxis: {
                type: 'category',
                name: "日",
                boundaryGap: false,
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
                  type: 'line',
                  data: this.kitMonthData,
                  markPoint: {
                    data: [
                      { type: 'max', name: '最高用水量' },
                      { type: 'min', name: '最低用水量' }
                    ]
                  }
                }
              ]
            },
          }
        },
        {
          name: '本年用水',
          content: {
            '3-3-2-3': {
              backgroundColor: '',
              title: {
                text: '',
                textStyle: {
                  color: '#01ffff',
                  fontSize: '20',
                  fontWeight: 400
                },
                left: 20
              },
              grid: {
                top: 30,
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
                  data: this.kitYearData,
                  markPoint: {
                    data: [
                      { type: 'max', name: '最高用水' },
                      { type: 'min', name: '最低用水' }
                    ]
                  }
                }
              ]
            },
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
          $("#waterKit").css('height', '490px');
        } else {
          $("#waterKit").css('height', '');
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
        height: 200px;
    }
}
.charts{
    margin:0;
    width: 100%;
    height: 200px;
}
</style>

