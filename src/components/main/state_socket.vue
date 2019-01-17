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
          <td>{{data.data}}</td>
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
          data: "智能插座1"
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
          name: "所在位置",
          data: "5楼502"
        }
      ],
      state: [
        {
          name: "开关状态",
          data: "正常"
        },
        {
          name: "实时电流",
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
</style>

