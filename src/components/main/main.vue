<template>
  <div class="main">
   <Header />
   <div class="main-content">
     <div class="main-content__utity">
       <div class="main-content__utity-content">
         <h1>Utity Area</h1>
       </div>
       <div class="main-content__utity-footer">
         <div class="title">{{building}}</div>
         <div class="content">
           <a class="status" :class="{'active': isA}" @click="statusChange(0)">空调</a>
           <a class="status">通风</a>
           <a class="status">采暖</a>
           <a class="status">照明</a>
           <a class="status">电梯</a>
           <a class="status">插座</a>
           <a class="status">厨房</a>
           <a class="status">安防</a>
           <a class="status">消防</a>
         </div>
       </div>
     </div>
     <div class="main-content__echarts">
       <h1>Echarts</h1>
     </div>
   </div>
  </div>
</template>
<script>
import Header from './header.vue'
export default{
  name: 'Main',
  data () {
    return {
      building: '建筑1-楼层1-房间104-空调2',
      isActive: [false, false, false, false, false, false, false, false, false],
      isA: false
    }
  },
  methods: {
    handleSelectChange: function (key) {
      console.log(key)
    },
    statusChange: function (index) {
      console.log(index)
      // this.isActive[index] = !this.isActive[index]
      this.isA = !this.isA
      console.log(this.isActive[index])
    }
  },
  components: {
    Header
  }
}
</script>
<style lang="scss">
  .main{
    background: linear-gradient(#023838, #011f1f);
    width: 1920px;
    height: 1080px;
    overflow: auto;
    &-content {
      display: flex;
      margin-top: 20px;
      &__utity {

        width: 1260px;
        height: 100%;
        display: flex;
        flex-direction: column;
        border: 1px solid;
        &-content {
          width: 100%;
          height: 840px;
          border: 2px solid #01ffff;
          color: #fff;
        }
        &-footer {
          margin-top: 20px;
          width: 100%;
          height: 100px;
          border: 2px solid #01ffff;
          display: flex;
          .title {
            // width: 30%;
            height: 35px;
            line-height: 35px;
            margin: 32px 0 32px 15px;
            padding-right: 15px;
            color: #01ffff;
            font-size: 32px;
            border-right: 3px solid #01ffff;
          }
          .content {
            display: flex;
            align-items: center;
            .status {
              width: 60px;
              height: 35px;
              line-height: 35px;
              border-radius: 25px;
              border: 2px solid #01ffff;
              color: #01ffff;
              font-size: 18px;
              background: transparent;
              margin-left: 20px;
              &.active {
                 background-color: #01ffff;
                 color: #011f1f;
              }
              &:hover {
                background-color: #01ffff;
                color: #011f1f;
              }
            }
          }
        }
      }
      &__echarts {
        flex: 1;
        margin-left: 20px;
        border: 1px solid #01ffff;
        color: #01ffff;
      }
    }
  }
</style>
