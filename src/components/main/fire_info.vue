<template>
  <div class="info">
    <div class="info-title" @click="expandTable">
      <i class="el-icon-plus" v-if="!isExpand"></i>
      <i class="el-icon-minus" v-else></i>
      {{datas.title}}
    </div>
    <div class="info-content" v-show="isExpand">
      <table>
        <tr v-for="data in info" :key="data.name">
          <td>{{data.name}}</td>
          <td>{{data.data}}</td>
        </tr>
      </table>
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
      info: [
        {
          name: "设备名称",
          data: ""
        },
        {
          name: "设备编号",
          data: ""
        },
        {
          name: "设备厂家",
          data: ""
        },
        {
          name: "设备型号",
          data: ""
        },
        {
          name: "所在位置",
          data: ""
        }
      ],
    };
  },
  mounted() {
    var that = this;
    axios({
      url: this.FACTURL.baseURL + "/fire_equipment",
      method: "post",
      data: {
        uid: "b58f6e1d-e0cd-11e8-98ce-00163e10c840",
        check_id: "cf0001"
      },
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(function (response) {
        console.log(response);
        var data = response.data;
        console.log(data);
        if (data.msg == "success") {
          var datas = data.data;
          console.log(datas);
          that.info[0].data = datas.device_name;
          that.info[1].data = datas.device_sn;
          that.info[2].data = datas.device_factory;
          that.info[3].data = datas.device_version;
          that.info[4].data = datas.device_location;
        }
      })
      .catch(function (error) {
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
</style>

