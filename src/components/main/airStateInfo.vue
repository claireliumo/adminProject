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
          <td v-if="data.name=='设备参数'">
            <table class="infoTable">
              <tr v-for="item in data.data" :key="item.device_info_name">
                <td>{{item.device_info_name}}</td>
                <td>{{item.device_info_value}}</td>
              </tr>
            </table>
          </td>
          <td v-else>{{data.data}}</td>
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
      arge: "",
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
        },
        {
          name: "设备参数",
          data: []
        }
      ]
    };
  },
  mounted() {
    var self = this;
    var aa = setInterval(function() {
      self.arge = sessionStorage.getItem("arge");
    }, 500);
    this.reload();
  },
  methods: {
    expandTable: function() {
      this.isExpand = !this.isExpand;
    },
    reload() {
      var that = this;
      axios({
        url: this.FACTURL.baseURL + "/monitor_check_ac",
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
            that.info[0].data = datas.device_name;
            that.info[1].data = datas.device_sn;
            that.info[2].data = datas.device_factory;
            that.info[3].data = datas.device_version;
            that.info[4].data = datas.device_location;
            that.info[5].data = datas.device_info;
          }
        })
        .catch(function(error) {
          console.log(error);
          that.$message.error("出错啦～");
        });
    }
  },
  watch: {
    arge: {
      handler: function() {
        var self = this;
        self.reload();
      }
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
.infoTable {
  border-collapse: collapse !important;
  width: 100% !important;
  margin-left: -5px !important;
}
.infoTable td {
  border-top: 0;
  border-right: 3px solid red;
  border-bottom: 3px solid red;
  border-left: 0;
}
/* css3样式，获取表格的最后一行 */
.infoTable tr:last-child td {
  border-bottom: 0;
}
.infoTable tr:first-child td {
  border-top: 0;
}
.infoTable tr td:first-child {
  border-left: 0;
}
/* css3样式，获取表格的最后一列 */
.infoTable tr td:last-child {
  border-right: 0;
}
</style>

