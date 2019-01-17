<template>
  <div class="indoorhis" id="kitWarm">
    <div v-for="detail in elecArea">
         <div class="indoorhis-title">
                {{detail.name}}
        </div>
        <!-- <div class="indoorhis-title" @click="expandTable(detail)">
            <i class="el-icon-plus" v-if="!(detail.isExpand)"></i>
            <i class="el-icon-minus" v-else></i>
                {{detail.name}}
        </div> -->
        <div class="indoorhis-content charts">
            <div v-for="(item,key) in detail.content" style="height:200px;">
                <charts :key="key" :containerId="'charts' + key" :customOption="item"></charts>
            </div>
        </div>
        <br/>
    </div>   
  </div>
</template>
<script>
import charts from './charts'
import axios from "axios";
import qs from "qs";
export default {
  name: 'areaElectricity',
  props: {
    datas: Array
  },
  data() {
    return {
      isExpand: true,
      xMonthdata:['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30'],
      xYeardata: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
      areaMonthData:[10561, 10928, 10120, 10161, 10591, 10488, 9679, 10632, 10611, 10092, 10444, 10821, 10386, 10354, 9554, 10391, 10771, 9879, 9727, 9800, 10527, 10513, 10938, 10736, 10272, 10513, 10794, 10017, 10001, 10268],
      areaYearData: [136500, 126500, 85500, 75401, 65901, 54401, 79023, 99023, 96500, 116500, 126500, 100000],
    }
  },
  mounted() {
    console.log(this.datas);
    $("#kitWarm").css('height', 'auto');
  },
  computed:{
    elecArea:function(){
      return [
        {
          name: '本月用气',
          content: {
            '3-4-1-1': {
              backgroundColor:'',
              title: {
                text: '',
                textStyle: {
                  color: '#01ffff',
                  fontSize: '20',
                  fontWeight: 400
                },
                left: 20
              },
              grid:{
                  top:40,
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
                  formatter: '{value}m³'
                },
                axisLine: {
                  lineStyle: {
                    color: '#01ffff'
                  }
                }
              },
              series: [
                {
                  name: '本月用气',
                  type: 'line',
                  data: this.areaMonthData,
                  markPoint: {
                    data: [
                      { type: 'max', name: '最高用气量' },
                      { type: 'min', name: '最低用气量' }
                    ]
                  }
                }
              ]
            },
          }
        },
        {
          name:'本年用气',
          content: {
            '3-4-1-2': {
              backgroundColor:'',
              title: {
                text: '',
                textStyle: {
                  color: '#01ffff',
                  fontSize: '20',
                  fontWeight: 400
                },
                left: 20
              },
              grid:{
                  top:40,
                  left:80,
                  bottom:30
              },
              xAxis: {
                type: 'category',
                name: "月",
                boundaryGap: false,
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
                  formatter: '{value}m³'
                },
                axisLine: {
                  lineStyle: {
                    color: '#01ffff'
                  }
                }
              },
              series: [
                {
                  name: '本年用气',
                  type: 'line',
                  data: this.areaYearData,
                  markPoint: {
                    data: [
                      { type: 'max', name: '最高用气量' },
                      { type: 'min', name: '最低用气量' }
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
    mounted() {
    var that = this;
    axios({
      url: this.FACTURL.baseURL+"/energy_gas",
      method: "post",
      data: {
        uid: "b58f6e1d-e0cd-11e8-98ce-00163e10c840",
        check_id: 's0001',
      },
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(function (response) {
        console.log(response.data);
        if (response.data.msg == 'success') {
          var ans = response.data.data;
          that.xYeardata = [];
          that.xMonthdata = [];
          that.areaMonthData = [];
          that.areaYearData = [];
          for (var i = 0; i < ans.kitchen_gas.history_year_list.length; i++) {
            that.xYeardata.push(ans.kitchen_gas.history_year_list[i].history_time);
            that.areaYearData.push(ans.kitchen_gas.history_year_list[i].history_value);
          }
          for (var i = 0; i < ans.kitchen_gas.history_month_list.length; i++) {
            that.xMonthdata.push(ans.kitchen_gas.history_month_list[i].history_time);
            that.areaMonthData.push(ans.kitchen_gas.history_month_list[i].history_value);
          }
        }
      })
      .catch(function (error) {
        console.log(error);
        that.$message.error("出错啦～");
      });
  },
  methods: {
  },
  components: {
    charts
  },
  watch: {
    isExpand: {
      handler: function () {
        console.log(this.isExpand);
        if (this.isExpand == true) {
          $("#kitWarm").css('height', 'auto');
        } else {
          $("#kitWarm").css('height', '');
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
        margin-left: 10px;
    }
    &-content {
        margin: 0 0 0 10px;
        width: 100%;
    }
}
.charts{
    margin:0;
    width: 100%;
    height: 200px;
}
</style>

