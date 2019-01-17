<template>
  <div class="info">
    <div class="info-title" @click="expandTable">
      <i class="el-icon-plus" v-if="!isExpand"></i>
      <i class="el-icon-minus" v-else></i>
      {{datas.title}}
    </div>
    <div class="info-content" v-show="isExpand">
      <p>设备信息</p>
      <div style="height:10px"></div>
      <table>
        <tr v-for="data in info" :key="data.name">
          <td>{{data.name}}</td>
          <td v-if="data.name=='设备参数'">
            <table class="infoTable">
              <tr v-for="item in data.data" :key="item.name">
                <td>{{item.name}}</td>
                <td>{{item.content}}</td>
              </tr>
            </table>
          </td>
          <td v-else>{{data.data}}</td>
        </tr>
      </table>
    </div>
    <div style="height:10px"></div>
    <div class="info-content" v-show="isExpand">
      <p>运行状态</p>
      <div style="height:10px"></div>
      <table>
        <tr v-for="data in state" :key="data.name">
          <td>{{data.name}}</td>
          <td>{{data.data}}</td>
        </tr>
      </table>
    </div>
  </div>
</template>
<script>
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
          data: "风冷机组1"
        },
        {
          name: "设备照片",
          data: "2张"
        },
        {
          name: "设备编号",
          data: "MC101-01"
        },
        {
          name: "设备厂家",
          data: "永丰"
        },
        {
          name: "设备型号",
          data: "FP-34KM-PI"
        },
        {
          name: "所在位置",
          data: "5楼502"
        },
        {
          name: "设备参数",
          data: [
            {
              name: "供冷量",
              content: "95%"
            },
            {
              name: "供热量",
              content: "95%"
            }
          ]
        }
      ],
      state: [
        {
          name: "开关状态",
          data: "正常"
        },
        {
          name: "报警信息",
          data: "正常"
        }
      ],
    };
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
.infoTable{ 
    border-collapse: collapse !important; 
    width: 100% !important;
    margin-left:-5px !important
} 
.infoTable td { 
    border-top: 0; 
    border-right: 3px solid red; 
    border-bottom: 3px solid red; 
    border-left: 0; 
}  
/* css3样式，获取表格的最后一行 */
.infoTable tr:last-child td{
    border-bottom: 0; 
}
.infoTable tr:first-child td{
    border-top: 0; 
}
.infoTable tr td:first-child{
    border-left: 0; 
}
/* css3样式，获取表格的最后一列 */
.infoTable tr td:last-child{
    border-right: 0; 
}
</style>

