<template>
  <div class="indoorhis" id="elecFloor">
    <div class="indoorhis-title" @click="expandTable">
      <i class="el-icon-plus" v-if="!isExpand"></i>
      <i class="el-icon-minus" v-else></i>
      {{datas.title}}
    </div>
    <div class="indoorhis-floor" v-show="isExpand">
      {{argetrans}}
    </div>
    <div class="indoorhis-content charts" v-show="isExpand">
      <!-- <div class=""> -->
        <charts v-for="(item,key) in elecFloor" :containerId="'charts' + key" :key="key" :customOption="item"></charts>
      <!-- </div> -->
    </div>
  </div>
</template>
<script>
import axios from "axios";
import qs from "qs";
import charts from "./charts";
export default {
  name: "floorElectricity",
  props: {
    datas: Object
  },
  data() {
    return {
      change: true,
      isExpand: true,
      arge: "",
      argetrans: "",
      xDaydata: [],
      xMonthdata: [],
      xYeardata: [],
      floorDayData: [],
      floorMonthData: [],
      floorYearData: [],
      floorElecLegend: [],
      floorElecData: []
    };
  },
  computed: {
    elecFloor: function() {
      return {
        "3-2-2-2-1": {
          backgroundColor: "",
          title: {
            text: "本日用电",
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
              data: this.floorDayData,
              markPoint: {
                data: [
                  { type: "max", name: "最高用电量" },
                  { type: "min", name: "最低用电量" }
                ]
              }
            }
          ]
        },
        "3-2-2-2-2": {
          backgroundColor: "",
          title: {
            text: "本月用电",
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
              data: this.floorMonthData,
              markPoint: {
                data: [
                  { type: "max", name: "最高本月用电" },
                  { type: "min", name: "最低本月用电" }
                ]
              }
            }
          ]
        },
        "3-2-2-2-3": {
          backgroundColor: "",
          title: {
            text: "本年用电",
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
              data: this.floorYearData,
              markPoint: {
                data: [
                  { type: "max", name: "最高本年用电" },
                  { type: "min", name: "最低本年用电" }
                ]
              }
            }
          ]
        },
        "3-2-2-2-4": {
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
            data: this.floorElecLegend,
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
              data: this.floorElecData
            }
          ]
        }
      };
    }
  },
  mounted() {
    console.log(this.datas);
    $("#elecFloor").css("height", "auto");
    var self = this;
    var aa = setInterval(function() {
      self.arge = sessionStorage.getItem("arge");
      // if (self.arge == "floor_a1f") {
      //   self.argetrans = "a建筑1楼层";
      // }
      // if (self.arge == "floor_a2f") {
      //   self.argetrans = "a建筑2楼层";
      // }
      // if (self.arge == "floor_a3f") {
      //   self.argetrans = "a建筑3楼层";
      // }
      // if (self.arge == "floor_a4f") {
      //   self.argetrans = "a建筑4楼层";
      // }
      // if (self.arge == "floor_a5f") {
      //   self.argetrans = "a建筑5楼层";
      // }
      // if (!self.arge) {
      //   self.argetrans = "a建筑";
      // }
    }, 500);
    this.reload();
  },
  methods: {
    expandTable: function() {
      this.isExpand = !this.isExpand;
      //request table data
    },
    randomdata(max, min, des, num) {
      var arr = [];
      for (var i = 0; i < num; i++) {
        arr.push(Number((Math.random() * (max - min) + min).toFixed(des)));
      }
      return arr;
    },
    reload() {
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
            that.floorDayData = [];
            that.floorMonthData = [];
            that.floorYearData = [];
            that.floorElecData = [];
            that.floorElecLegend = [];
            that.argetrans = datas.check_name;
            for (var i = 0; i < datas.history_day_list.length; i++) {
              that.xDaydata.push(datas.history_day_list[i].history_time);
              that.floorDayData.push(datas.history_day_list[i].history_value);
            }
            for (var i = 0; i < datas.history_month_list.length; i++) {
              that.xMonthdata.push(datas.history_month_list[i].history_time);
              that.floorMonthData.push(
                datas.history_month_list[i].history_value
              );
            }
            for (var i = 0; i < datas.history_year_list.length; i++) {
              that.xYeardata.push(datas.history_year_list[i].history_time);
              that.floorYearData.push(datas.history_year_list[i].history_value);
            }
            for (var i = 0; i < datas.electricity_ratio2.length; i++) {
              var obj = {};
              obj.value = datas.electricity_ratio2[i].ratio_value;
              obj.name = datas.electricity_ratio2[i].ratio_name;
              that.floorElecData.push(obj);
              that.floorElecLegend.push(datas.electricity_ratio2[i].ratio_name);
            }
          }
        })
        .catch(function(error) {
          console.log(error);
          that.$message.error("出错啦～");
        });
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
          $("#elecFloor").css("height", "auto");
        } else {
          $("#elecFloor").css("height", "");
        }
      }
    },
    arge: {
      handler: function() {
        var self = this;
        // self.floorDayData = self.randomdata(90, 30, 1, 24);
        // (self.floorMonthData = self.randomdata(2100, 1500, 0, 30)),
        //   (self.floorYearData = self.randomdata(25200, 18000, 0, 12));
        // self.floorElecData = [
        //   { value: self.randomdata(300, 100, 0, 1), name: "照明" },
        //   { value: self.randomdata(300, 100, 0, 1), name: "空调" },
        //   { value: self.randomdata(300, 100, 0, 1), name: "其他" }
        // ];
        // self.change = !self.change;
        self.reload();
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
  &-floor {
    color: #01ffff;
    font-size: 24px;
    text-align: left;
    margin: 20px 0 -10px 5px;
  }
  &-content {
        margin: 20px 0;
        width: 100%;
    }
}
.charts {
  margin: 20px 0;
  width: 100%;
  height: 240px;
}
</style>

