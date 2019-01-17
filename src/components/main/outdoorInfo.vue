<template>
  <div class="info">
    <div class="info-title" @click="expandTable">
      <i class="el-icon-plus" v-if="!isExpand"></i>
      <i class="el-icon-minus" v-else></i>
      {{datas.title}}
    </div>
    <div class="info-content" v-show="isExpand">
      <Row :space="12" style="margin:20px">
        <Col v-for="data in result" :key="data.name" width="12">
        <Col width="10">
        <img style="height: 45px;width: 45px;margin: 10px;" :src="data.src">
        </Col>
        <Col width="14">
        <div style="font-size:20px">{{data.name}}</div>
        <div>
          <span style="font-size:28px;">{{data.data}}</span>
          <span style="font-size:18px">{{data.danwei}}</span>
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
export default {
  name: "OutdoorReal",
  props: {
    datas: Object
  },
  data() {
    return {
      isExpand: true,
      result: [
        {
          name: "温度",
          data: "",
          src: "static/temp.png",
          danwei: "℃"
        },
        {
          name: "湿度",
          data: "",
          src: "static/wet.png",
          danwei: "%"
        },
        {
          name: "风向",
          data: "",
          src: "static/wind.png",
          danwei: ""
        },
        {
          name: "风速",
          data: "",
          src: "static/speed.png",
          danwei: "m/s"
        },
        {
          name: "降水量",
          data: "",
          src: "static/jiangshui.png",
          danwei: "mm"
        },
        {
          name: "大气压",
          data: "",
          src: "static/qiya.png",
          danwei: "kPa"
        },
        {
          name: "PM2.5",
          data: "",
          src: "static/pm.png",
          danwei: ""
        }
      ]
    };
  },
  mounted() {
    var that = this;
    axios({
      url: this.FACTURL.baseURL+"/env_outdoor",
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
          var data = response.data;
          console.log(data);
          var datas = data.data;
          that.result[0].data = datas.temperature;
          that.result[1].data = datas.humidity;
          that.result[2].data = datas.wind_direction;
          that.result[3].data = datas.wind_speed;
          that.result[4].data= datas.precipitation;
          that.result[5].data = datas.air_pressure;
          that.result[6].data = datas["pm2.5"];
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
  }
};
</script>
<style lang="scss" scoped>
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
          font-size: 20px;
          padding-left: 10px;
          &:first-child {
            width: 40%;
          }
        }
      }
    }
  }
}
.h-row > div > div {
  padding: 8px;
  color: #0effff;
  background-color: #031e1f;
  height: 80px;
}
</style>

