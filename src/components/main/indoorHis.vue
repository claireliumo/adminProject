<template>
  <div class="indoorhis">
    <div class="indoorhis-title" @click="expandTable">
      <i class="el-icon-plus" v-if="!isExpand"></i>
      <i class="el-icon-minus" v-else></i>
      {{datas.title}}
    </div>
    <div class="indoorhis-content" v-if="isExpand">
      <Select v-model="select" :datas="param" :null-option="false" @change="change"></Select>
      <charts v-if="select=='本日数据'" v-for="(item,key) in indoorHidOpDay" :key="key" :containerId="'charts' + key" :customOption="item"></charts>
      <charts v-if="select=='本月数据'" v-for="(item,key) in indoorHidOpMonth" :key="key" :containerId="'charts' + key" :customOption="item"></charts>
      <charts v-if="select=='本年数据'" v-for="(item,key) in indoorHidOpYear" :key="key" :containerId="'charts' + key" :customOption="item"></charts>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import qs from "qs";
import charts from "./charts";
export default {
  name: "IndoorHis",
  props: {
    datas: Object
  },
  data() {
    return {
      arge: "",
      hours: [],
      days: [],
      months: [],
      hourstemp: [],
      hourswet: [],
      hoursvoc: [],
      hourspm: [],
      daystemphigh: [],
      daystemplow: [],
      dayswet: [],
      daysvoc: [],
      dayspm: [],
      monthstemphigh: [],
      monthstemplow: [],
      monthswet: [],
      monthsvoc: [],
      monthspm: [],
      select: "本日数据",
      param: ["本日数据", "本月数据", "本年数据"],
      result: [],
      isExpand: true
    };
  },
  methods: {
    expandTable() {
      this.isExpand = !this.isExpand;
    },
    change(data) {
      console.log("changeData:", data);
      if (data.key == "本日数据") {
        this.getDay();
      }
      if (data.key == "本月数据") {
        this.getMonth();
      }
      if (data.key == "本年数据") {
        this.getYear();
      }
    },
    randomdata(max, min, des, num) {
      var arr = [];
      for (var i = 0; i < num; i++) {
        arr.push(Number((Math.random() * (max - min) + min).toFixed(des)));
      }
      return arr;
    },
    getDay() {
      var that = this;
      axios({
        url: this.FACTURL.baseURL+"/env_indoor_history",
        method: "post",
        data: {
          uid: "b58f6e1d-e0cd-11e8-98ce-00163e10c840",
          position_id: that.arge,
          data_type: "day"
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
            that.hours = [];
            that.hourstemp = [];
            that.hourswet = [];
            that.hoursvoc = [];
            that.hourspm = [];
            for (var i = 0; i < datas.data_list.length; i++) {
              that.hours.push(datas.data_list[i].data_time);
              that.hourstemp.push(datas.data_list[i].temperature_high);
              that.hourswet.push(datas.data_list[i].humidity);
              that.hoursvoc.push(datas.data_list[i].voc);
              that.hourspm.push(datas.data_list[i]["pm2.5"]);
            }
          }
        })
        .catch(function(error) {
          console.log(error);
          that.$message.error("出错啦～");
        });
    },
    getMonth() {
      var that = this;
      axios({
        url: this.FACTURL.baseURL+"/env_indoor_history",
        method: "post",
        data: {
          uid: "b58f6e1d-e0cd-11e8-98ce-00163e10c840",
          position_id: that.arge,
          data_type: "month"
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
            that.days = [];
            that.daystemphigh = [];
            that.daystemplow = [];
            that.dayswet = [];
            that.daysvoc = [];
            that.dayspm = [];
            for (var i = 0; i < datas.data_list.length; i++) {
              that.days.push(datas.data_list[i].data_time);
              that.daystemphigh.push(datas.data_list[i].temperature_high);
              that.daystemplow.push(datas.data_list[i].temperature_low);
              that.dayswet.push(datas.data_list[i].humidity);
              that.daysvoc.push(datas.data_list[i].voc);
              that.dayspm.push(datas.data_list[i]["pm2.5"]);
            }
          }
        })
        .catch(function(error) {
          console.log(error);
          that.$message.error("出错啦～");
        });
    },
    getYear() {
      var that = this;
      axios({
        url: this.FACTURL.baseURL+"/env_indoor_history",
        method: "post",
        data: {
          uid: "b58f6e1d-e0cd-11e8-98ce-00163e10c840",
          position_id: that.arge,
          data_type: "year"
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
            that.months = [];
            that.monthstemphigh = [];
            that.monthstemplow = [];
            that.monthswet = [];
            that.monthsvoc = [];
            that.monthspm = [];
            for (var i = 0; i < datas.data_list.length; i++) {
              that.months.push(datas.data_list[i].data_time);
              that.monthstemphigh.push(datas.data_list[i].temperature_high);
              that.monthstemplow.push(datas.data_list[i].temperature_low);
              that.monthswet.push(datas.data_list[i].humidity);
              that.monthsvoc.push(datas.data_list[i].voc);
              that.monthspm.push(datas.data_list[i]["pm2.5"]);
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
  mounted() {
    var self = this;
    var aa = setInterval(function() {
      self.arge = sessionStorage.getItem("arge");
    }, 500);
    this.getDay();
  },
  computed: {
    indoorHidOpDay: function() {
      return {
        "2-1-2-1-d": {
          backgroundColor: "",
          title: {
            text: "本日温度",
            textStyle: {
              color: "#01ffff",
              fontSize: "20",
              fontWeight: 400
            },
            left: 20,
            top: 10
          },
          xAxis: {
            type: "category",
            name: "时",
            boundaryGap: false,
            data: this.hours,
            axisLine: {
              lineStyle: {
                color: "#01ffff"
              }
            }
          },
          yAxis: {
            type: "value",
            axisLabel: {
              formatter: "{value} °C"
            },
            axisLine: {
              lineStyle: {
                color: "#01ffff"
              }
            }
          },
          grid: {
            top: 80,
            bottom:40
          },
          series: [
            {
              name: "温度",
              type: "line",
              data: this.hourstemp,
              markPoint: {
                data: [
                  { type: "max", name: "最高温度" },
                  { type: "min", name: "最低温度" }
                ]
              }
            }
          ]
        },
        "2-1-2-2-d": {
          grid: {
            top: 80,
            bottom:40
          },
          backgroundColor: "",
          title: {
            text: "本日湿度",
            textStyle: {
              color: "#01ffff",
              fontSize: "20",
              fontWeight: 400
            },
            left: 20,
            top: 10
          },
          xAxis: {
            type: "category",
            name: "时",
            boundaryGap: false,
            data: this.hours,
            axisLine: {
              lineStyle: {
                color: "#01ffff"
              }
            }
          },
          yAxis: {
            type: "value",
            axisLabel: {
              formatter: "{value} %"
            },
            axisLine: {
              lineStyle: {
                color: "#01ffff"
              }
            }
          },
          series: [
            {
              name: "湿度",
              type: "line",
              data: this.hourswet,
              markPoint: {
                data: [
                  { type: "max", name: "最高湿度" },
                  { type: "min", name: "最低温度" }
                ]
              },
              itemStyle: { normal: { areaStyle: { type: "default" } } }
            }
          ]
        },
        "2-1-2-3-d": {
          grid: {
            top: 80,
            bottom:40
          },
          backgroundColor: "",
          title: {
            text: "本日VOC",
            textStyle: {
              color: "#01ffff",
              fontSize: "20",
              fontWeight: 400
            },
            left: 20,
            top: 10
          },
          xAxis: {
            type: "category",
            name: "时",
            boundaryGap: false,
            data: this.hours,
            axisLine: {
              lineStyle: {
                color: "#01ffff"
              }
            }
          },
          yAxis: {
            type: "value",
            axisLabel: {
              formatter: "{value}"
            },
            axisLine: {
              lineStyle: {
                color: "#01ffff"
              }
            }
          },
          series: [
            {
              name: "VOC",
              type: "scatter",
              data: this.hoursvoc,
              markPoint: {
                data: [
                  { type: "max", name: "最大VOC" },
                  { type: "min", name: "最小VOC" }
                ]
              }
            }
          ]
        },
        "2-1-2-4-d": {
          grid: {
            top: 80,
            bottom:40
          },
          backgroundColor: "",
          title: {
            text: "本日PM2.5",
            textStyle: {
              color: "#01ffff",
              fontSize: "20",
              fontWeight: 400
            },
            left: 20,
            top: 10
          },
          xAxis: {
            type: "category",
            name: "时",
            boundaryGap: true,
            data: this.hours,
            axisLine: {
              lineStyle: {
                color: "#01ffff"
              }
            }
          },
          yAxis: {
            type: "value",
            axisLabel: {
              formatter: "{value}"
            },
            axisLine: {
              lineStyle: {
                color: "#01ffff"
              }
            }
          },
          series: [
            {
              name: "PM2.5",
              type: "bar",
              data: this.hourspm,
              markPoint: {
                data: [
                  { type: "max", name: "最高PM2.5" },
                  { type: "min", name: "最低PM2.5" }
                ]
              }
            }
          ]
        }
      };
    },
    indoorHidOpMonth: function() {
      return {
        "2-1-2-1-m": {
          grid: {
            top: 80,
            bottom:40
          },
          backgroundColor: "",
          title: {
            text: "本月温度",
            textStyle: {
              color: "#01ffff",
              fontSize: "20",
              fontWeight: 400
            },
            left: 20,
            top: 10
          },
          xAxis: {
            type: "category",
            name: "日",
            boundaryGap: false,
            data: this.days,
            axisLine: {
              lineStyle: {
                color: "#01ffff"
              }
            }
          },
          yAxis: {
            type: "value",
            axisLabel: {
              formatter: "{value} °C"
            },
            axisLine: {
              lineStyle: {
                color: "#01ffff"
              }
            }
          },
          legend: {
            data: ["最高气温", "最低气温"],
            textStyle: {
              color: "white"
            }
          },
          series: [
            {
              name: "最高气温",
              type: "line",
              data: this.daystemphigh,
              markPoint: {
                data: [
                  { type: "max", name: "最高温度" },
                  { type: "min", name: "最低温度" }
                ]
              }
            },
            {
              name: "最低气温",
              type: "line",
              data: this.daystemplow,
              markPoint: {
                data: [
                  { type: "max", name: "最高温度" },
                  { type: "min", name: "最低温度" }
                ]
              }
            }
          ]
        },
        "2-1-2-2-m": {
          grid: {
            top: 80,
            bottom:40
          },
          backgroundColor: "",
          title: {
            text: "本月湿度",
            textStyle: {
              color: "#01ffff",
              fontSize: "20",
              fontWeight: 400
            },
            left: 20,
            top: 10
          },
          xAxis: {
            type: "category",
            name: "日",
            boundaryGap: false,
            data: this.days,
            axisLine: {
              lineStyle: {
                color: "#01ffff"
              }
            }
          },
          yAxis: {
            type: "value",
            axisLabel: {
              formatter: "{value} %"
            },
            axisLine: {
              lineStyle: {
                color: "#01ffff"
              }
            }
          },
          series: [
            {
              name: "湿度",
              type: "line",
              data: this.dayswet,
              markPoint: {
                data: [
                  { type: "max", name: "最高湿度" },
                  { type: "min", name: "最低温度" }
                ]
              },
              itemStyle: { normal: { areaStyle: { type: "default" } } }
            }
          ]
        },
        "2-1-2-3-m": {
          grid: {
            top: 80,
            bottom:40
          },
          backgroundColor: "",
          title: {
            text: "本月VOC",
            textStyle: {
              color: "#01ffff",
              fontSize: "20",
              fontWeight: 400
            },
            left: 20,
            top: 10
          },
          xAxis: {
            type: "category",
            name: "日",
            boundaryGap: false,
            data: this.days,
            axisLine: {
              lineStyle: {
                color: "#01ffff"
              }
            }
          },
          yAxis: {
            type: "value",
            axisLabel: {
              formatter: "{value}"
            },
            axisLine: {
              lineStyle: {
                color: "#01ffff"
              }
            }
          },
          series: [
            {
              name: "VOC",
              type: "scatter",
              data: this.daysvoc,
              markPoint: {
                data: [
                  { type: "max", name: "最大VOC" },
                  { type: "min", name: "最小VOC" }
                ]
              }
            }
          ]
        },
        "2-1-2-4-m": {
          grid: {
            top: 80,
            bottom:40
          },
          backgroundColor: "",
          title: {
            text: "本月PM2.5",
            textStyle: {
              color: "#01ffff",
              fontSize: "20",
              fontWeight: 400
            },
            left: 20,
            top: 10
          },
          xAxis: {
            type: "category",
            name: "日",
            boundaryGap: true,
            data: this.days,
            axisLine: {
              lineStyle: {
                color: "#01ffff"
              }
            }
          },
          yAxis: {
            type: "value",
            axisLabel: {
              formatter: "{value}"
            },
            axisLine: {
              lineStyle: {
                color: "#01ffff"
              }
            }
          },
          series: [
            {
              name: "PM2.5",
              type: "bar",
              data: this.dayspm,
              markPoint: {
                data: [
                  { type: "max", name: "最高PM2.5" },
                  { type: "min", name: "最低PM2.5" }
                ]
              }
            }
          ]
        }
      };
    },
    indoorHidOpYear: function() {
      return {
        "2-1-2-1-y": {
          grid: {
            top: 80,
            bottom:40
          },
          backgroundColor: "",
          title: {
            text: "本年温度",
            textStyle: {
              color: "#01ffff",
              fontSize: "20",
              fontWeight: 400
            },
            left: 20,
            top: 10
          },
          xAxis: {
            type: "category",
            name: "月",
            boundaryGap: false,
            data: this.months,
            axisLine: {
              lineStyle: {
                color: "#01ffff"
              }
            }
          },
          yAxis: {
            type: "value",
            axisLabel: {
              formatter: "{value} °C"
            },
            axisLine: {
              lineStyle: {
                color: "#01ffff"
              }
            }
          },
          legend: {
            data: ["最高气温", "最低气温"],
            textStyle: {
              color: "white"
            }
          },
          series: [
            {
              name: "最高气温",
              type: "line",
              data: this.monthstemphigh,
              markPoint: {
                data: [
                  { type: "max", name: "最高温度" },
                  { type: "min", name: "最低温度" }
                ]
              }
            },
            {
              name: "最低气温",
              type: "line",
              data: this.monthstemplow,
              markPoint: {
                data: [
                  { type: "max", name: "最高温度" },
                  { type: "min", name: "最低温度" }
                ]
              }
            }
          ]
        },
        "2-1-2-2-y": {
          grid: {
            top: 80,
            bottom:40
          },
          backgroundColor: "",
          title: {
            text: "本年湿度",
            textStyle: {
              color: "#01ffff",
              fontSize: "20",
              fontWeight: 400
            },
            left: 20,
            top: 10
          },
          xAxis: {
            type: "category",
            name: "月",
            boundaryGap: false,
            data: this.months,
            axisLine: {
              lineStyle: {
                color: "#01ffff"
              }
            }
          },
          yAxis: {
            type: "value",
            axisLabel: {
              formatter: "{value} %"
            },
            axisLine: {
              lineStyle: {
                color: "#01ffff"
              }
            }
          },
          series: [
            {
              name: "湿度",
              type: "line",
              data: this.monthswet,
              markPoint: {
                data: [
                  { type: "max", name: "最高湿度" },
                  { type: "min", name: "最低温度" }
                ]
              },
              itemStyle: { normal: { areaStyle: { type: "default" } } }
            }
          ]
        },
        "2-1-2-3-y": {
          grid: {
            top: 80,
            bottom:40
          },
          backgroundColor: "",
          title: {
            text: "本年VOC",
            textStyle: {
              color: "#01ffff",
              fontSize: "20",
              fontWeight: 400
            },
            left: 20,
            top: 10
          },
          xAxis: {
            type: "category",
            name: "月",
            boundaryGap: false,
            data: this.months,
            axisLine: {
              lineStyle: {
                color: "#01ffff"
              }
            }
          },
          yAxis: {
            type: "value",
            axisLabel: {
              formatter: "{value}"
            },
            axisLine: {
              lineStyle: {
                color: "#01ffff"
              }
            }
          },
          series: [
            {
              name: "VOC",
              type: "scatter",
              data: this.monthsvoc,
              markPoint: {
                data: [
                  { type: "max", name: "最大VOC" },
                  { type: "min", name: "最小VOC" }
                ]
              }
            }
          ]
        },
        "2-1-2-4-y": {
          grid: {
            top: 80,
            bottom:40
          },
          backgroundColor: "",
          title: {
            text: "本年PM2.5",
            textStyle: {
              color: "#01ffff",
              fontSize: "20",
              fontWeight: 400
            },
            left: 20,
            top: 10
          },
          xAxis: {
            type: "category",
            name: "月",
            boundaryGap: true,
            data: this.months,
            axisLine: {
              lineStyle: {
                color: "#01ffff"
              }
            }
          },
          yAxis: {
            type: "value",
            axisLabel: {
              formatter: "{value}"
            },
            axisLine: {
              lineStyle: {
                color: "#01ffff"
              }
            }
          },
          series: [
            {
              name: "PM2.5",
              type: "bar",
              data: this.monthspm,
              markPoint: {
                data: [
                  { type: "max", name: "最高PM2.5" },
                  { type: "min", name: "最低PM2.5" }
                ]
              }
            }
          ]
        }
      };
    }
  },
  watch: {
    arge: {
      handler: function() {
        var self = this;
        // self.hourstemp = this.randomdata(24,20,1,24);
        // self.hourswet = this.randomdata(60,40,0,24);
        // self.hoursvoc = this.randomdata(3,0,1,24);
        // self.hourspm = this.randomdata(10,1,1,24);
        // self.daystemphigh =this.randomdata(24,20,1,30);
        // self.daystemplow = this.randomdata(24,20,1,30);
        // self.dayswet = this.randomdata(60,40,0,30);;
        // self.daysvoc = this.randomdata(3,0,1,30);;
        // self.dayspm = this.randomdata(10,1,1,30);
        // self.monthstemphigh = this.randomdata(24,20,1,12);;
        // self.monthstemplow = this.randomdata(24,20,1,12);;
        // self.monthswet = this.randomdata(60,40,0,12);;
        // self.monthsvoc = this.randomdata(3,0,1,12);;
        // self.monthspm = this.randomdata(10,1,1,12);
        self.select = "本日数据";
        self.getDay();
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
    height: 240px;
    .h-select-input-border .h-select-show {
      background-color: black;
      width: 50%;
      margin-left: 30%;
    }
  }
}
</style>

