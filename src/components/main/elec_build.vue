<template>
  <div class="indoorhis" id="elecBuild">
    <div class="indoorhis-title" @click="expandTable">
      <i class="el-icon-plus" v-if="!isExpand"></i>
      <i class="el-icon-minus" v-else></i>
      {{datas.title}}
    </div>
    <div class="indoorhis-content charts" v-show="isExpand">
      <!-- <div class=""> -->
        <charts v-for="(item,key) in elecBuild" :containerId="'charts' + key" :key="key" :customOption="item"></charts>
      <!-- </div> -->
    </div>
  </div>
</template>
<script>
import axios from "axios";
import qs from "qs";
import charts from "./charts";
export default {
  name: "buildElectricity",
  props: {
    datas: Object
  },
  data() {
    return {
      change: true,
      isExpand: true,
      arge: "",
      xDaydata: [],
      xMonthdata: [],
      xYeardata: [],
      buildDayData: [],
      buildMonthData: [],
      buildYearData: [],
      buildElecLegend: [],
      buildElecData: [],
      floorData: [],
      floorLegend: []
    };
  },
  computed: {
    elecBuild: function() {
      return {
        "3-2-2-1-1": {
          backgroundColor: "",
          title: {
            text: "建筑本日用电",
            textStyle: {
              color: "#01ffff",
              fontSize: "20",
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
            type: "category",
            name: "时",
            boundaryGap: false,
            data: this.xDaydata,
            axisLine: {
              lineStyle: {
                color: "#01ffff"
              }
            }
          },
          yAxis: {
            type: "value",
            axisLabel: {
              formatter: "{value} kwh"
            },
            axisLine: {
              lineStyle: {
                color: "#01ffff"
              }
            }
          },
          series: [
            {
              name: "本日用电",
              type: "line",
              data: this.buildDayData,
              markPoint: {
                data: [
                  { type: "max", name: "最高用电量" },
                  { type: "min", name: "最低用电量" }
                ]
              }
            }
          ]
        },
        "3-2-2-1-2": {
          backgroundColor: "",
          title: {
            text: "建筑本月用电",
            textStyle: {
              color: "#01ffff",
              fontSize: "20",
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
            type: "category",
            name: "月",
            boundaryGap: true,
            data: this.xMonthdata,
            axisLine: {
              lineStyle: {
                color: "#01ffff"
              }
            }
          },
          yAxis: {
            type: "value",
            axisLabel: {
              formatter: "{value} kwh"
            },
            axisLine: {
              lineStyle: {
                color: "#01ffff"
              }
            }
          },
          series: [
            {
              name: "本月用电",
              type: "bar",
              data: this.buildMonthData,
              markPoint: {
                data: [
                  { type: "max", name: "最高本月用电" },
                  { type: "min", name: "最低本月用电" }
                ]
              }
            }
          ]
        },
        "3-2-2-1-3": {
          backgroundColor: "",
          title: {
            text: "建筑本年用电",
            textStyle: {
              color: "#01ffff",
              fontSize: "20",
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
            type: "category",
            name: "月",
            boundaryGap: true,
            data: this.xYeardata,
            axisLine: {
              lineStyle: {
                color: "#01ffff"
              }
            }
          },
          yAxis: {
            type: "value",
            axisLabel: {
              formatter: "{value} kwh"
            },
            axisLine: {
              lineStyle: {
                color: "#01ffff"
              }
            }
          },
          series: [
            {
              name: "本年用电",
              type: "bar",
              data: this.buildYearData,
              markPoint: {
                data: [
                  { type: "max", name: "最高本年用电" },
                  { type: "min", name: "最低本年用电" }
                ]
              }
            }
          ]
        },
        "3-2-2-1-4": {
          backgroundColor: "",
          tooltip: {
            trigger: "item",
            formatter: "{a} <br/>{b} : {c} ({d}%)"
          },
          title: {
            text: "各层用电占比",
            textStyle: {
              color: "#01ffff",
              fontSize: "20",
              fontWeight: 400
            },
            left: 20,
            top: 10
          },
          legend: {
            orient: "vertical",
            x: "left",
            top: 50,
            left: 20,
            data: this.floorLegend,
            textStyle: {
              color: "#fff"
            }
          },
          series: [
            {
              name: "各层用电占比",
              type: "pie",
              radius: "70%",
              center: ["60%", "65%"],
              data: this.floorData
            }
          ]
        },
        "3-2-2-1-5": {
          backgroundColor: "",
          tooltip: {
            trigger: "item",
            formatter: "{a} <br/>{b} : {c} ({d}%)"
          },
          title: {
            text: "用电组成",
            textStyle: {
              color: "#01ffff",
              fontSize: "20",
              fontWeight: 400
            },
            left: 20,
            top: 10
          },
          legend: {
            orient: "vertical",
            x: "left",
            top: 50,
            left: 20,
            data: this.buildElecLegend,
            textStyle: {
              color: "#fff"
            }
          },
          series: [
            {
              name: "用电组成",
              type: "pie",
              radius: "70%",
              center: ["50%", "65%"],
              data: this.buildElecData
            }
          ]
        }
      };
    }
  },
  mounted() {
    console.log(this.datas);
    $("#elecBuild").css("height", "1400px");
    var self = this;
    var aa = setInterval(function() {
      self.arge = sessionStorage.getItem("arge");
    }, 500);
    var that = this;
    axios({
      url: this.FACTURL.baseURL+"/energy_electricity_overview",
      method: "post",
      data: {
        uid: "b58f6e1d-e0cd-11e8-98ce-00163e10c840",
        check_id: that.arge
      },
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(function(response) {
        console.log(response);
        var data = response.data;
        console.log(data);
        if (data.msg == "success") {
          var datas = data.data;
          console.log(datas);
          that.xDaydata = [];
          that.xMonthdata = [];
          that.xYeardata = [];
          that.buildDayData = [];
          that.buildMonthData = [];
          that.buildYearData = [];
          that.floorData = [];
          that.floorLegend = [];
          that.buildElecLegend = [];
          that.buildElecData = [];
          for (var i = 0; i < datas.history_day_list.length; i++) {
            that.xDaydata.push(datas.history_day_list[i].history_time);
            that.buildDayData.push(datas.history_day_list[i].history_value);
          }
          for (var i = 0; i < datas.history_month_list.length; i++) {
            that.xMonthdata.push(datas.history_month_list[i].history_time);
            that.buildMonthData.push(datas.history_month_list[i].history_value);
          }
          for (var i = 0; i < datas.history_year_list.length; i++) {
            that.xYeardata.push(datas.history_year_list[i].history_time);
            that.buildYearData.push(datas.history_year_list[i].history_value);
          }
          for (var i = 0; i < datas.electricity_ratio1.length; i++) {
            var obj = {};
            obj.value = datas.electricity_ratio1[i].ratio_value;
            obj.name = datas.electricity_ratio1[i].ratio_name;
            that.floorData.push(obj);
            that.floorLegend.push(datas.electricity_ratio1[i].ratio_name);
          }
          for (var i = 0; i < datas.electricity_ratio2.length; i++) {
            var obj = {};
            obj.value = datas.electricity_ratio2[i].ratio_value;
            obj.name = datas.electricity_ratio2[i].ratio_name;
            that.buildElecData.push(obj);
            that.buildElecLegend.push(datas.electricity_ratio2[i].ratio_name);
          }
        }
      })
      .catch(function(error) {
        console.log(error);
        that.$message.error("出错啦～");
      });
  },
  methods: {
    expandTable: function() {
      this.isExpand = !this.isExpand;
      //request table data
    }
  },
  components: {
    charts
  },
  watch: {
    isExpand: {
      handler: function() {
        console.log(this.isExpand);
        if (this.isExpand == true) {
          $("#elecBuild").css("height", "1400px");
        } else {
          $("#elecBuild").css("height", "");
        }
      }
    }
  }
};
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
.charts {
  margin: 20px 0;
  width: 100%;
  height: 260px;
}
</style>

