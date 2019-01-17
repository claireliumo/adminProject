<template>
  <div class="indoorhis" id="elecAir">
    <div class="indoorhis-title" style="margin-bottom:15px;">
      {{argetrans}}
    </div>
    <div v-for="detail in elecAir">
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
export default {
  name: "areaElectricity",
  props: {
    datas: Array
  },
  data() {
    return {
      arge: "",
      argetrans: "",
      isExpand: true,
      xDaydata: [],
      xMonthdata: [],
      xYeardata: [],
      areaDayData: [],
      areaMonthData: [],
      areaYearData: []
    };
  },
  mounted() {
    console.log(this.datas);
    $("#elecFloor").css("height", "auto");
    var self = this;
    var aa = setInterval(function() {
      self.arge = sessionStorage.getItem("arge");
    }, 500);
    $("#elecAir").css("height", "auto");
    this.reload();
  },
  computed: {
    elecAir: function() {
      return [
        {
          isExpand: true,
          name: "本日用电",
          content: {
            "3-2-3-1": {
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
          name: "本月用电",
          content: {
            "3-2-3-2": {
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
          name: "本年用电",
          content: {
            "3-2-3-3": {
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
    },
    reload() {
      var that = this;
      axios({
        url: this.FACTURL.baseURL+"/energy_electricity",
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
            that.argetrans = datas.check_name;
            for (var i = 0; i < datas.history_day_list.length; i++) {
              that.xDaydata.push(datas.history_day_list[i].history_time);
              that.areaDayData.push(datas.history_day_list[i].history_value);
            }
            for (var i = 0; i < datas.history_month_list.length; i++) {
              that.xMonthdata.push(datas.history_month_list[i].history_time);
              that.areaMonthData.push(
                datas.history_month_list[i].history_value
              );
            }
            for (var i = 0; i < datas.history_year_list.length; i++) {
              that.xYeardata.push(datas.history_year_list[i].history_time);
              that.areaYearData.push(datas.history_year_list[i].history_value);
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
          $("#elecAir").css("height", "auto");
        } else {
          $("#elecAir").css("height", "");
        }
      }
    },
    arge: {
      handler: function() {
        var self = this;
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

