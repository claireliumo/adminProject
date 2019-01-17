<template>
  <div class="info">
    <div class="info-title" @click="expandTable">
      <i class="el-icon-plus" v-if="!isExpand"></i>
      <i class="el-icon-minus" v-else></i>
      {{datas.title}}
    </div>
    <div class="info-content" v-show="isExpand" v-if="datas.title === '全区概况'">
      <Row :space="12" style="margin:20px">
        <Col v-for="data in resultArea" :key="data.name" width="12">
        <Col width="10">
        <img style="height: 42px !important;width: 42px !important;margin: 10px;" :src="data.src">
        </Col>
        <Col width="14">
        <div style="font-size:18px !important;">{{data.name}}</div>
        <div>
          <span style="font-size: 28px;">{{data.data}}</span>
          <span style="font-size: 18px;">{{data.danwei}}</span>
        </div>
        </Col>
        </Col>
      </Row>
      <div class="charts">
        <charts v-for="(item,key) in info1" :key="key" :containerId="'charts' + key" :customOption="item"></charts>
      </div>
    </div>
    <div class="info-content" v-show="isExpand" v-if="datas.title === '建筑概况'">
      <table>
        <tr v-for="data in resultBuild1" :key="data.name">
          <td>{{data.name}}</td>
          <td>{{data.data}}</td>
        </tr>
      </table>
      <Row :space="12" style="margin:20px">
        <Col v-for="data in resultBuild2" :key="data.name" width="12">
        <Col width="12">
        <img style="height: 42px !important;width: 42px !important;margin: 10px;" :src="data.src">
        </Col>
        <Col width="12">
        <div style="font-size:18px !important">{{data.name}}</div>
        <div>
          <span style="font-size: 28px">{{data.data}}</span>
          <span style="font-size: 20px">{{data.danwei}}</span>
        </div>
        </Col>
        </Col>
      </Row>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import qs from "qs";
import charts from "./charts";
export default {
  name: "info",
  props: {
    datas: Object
  },
  data() {
    return {
      isExpand: true,
      resultArea: [
        {
          name: "占地面积",
          data: "",
          src: "static/area.png",
          danwei: "m²"
        },
        {
          name: "建筑数量",
          data: "",
          src: "static/building.png",
          danwei: ""
        },
        {
          name: "总建筑面积",
          data: "",
          src: "static/buildingarea.png",
          danwei: "m²"
        },
        {
          name: "容积率",
          data: "",
          src: "static/rongji.png",
          danwei: ""
        },
        {
          name: "绿地率",
          data: "",
          src: "static/green.png",
          danwei: ""
        },
        {
          name: "园区人员统计",
          data: "",
          src: "static/people.png",
          danwei: ""
        }
      ],
      resultBuild1: [
        {
          name: "建筑名称",
          data: ""
        },
        {
          name: "使用功能",
          data: ""
        }
      ],
      resultBuild2: [
        {
          name: "建筑面积",
          data: "",
          src: "static/area1.png",
          danwei: "m²"
        },
        {
          name: "建筑高度",
          data: "",
          src: "static/height.png",
          danwei: "m"
        },
        {
          name: "建筑时间",
          data: "",
          src: "static/time.png",
          danwei: ""
        },
        {
          name: "建筑层数",
          data: "",
          src: "static/floor.png",
          danwei: ""
        }
      ],
      infoLegend: [],
      infoData: []
    };
  },
  mounted() {
    var that = this;
    axios({
      url: this.FACTURL.baseURL + "/area_overview",
      method: "post",
      data: {
        uid: "b58f6e1d-e0cd-11e8-98ce-00163e10c840"
      },
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(function(response) {
        console.log(response);
        if (response.data.msg == "success") {
          var datas = response.data.data;
          that.resultArea[0].data = datas.land_area;
          that.resultArea[1].data = datas.buildings_amount;
          that.resultArea[2].data = datas.buildings_area;
          that.resultArea[3].data = datas.floor_area_ratio;
          that.resultArea[4].data = datas.greening_rate;
          // that.resultArea[5].data = datas.companys_ratio;
          that.infoLegend = [];
          that.infoData = [];
          for (var i = 0; i < datas.companys_ratio.length; i++) {
            var obj = {
              value: datas.companys_ratio[i].ratio_value,
              name: datas.companys_ratio[i].ratio_name
            };
            that.infoLegend.push(datas.companys_ratio[i].ratio_name);
            that.infoData.push(obj);
          }
          that.resultArea[5].data = datas.area_people_amount;
        }
        var data = response.data;
        console.log(data);
      })
      .catch(function(error) {
        console.log(error);
        that.$message.error("出错啦～");
      });
    axios({
      url: this.FACTURL.baseURL + "/building_overview",
      method: "post",
      data: {
        uid: "b58f6e1d-e0cd-11e8-98ce-00163e10c840",
        building_id: 1
      },
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(function(response) {
        console.log(response);
        if (response.data.msg == "success") {
          var datas = response.data.data;
          that.resultBuild1[0].data = datas.building_name;
          that.resultBuild1[1].data = datas.building_function;
          that.resultBuild2[0].data = datas.building_area;
          that.resultBuild2[1].data = datas.building_height;
          that.resultBuild2[2].data = datas.building_time;
          that.resultBuild2[3].data = datas.building_floors;
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
  computed: {
    info1: function() {
      return {
        "1-1-1": {
          backgroundColor: "",
          tooltip: {
            trigger: "item",
            formatter: "{a} <br/>{b} : {c} ({d}%)"
          },
          title: {
            text: "企业比例",
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
            data: this.infoLegend,
            textStyle: {
              color: "#fff"
            }
          },
          series: [
            {
              name: "企业比例",
              type: "pie",
              radius: "70%",
              center: ["55%", "60%"],
              data: this.infoData
            }
          ]
        }
      };
    }
  },
  components: {
    charts
  }
};
</script>
<style lang="scss">
.info {
  &-title {
    color: #01ffff;
    font-size: 24px;
    text-align: left;
  }
  &-content {
    margin: 20px 0;
    table {
      width: 90%;
      margin: auto;
      tr {
        height: 30px;
        line-height: 30px;
        td {
          border: 1px solid #01ffff;
          color: #01ffff;
          font-size: 22px !important;
          padding-left: 10px;
          &:first-child {
            width: 40%;
          }
        }
      }
    }
  }
}
// .indoorhis {
//   &-title {
//     color: #01ffff;
//     font-size: 24px;
//     text-align: left;
//     margin-left: 10px;
//     margin-top: 40px;
//   }
// }
.charts {
  margin: 20px 0;
  width: 100%;
  height: 240px;
}
.h-row > div > div {
  padding: 8px;
  color: #0effff;
  background-color: #031e1f;
  height: 80px;
}
</style>

