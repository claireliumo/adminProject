<template>
  <div class="indoorhis" id="elecAir">
    <div v-for="detail in elecArea">
      <div class="indoorhis-title">
        {{detail.name}}
      </div>
      <!-- <div class="indoorhis-title" @click="expandTable(detail)">
            <i class="el-icon-plus" v-if="!(detail.isExpand)"></i>
            <i class="el-icon-minus" v-else></i>
                {{detail.name}}
        </div> -->
      <div class="indoorhis-content charts" v-if="detail.isExpand">
        <div v-for="(item,key) in detail.content" style="height:200px;">
          <charts :key="key" :containerId="'charts' + key" :customOption="item"></charts>
        </div>
      </div>
      <br/>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import qs from "qs";
import charts from "./charts";
import { labeledStatement } from "babel-types";
export default {
  name: "areaElectricity",
  props: {
    datas: Array
  },
  data() {
    return {
      arge: "",
      isExpand: true,
      xDaydata: [],
      xMonthdata: [],
      xYeardata: [],
      areaDayData: [],
      areaMonthData: [],
      areaYearData: [],
      buildData: [],
      buildLegend: []
    };
  },
  mounted() {
    var self = this;
    var aa = setInterval(function() {
      self.arge = sessionStorage.getItem("arge");
    }, 500);
    console.log(this.datas);
    $("#elecAir").css("height", "auto");
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
          that.areaDayData = [];
          that.areaMonthData = [];
          that.areaYearData = [];
          that.buildData = [];
          that.buildLegend = [];
          for (var i = 0; i < datas.history_day_list.length; i++) {
            that.xDaydata.push(datas.history_day_list[i].history_time);
            that.areaDayData.push(datas.history_day_list[i].history_value);
          }
          for (var i = 0; i < datas.history_month_list.length; i++) {
            that.xMonthdata.push(datas.history_month_list[i].history_time);
            that.areaMonthData.push(datas.history_month_list[i].history_value);
          }
          for (var i = 0; i < datas.history_year_list.length; i++) {
            that.xYeardata.push(datas.history_year_list[i].history_time);
            that.areaYearData.push(datas.history_year_list[i].history_value);
          }
          for (var i = 0; i < datas.electricity_ratio1.length; i++) {
            var obj = {};
            obj.value = datas.electricity_ratio1[i].ratio_value;
            obj.name = datas.electricity_ratio1[i].ratio_name;
            that.buildData.push(obj);
            that.buildLegend.push(datas.electricity_ratio1[i].ratio_name);
          }
        }
      })
      .catch(function(error) {
        console.log(error);
        that.$message.error("出错啦～");
      });
  },
  computed: {
    elecArea: function() {
      return [
        {
          isExpand: true,
          name: "园区本日用电",
          content: {
            "3-2-1-1": {
              backgroundColor: "",
              title: {
                text: "",
                textStyle: {
                  color: "#01ffff",
                  fontSize: "20",
                  fontWeight: 400
                },
                left: 20
              },
              grid: {
                top: 40,
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
                  data: this.areaDayData,
                  markPoint: {
                    data: [
                      { type: "max", name: "最高用电量" },
                      { type: "min", name: "最低用电量" }
                    ]
                  }
                }
              ]
            }
          }
        },
        {
          isExpand: true,
          name: "园区本月用电",
          content: {
            "3-2-1-2": {
              backgroundColor: "",
              title: {
                text: "",
                textStyle: {
                  color: "#01ffff",
                  fontSize: "20",
                  fontWeight: 400
                },
                left: 20
              },
              grid: {
                top: 40,
                left: 80,
                bottom:30
              },
              xAxis: {
                type: "category",
                name: "日",
                boundaryGap: false,
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
                  type: "line",
                  data: this.areaMonthData,
                  markPoint: {
                    data: [
                      { type: "max", name: "最高用电量" },
                      { type: "min", name: "最低用电量" }
                    ]
                  }
                }
              ]
            }
          }
        },
        {
          isExpand: true,
          name: "园区本年用电",
          content: {
            "3-2-1-3": {
              backgroundColor: "",
              title: {
                text: "",
                textStyle: {
                  color: "#01ffff",
                  fontSize: "20",
                  fontWeight: 400
                },
                left: 20
              },
              grid: {
                top: 40,
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
                  data: this.areaYearData,
                  markPoint: {
                    data: [
                      { type: "max", name: "最高本年用电" },
                      { type: "min", name: "最低本年用电" }
                    ]
                  }
                }
              ]
            }
          }
        },
        {
          isExpand: true,
          name: "各建筑用电占比（本年）",
          content: {
            "3-2-1-4": {
              backgroundColor: "",
              tooltip: {
                trigger: "item",
                formatter: "{a} <br/>{b} : {c} ({d}%)"
              },
              title: {
                text: "",
                textStyle: {
                  color: "#01ffff",
                  fontSize: "20",
                  fontWeight: 400
                },
                left: 20
              },
              legend: {
                orient: "vertical",
                x: "left",
                top: 50,
                left: 20,
                data: this.buildLegend,
                textStyle: {
                  color: "#fff"
                }
              },
              series: [
                {
                  name: "各建筑用电占比",
                  type: "pie",
                  radius: "80%",
                  center: ["60%", "60%"],
                  data: this.buildData
                }
              ]
            }
          }
        }
      ];
    }
  },
  methods: {
    expandTable: function(detail) {
      for (var i = 0; i < this.elecArea.length; i++) {
        if (this.elecArea[i].name == detail.name) {
          this.elecArea[i].isExpand = !this.elecArea[i].isExpand;
        }
      }
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
          $("#elecAir").css("height", "auto");
        } else {
          $("#elecAir").css("height", "");
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
    margin-left: 10px;
  }
  &-content {
    margin: 0 0 0 10px;
    width: 100%;
  }
}
.charts {
  margin: 0;
  width: 100%;
  height: 200px;
}
</style>

