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
          <div>设备图片</div>
          <img id="img" src=""/>
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
    };
  },
  mounted(){
    var that = this;
      axios({
        url: this.FACTURL.baseURL + "/security_device",
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
            $("#img").attr("src", "../../../static/device_img/"+datas.device_pic);
          }
        })
        .catch(function(error) {
          console.log(error);
          that.$message.error("出错啦～");
        });
  },
  methods: {
    expandTable: function () {
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
.pic-content{
    float: left;
    text-align: left;
    margin: 20px 30px;
    width: 85%;
    font-size: 24px !important;
}
img{
    margin-top: 20px;
    width: 90%;
}
</style>

