<template>
  <div class="indoorhis" id="elecEqui">
    <div class="indoorhis-title" @click="expandTable">
      <i class="el-icon-plus" v-if="!isExpand"></i>
      <i class="el-icon-minus" v-else></i>
      {{datas.title}}
    </div>
    <br/>
    <div class="indoorhis-title" v-if="isExpand">
      {{argetrans}}
    </div>
    <div class="indoorhis-content" v-if="isExpand">
      <div v-for="(itemm,index) in elecEqui">
        <div v-for="(item,key) in itemm.content" class="charts">
          <charts :key="key" :containerId="'charts' + key" :customOption="item"></charts>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import qs from "qs";
import charts from './charts'
export default {
  name: 'equiElectricity',
  props: {
    datas: Object
  },
  data() {
    return {
      arge: "",
      argetrans: "",
      isExpand: true,
      xDaydata: [],
      xMonthdata:[],
      xYeardata: [],
      elecDayData: [],
      elecMonthData:[],
      elecYearData: [],
    }
  },
  mounted() {
    $("#elecEqui").css('height', 'auto');
    console.log(this.datas);
    var self = this;
    var aa = setInterval(function() {
      self.arge = sessionStorage.getItem("arge");
    }, 500);
    $("#elecAir").css("height", "auto");
    this.reload();
  },
  computed:{
    elecEqui:function(){
      return [
        {
          name: "智能插座用电",
          content: {
            '3-2-4-1': {
              backgroundColor:'',
              title: {
                text: '本日用电',
                textStyle: {
                  color: '#01ffff',
                  fontSize: '20',
                  fontWeight: 400
                },
                left: 20,
                top: 10
              },
              grid:{
                  top:80,
                  left:80,
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
                  name: '本日用电',
                  type: 'line',
                  data: this.elecDayData,
                  markPoint: {
                    data: [
                      { type: 'max', name: '最高本日用电' },
                      { type: 'min', name: '最低本日用电' }
                    ]
                  }
                }
              ]
            },
            '3-2-4-2': {
              backgroundColor:'',
              title: {
                text: '本月用电',
                textStyle: {
                  color: '#01ffff',
                  fontSize: '20',
                  fontWeight: 400
                },
                left: 20,
                top: 10
              },
              grid:{
                  top:80,
                  left:80,
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
                  name: '本月用电',
                  type: 'line',
                  data: this.elecMonthData,
                  markPoint: {
                    data: [
                      { type: 'max', name: '最高本月用电' },
                      { type: 'min', name: '最低本月用电' }
                    ]
                  }
                }
              ]
            },
            '3-2-4-3': {
              backgroundColor:'',
              title: {
                text: '本年用电',
                textStyle: {
                  color: '#01ffff',
                  fontSize: '20',
                  fontWeight: 400
                },
                left: 20,
                top: 10
              },
              grid:{
                  top:80,
                  left:80,
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
                  name: '本年用电',
                  type: 'bar',
                  data: this.elecYearData,
                  markPoint: {
                    data: [
                      { type: 'max', name: '最高本年用电' },
                      { type: 'min', name: '最低本年用电' }
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
            that.elecDayData = [];
            that.elecMonthData = [];
            that.elecYearData = [];
            that.argetrans = datas.check_name;
            for (var i = 0; i < datas.history_day_list.length; i++) {
              that.xDaydata.push(datas.history_day_list[i].history_time);
              that.elecDayData.push(datas.history_day_list[i].history_value);
            }
            for (var i = 0; i < datas.history_month_list.length; i++) {
              that.xMonthdata.push(datas.history_month_list[i].history_time);
              that.elecMonthData.push(
                datas.history_month_list[i].history_value
              );
            }
            for (var i = 0; i < datas.history_year_list.length; i++) {
              that.xYeardata.push(datas.history_year_list[i].history_time);
              that.elecYearData.push(datas.history_year_list[i].history_value);
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
      handler: function () {
        console.log(this.isExpand);
        if (this.isExpand == true) {
          $("#elecEqui").css('height', 'auto');
        } else {
          $("#elecEqui").css('height', '');
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

