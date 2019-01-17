<template>
  <div class="indoorhis" id="waterLife">
    <div class="indoorhis-title" @click="expandTable">
      <i class="el-icon-plus" v-if="!isExpand"></i>
      <i class="el-icon-minus" v-else></i>
      {{datas.title}}
    </div>
    <div class="indoorhis-content" v-if="isExpand">
      <div v-if="change">
        <div v-for="(itemm,index) in waterLife">
          <p>{{itemm.name}}</p>
          <p v-if="itemm.name=='楼层用水'">当前楼层：{{arge}}</p>
          <div v-for="(item,key) in itemm.content" class="charts">
            <charts :key="key" :containerId="'charts' + key" :customOption="item"></charts>
          </div>
        </div>
      </div>
      <div v-else>
        <div v-for="(itemm,index) in waterLife">
          <p>{{itemm.name}}</p>
          <p v-if="itemm.name=='楼层用水'">当前楼层：{{arge}}</p>
          <div v-for="(item,key) in itemm.content" class="charts">
            <charts :key="key" :containerId="'charts' + key" :customOption="item"></charts>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import charts from './charts'
export default {
  name: 'buildElectricity',
  props: {
    datas: Object
  },
  data() {
    return {
      arge: '',
      change: true,
      isExpand: true,
      xDaydata: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '0'],
      xHisdata: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
      areaDayData: [351.39, 342.43, 342, 344, 356, 325, 367, 345, 342, 342, 365, 359, 360, 358, 317, 325, 324, 345, 330, 344, 322, 333, 367, 321],
      areaHisData: [136500, 126500, 85500, 75401, 65901, 54401, 79023, 99023, 96500, 116500, 126500, 100000],
      buildDayData: [351.39, 342.43, 342, 344, 356, 325, 367, 345, 342, 342, 365, 359, 360, 358, 317, 325, 324, 345, 330, 344, 322, 333, 367, 321],
      buildHisData: [136500, 126500, 85500, 75401, 65901, 54401, 79023, 99023, 96500, 116500, 126500, 100000],
      floorDayData: [70.39, 68.43, 64, 62, 56, 65, 67, 56, 52, 72, 65, 69, 60, 58, 47, 75, 54, 65, 60, 54, 62, 63, 67, 71],
      floorHisData: [27300, 25300, 17100, 15080.2, 13180.2, 10880.2, 15804.6, 19804.6, 19300, 23300, 25300, 20000],
      buildData: [
        { value: 335, name: '建筑1' }
      ],
      buildLegend: ['建筑1'],
      floorData: [{ value: 345, name: '楼层1' }, { value: 275, name: '楼层2' }, { value: 315, name: '楼层3' }, { value: 285, name: '楼层4' }, { value: 455, name: '楼层5' }],
      floorLegend: ['楼层1', '楼层2', '楼层3', '楼层4', '楼层5'],
    }
  },
  computed: {
    waterLife: function () {
      return [
        {
          name: "园区用水",
          content: {
            '3-3-1-1': {
              title: {
                text: '本日用水',
                textStyle: {
                  color: '#01ffff',
                  fontSize: '20'
                },
                left: 20,
                top: 10
              },
              xAxis: {
                type: 'category',
                boundaryGap: false,
                name: "时",
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
                  formatter: '{value} m3'
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
                  data: this.areaDayData,
                  markPoint: {
                    data: [
                      { type: 'max', name: '最高本日用水' },
                      { type: 'min', name: '最低本日用水' }
                    ]
                  }
                }
              ]
            },
            '3-3-1-2': {
              title: {
                text: '本年用水',
                textStyle: {
                  color: '#01ffff',
                  fontSize: '20'
                },
                left: 20,
                top: 10
              },
              xAxis: {
                type: 'category',
                name: "月",
                boundaryGap: true,
                data: this.xHisdata,
                axisLine: {
                  lineStyle: {
                    color: '#01ffff'
                  }
                }
              },
              yAxis: {
                type: 'value',
                axisLabel: {
                  formatter: '{value} m3'
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
                  data: this.areaHisData,
                  markPoint: {
                    data: [
                      { type: 'max', name: '最高本年用水' },
                      { type: 'min', name: '最低本年用水' }
                    ]
                  }
                }
              ]
            },
            '3-3-1-3': {
              tooltip: {
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c} ({d}%)"
              },
              title: {
                text: '各建筑用水占比',
                textStyle: {
                  color: '#01ffff',
                  fontSize: '20'
                },
                left: 20,
                top: 10
              },
              legend: {
                orient: 'vertical',
                x: 'left',
                top: 50,
                left: 20,
                data: this.buildLegend,
                textStyle: {
                  color: '#fff'
                },
              },
              series: [
                {
                  name: '各建筑用水占比',
                  type: 'pie',
                  radius: '55%',
                  center: ['50%', '60%'],
                  data: this.buildData
                }
              ]
            }
          }
        },
        {
          name: "建筑用水",
          content: {
            '3-3-1-4': {
              title: {
                text: '本日用水',
                textStyle: {
                  color: '#01ffff',
                  fontSize: '20'
                },
                left: 20,
                top: 10
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
                  formatter: '{value} m3'
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
                  data: this.buildDayData,
                  markPoint: {
                    data: [
                      { type: 'max', name: '最高本日用水' },
                      { type: 'min', name: '最低本日用水' }
                    ]
                  }
                }
              ]
            },
            '3-3-1-5': {
              title: {
                text: '本年用水',
                textStyle: {
                  color: '#01ffff',
                  fontSize: '20'
                },
                left: 20,
                top: 10
              },
              xAxis: {
                type: 'category',
                name: "月",
                boundaryGap: true,
                data: this.xHisdata,
                axisLine: {
                  lineStyle: {
                    color: '#01ffff'
                  }
                }
              },
              yAxis: {
                type: 'value',
                axisLabel: {
                  formatter: '{value} m3'
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
                  data: this.buildHisData,
                  markPoint: {
                    data: [
                      { type: 'max', name: '最高本年用水' },
                      { type: 'min', name: '最低本年用水' }
                    ]
                  }
                }
              ]
            },
            '3-3-1-6': {
              tooltip: {
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c} ({d}%)"
              },
              title: {
                text: '各楼层用水比例',
                textStyle: {
                  color: '#01ffff',
                  fontSize: '20'
                },
                left: 20,
                top: 10
              },
              legend: {
                orient: 'vertical',
                x: 'left',
                top: 50,
                left: 20,
                data: this.floorLegend,
                textStyle: {
                  color: '#fff'
                },
              },
              series: [
                {
                  name: '各楼层用水比例',
                  type: 'pie',
                  radius: '55%',
                  center: ['50%', '60%'],
                  data: this.floorData
                }
              ]
            },
          }
        },
        {
          name: "楼层用水",
          content: {
            '3-3-1-7': {
              title: {
                text: '本日用水',
                textStyle: {
                  color: '#01ffff',
                  fontSize: '20'
                },
                left: 20,
                top: 10
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
                  formatter: '{value} m3'
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
                  data: this.floorDayData,
                  markPoint: {
                    data: [
                      { type: 'max', name: '最高本日用水' },
                      { type: 'min', name: '最低本日用水' }
                    ]
                  }
                }
              ]
            },
            '3-3-1-8': {
              title: {
                text: '本年用水',
                textStyle: {
                  color: '#01ffff',
                  fontSize: '20'
                },
                left: 20,
                top: 10
              },
              xAxis: {
                type: 'category',
                name: "月",
                boundaryGap: true,
                data: this.xHisdata,
                axisLine: {
                  lineStyle: {
                    color: '#01ffff'
                  }
                }
              },
              yAxis: {
                type: 'value',
                axisLabel: {
                  formatter: '{value} m3'
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
                  data: this.floorHisData,
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
  mounted() {
    console.log(this.datas);
    $("#waterLife").css('height', 'auto');
    var self = this;
    var aa = setInterval(function () {
      self.arge = sessionStorage.getItem("arge");
    }, 500);
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
          $("#waterLife").css('height', 'auto');
        } else {
          $("#waterLife").css('height', '');
        }
      }
    },
    arge: {
      handler: function () {
        var self = this;
        if (self.arge == 'floor_a1f') {
          self.floorDayData = [63, 65, 64, 51, 63, 58, 59, 58, 55, 53, 58, 65, 60, 51, 55, 58, 57, 62, 53, 65, 68, 62, 54, 57];
          self.floorHisData = [21821, 23553, 14771, 16967, 23747, 16934, 26065, 21042, 22648, 15285, 23654, 18503];
          self.change = !self.change;
        }
        if (self.arge == 'floor_a2f') {
          self.floorDayData = [55, 65, 69, 62, 69, 57, 54, 69, 57, 62, 51, 57, 68, 70, 65, 67, 54, 57, 58, 68, 61, 67, 51, 62];
          self.floorHisData = [26710, 14889, 20156, 25475, 26116, 18194, 26539, 20244, 26061, 20661, 19874, 16540];
          self.change = !self.change;
        }
        if (self.arge == 'floor_a3f') {
          self.floorDayData = [67, 53, 65, 67, 58, 64, 67, 68, 69, 62, 52, 60, 54, 58, 61, 66, 60, 67, 51, 57, 62, 66, 53, 60];
          self.floorHisData = [24307, 19134, 19055, 26421, 14226, 14609, 26716, 20116, 21069, 24970, 18170, 19077];
          self.change = !self.change;
        }
        if (self.arge == 'floor_a4f') {
          self.floorDayData = [55, 54, 58, 54, 62, 59, 51, 51, 64, 63, 52, 62, 53, 59, 65, 58, 50, 66, 51, 59, 65, 60, 69, 54];
          self.floorHisData = [21294, 22093, 19208, 26828, 17381, 22240, 26582, 14930, 24790, 22839, 20373, 26677];
          self.change = !self.change;
        }
        if (self.arge == 'floor_a5f') {
          self.floorDayData = [62, 56, 59, 68, 56, 60, 56, 53, 51, 66, 56, 64, 52, 58, 63, 65, 68, 68, 58, 63, 60, 57, 64, 58];
          self.floorHisData = [21714, 16564, 17281, 13812, 18809, 26365, 24278, 26189, 16520, 15372, 23431, 23483];
          self.change = !self.change;
        }
        if (!self.arge) {
          self.floorDayData = [70.39, 68.43, 64, 62, 56, 65, 67, 56, 52, 72, 65, 69, 60, 58, 47, 75, 54, 65, 60, 54, 62, 63, 67, 71];
          self.floorHisData = [27300, 25300, 17100, 15080.2, 13180.2, 10880.2, 15804.6, 19804.6, 19300, 23300, 25300, 20000];
          self.change = !self.change;
        }
        console.log(self.change);
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
    height: 200px;
}
</style>

