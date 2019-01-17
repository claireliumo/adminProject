<template>
  <div class="info">
    <div class="info-choose">
      <p>{{argetrans}}</p>
    </div>
    <div class="info-title" @click="expandTable">
      <i class="el-icon-plus" v-if="!isExpand"></i>
      <i class="el-icon-minus" v-else></i>
      {{datas.title}}
    </div>
    <div class="info-content" v-show="isExpand">
      <Row :space="12" style="margin:20px" v-if="change">
        <Col v-for="data in result" :key="data.name" width="12">
        <Col width="10">
        <img style="height: 45px;width: 45px;margin: 10px;" :src="data.src">
        </Col>
        <Col width="14">
        <div style="font-size:20px">{{data.name}}</div>
        <div>
          <span style="font-size: 28px;">{{data.data}}</span>
          <span style="font-size: 18px;">{{data.danwei}}</span>
        </div>
        </Col>
        </Col>
      </Row>
      <Row :space="12" style="margin:20px" v-else>
        <Col v-for="data in result" :key="data.name" width="12">
        <Col width="10">
        <img style="height: 45px;width: 45px;margin: 10px;" :src="data.src">
        </Col>
        <Col width="14">
        <div style="font-size:20px">{{data.name}}</div>
        <div>
          <span style="font-size: 28px;">{{data.data}}</span>
          <span style="font-size: 18px;">{{data.danwei}}</span>
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
  name: "IndoorReal",
  props: {
    datas: Object
  },
  data() {
    return {
      change: true,
      arge: "",
      argetrans: "",
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
          name: "VOC",
          data: "",
          src: "static/dashboard.png",
          danwei: ""
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
  methods: {
    expandTable: function() {
      this.isExpand = !this.isExpand;

      //request table data
    },
    reload() {
      var that = this;
      axios({
        url: this.FACTURL.baseURL+"/env_indoor",
        method: "post",
        data: {
          uid: "b58f6e1d-e0cd-11e8-98ce-00163e10c840",
          position_id: that.arge
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
            that.argetrans = datas.position_name;
            that.result[0].data = datas.temperature;
            that.result[1].data = datas.humidity;
            that.result[2].data = datas.voc;
            that.result[3].data = datas["pm2.5"];
          }
        })
        .catch(function(error) {
          console.log(error);
          that.$message.error("出错啦～");
        });
    }
  },
  mounted() {
    var self = this;
    var aa = setInterval(function() {
      self.arge = sessionStorage.getItem("arge");
    }, 500);
    this.reload();
  },
  watch: {
    arge: {
      handler: function() {
        var self = this;
        self.reload();
        self.change = !self.change;
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.info {
  &-choose {
    color: #01ffff;
    font-size: 24px;
    text-align: left;
    margin-bottom: 8px;
  }
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

