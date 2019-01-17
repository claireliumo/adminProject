<template>
  <div class="info">
    <div class="info-title" @click="expandTable">
      <i class="el-icon-plus" v-if="!isExpand"></i>
      <i class="el-icon-minus" v-else></i>
      {{datas.title}}
    </div>
    <div class="info-content" v-show="isExpand">
      <table>
        <tr v-for="data in state" :key="data.device_status_name">
          <td>{{data.device_status_name}}</td>
          <td>{{data.device_status_value}}</td>
        </tr>
      </table>
      <div class="pic-content">
        <div>摄像头图像</div>
        <iframe id="mainIframe" src="video.html" style="float:left;width: 90%;height: 300px;"></iframe>
      </div>
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
      isExpand: true,
      state: [
        {
          device_status_name: "运行状态",
          device_status_value: ""
        }
      ],
      IMOS_vmServerIP: "",
      IMOS_userName: "",
      IMOS_passWord: "",
      IMOS_iframeWidth: 0,
      IMOS_iframeHeight: 0,
      IMOS_szCamCode: ""
    };
  },
  mounted() {
    var that = this;
    axios({
      url: this.FACTURL.baseURL + "/security_camera",
      method: "post",
      data: {
        uid: "b58f6e1d-e0cd-11e8-98ce-00163e10c840",
        check_id: "cf0001"
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
          that.state = datas.device_status;
          that.IMOS_vmServerIP = datas.camera_config.server_ip;
          that.IMOS_userName = datas.camera_config.user_name;
          that.IMOS_passWord = datas.camera_config.password;
          that.IMOS_szCamCode = datas.camera_config.cam_code;
        }
      })
      .catch(function(error) {
        console.log(error);
        that.$message.error("出错啦～");
      });
    this.IMOS_iframeWidth = window.screen.width - 50;
    this.IMOS_iframeHeight = window.screen.height - 300;
    // if (document.frames["mainIframe"]) {
    //   document.frames["mainIframe"].frameElement.style.width =
    //     window.screen.width - 50;
    //   document.frames["mainIframe"].frameElement.style.height =
    //     window.screen.height - 250;
    // }
  },
  methods: {
    expandTable: function() {
      this.isExpand = !this.isExpand;

      //request table data
    }
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
.pic-content {
  float: left;
  text-align: left;
  margin: 20px 30px;
  width: 85%;
  font-size: 24px !important;
}
</style>

