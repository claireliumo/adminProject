<template>
  <div class="indoorhis">
    <div class="indoorhis-title" @click="expandTable">
      <i class="el-icon-plus" v-if="!isExpand"></i>
      <i class="el-icon-minus" v-else></i>
      {{datas.title}}
    </div>
    <div class="indoorhis-content" v-if="isExpand">
      <Select v-model="select" :datas="param" :null-option="false" @change="change"></Select>
      <charts v-if="select=='本日数据'" v-for="(item,key) in outdoorHidOpDay" :key="key" :containerId="'charts' + key" :customOption="item"></charts>
      <charts v-if="select=='本月数据'" v-for="(item,key) in outdoorHidOpMonth" :key="key" :containerId="'charts' + key" :customOption="item"></charts>
      <charts v-if="select=='本年数据'" v-for="(item,key) in outdoorHidOpYear" :key="key" :containerId="'charts' + key" :customOption="item"></charts>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import qs from "qs";
import charts from "./charts";
import { labeledStatement } from "babel-types";
export default {
  name: "OutdoorHis",
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
      hourswind: [],
      hourspre: [],
      hoursair: [],
      hourspm: [],
      daystemphigh: [],
      daystemplow: [],
      dayswet: [],
      dayswind: [],
      dayspre:[],
      daysair:[],
      dayspm: [],
      monthstemphigh: [],
      monthstemplow: [],
      monthswet: [],
      monthswind: [],
      monthspre: [],
      monthsair:[],
      monthspm:[],
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
    getDay() {
      var that = this;
      axios({
        url: this.FACTURL.baseURL+"/env_outdoor_history",
        method: "post",
        data: {
          uid: "b58f6e1d-e0cd-11e8-98ce-00163e10c840",
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
            that.hourswind = [];
            that.hourspre = [];
            that.hoursair = [];
            that.hourspm = [];
            for (var i = 0; i < datas.data_list.length; i++) {
              that.hours.push(datas.data_list[i].data_time);
              that.hourstemp.push(datas.data_list[i].temperature_high);
              that.hourswet.push(datas.data_list[i].humidity);
              that.hourswind.push(datas.data_list[i].wind_speed);
              that.hourspre.push(datas.data_list[i].precipitation);
              that.hoursair.push(datas.data_list[i].air_pressure);
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
        url: this.FACTURL.baseURL+"/env_outdoor_history",
        method: "post",
        data: {
          uid: "b58f6e1d-e0cd-11e8-98ce-00163e10c840",
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
            that.dayswind = [];
            that.dayspre = [];
            that.daysair = [];
            that.dayspm = [];
            for (var i = 0; i < datas.data_list.length; i++) {
              that.days.push(datas.data_list[i].data_time);
              that.daystemphigh.push(datas.data_list[i].temperature_high);
              that.daystemplow.push(datas.data_list[i].temperature_low);
              that.dayswet.push(datas.data_list[i].humidity);
              that.dayswind.push(datas.data_list[i].wind_speed);
              that.dayspre.push(datas.data_list[i].precipitation);
              that.daysair.push(datas.data_list[i].air_pressure);
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
        url: this.FACTURL.baseURL+"/env_outdoor_history",
        method: "post",
        data: {
          uid: "b58f6e1d-e0cd-11e8-98ce-00163e10c840",
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
            that.monthswind = [];
            that.monthspre = [];
            that.monthsair = [];
            that.monthspm = [];
            for (var i = 0; i < datas.data_list.length; i++) {
              that.months.push(datas.data_list[i].data_time);
              that.monthstemphigh.push(datas.data_list[i].temperature_high);
              that.monthstemplow.push(datas.data_list[i].temperature_low);
              that.monthswet.push(datas.data_list[i].humidity);
              that.monthswind.push(datas.data_list[i].wind_speed);
              that.monthspre.push(datas.data_list[i].precipitation);
              that.monthsair.push(datas.data_list[i].air_pressure);
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
    outdoorHidOpDay: function() {
      return {
        "2-2-2-1-d": {
          grid: {
            top: 80,
            bottom:40
          },
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
        "2-2-2-2-d": {
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
        "2-2-2-3-d": {
          grid: {
            top: 80,
            bottom:40
          },
          backgroundColor: "",
          title: {
            text: "本日风速",
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
              formatter: "{value}m/s"
            },
            axisLine: {
              lineStyle: {
                color: "#01ffff"
              }
            }
          },
          series: [
            {
              name: "风速",
              type: "scatter",
              data: this.hourswind,
              markPoint: {
                data: [
                  { type: "max", name: "最大风速" },
                  { type: "min", name: "最小风速" }
                ]
              }
            }
          ]
        },
        "2-2-2-4-d": {
          grid: {
            top: 80,
            bottom:40
          },
          backgroundColor: "",
          title: {
            text: "本日降水量",
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
              formatter: "{value}mm"
            },
            axisLine: {
              lineStyle: {
                color: "#01ffff"
              }
            }
          },
          series: [
            {
              name: "降水量",
              type: "line",
              data: this.hourspre,
              markPoint: {
                data: [
                  { type: "max", name: "最高降水量" },
                  { type: "min", name: "最低降水量" }
                ]
              },
              itemStyle: { normal: { areaStyle: { type: "default" } } }
            }
          ]
        },
        "2-2-2-5-d": {
          grid: {
            top: 80,
            bottom:40
          },
          backgroundColor: "",
          title: {
            text: "本日大气压",
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
              formatter: "{value}kPa"
            },
            axisLine: {
              lineStyle: {
                color: "#01ffff"
              }
            }
          },
          series: [
            {
              name: "大气压",
              type: "line",
              data: this.hoursair,
              markPoint: {
                data: [
                  { type: "max", name: "最高大气压" },
                  { type: "min", name: "最低大气压" }
                ]
              }
            }
          ]
        },
        "2-2-2-6-d": {
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
    outdoorHidOpMonth: function() {
      return {
        "2-2-2-1-m": {
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
        "2-2-2-2-m": {
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
        "2-2-2-3-m": {
          grid: {
            top: 80,
            bottom:40
          },
          backgroundColor: "",
          title: {
            text: "本月风速",
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
              formatter: "{value}m/s"
            },
            axisLine: {
              lineStyle: {
                color: "#01ffff"
              }
            }
          },
          series: [
            {
              name: "风速",
              type: "scatter",
              data: this.dayswind,
              markPoint: {
                data: [
                  { type: "max", name: "最大风速" },
                  { type: "min", name: "最小风速" }
                ]
              }
            }
          ]
        },
        "2-2-2-4-m": {
          grid: {
            top: 80,
            bottom:40
          },
          backgroundColor: "",
          title: {
            text: "本月降水量",
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
              formatter: "{value}mm"
            },
            axisLine: {
              lineStyle: {
                color: "#01ffff"
              }
            }
          },
          series: [
            {
              name: "降水量",
              type: "line",
              data: this.dayspre,
              markPoint: {
                data: [
                  { type: "max", name: "最高降水量" },
                  { type: "min", name: "最低降水量" }
                ]
              },
              itemStyle: { normal: { areaStyle: { type: "default" } } }
            }
          ]
        },
        "2-2-2-5-m": {
          grid: {
            top: 80,
            bottom:40
          },
          backgroundColor: "",
          title: {
            text: "本月大气压",
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
              formatter: "{value}kPa"
            },
            axisLine: {
              lineStyle: {
                color: "#01ffff"
              }
            }
          },
          series: [
            {
              name: "大气压",
              type: "line",
              data: this.daysair,
              markPoint: {
                data: [
                  { type: "max", name: "最高大气压" },
                  { type: "min", name: "最低大气压" }
                ]
              }
            }
          ]
        },
        "2-2-2-6-m": {
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
    outdoorHidOpYear: function() {
      return {
        "2-2-2-1-y": {
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
        "2-2-2-2-y": {
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
        "2-2-2-3-y": {
          grid: {
            top: 80,
            bottom:40
          },
          backgroundColor: "",
          title: {
            text: "本年风速",
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
              formatter: "{value} m/s"
            },
            axisLine: {
              lineStyle: {
                color: "#01ffff"
              }
            }
          },
          series: [
            {
              name: "风速",
              type: "scatter",
              data: this.monthswind,
              markPoint: {
                data: [
                  { type: "max", name: "最大风速" },
                  { type: "min", name: "最小风速" }
                ]
              }
            }
          ]
        },
        "2-2-2-4-y": {
          grid: {
            top: 80,
            bottom:40
          },
          backgroundColor: "",
          title: {
            text: "本年降水量",
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
              formatter: "{value}mm"
            },
            axisLine: {
              lineStyle: {
                color: "#01ffff"
              }
            }
          },
          series: [
            {
              name: "降水量",
              type: "line",
              data: this.monthspre,
              markPoint: {
                data: [
                  { type: "max", name: "最高降水量" },
                  { type: "min", name: "最低降水量" }
                ]
              },
              itemStyle: { normal: { areaStyle: { type: "default" } } }
            }
          ]
        },
        "2-2-2-5-y": {
          grid: {
            top: 80,
            bottom:40
          },
          backgroundColor: "",
          title: {
            text: "本年大气压",
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
              formatter: "{value}kPa"
            },
            axisLine: {
              lineStyle: {
                color: "#01ffff"
              }
            }
          },
          series: [
            {
              name: "大气压",
              type: "line",
              data: this.monthsair,
              markPoint: {
                data: [
                  { type: "max", name: "最高大气压" },
                  { type: "min", name: "最低大气压" }
                ]
              }
            }
          ]
        },
        "2-2-2-6-y": {
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

