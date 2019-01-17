<template>
  <div :id="containerId" class="container"></div>
</template>
<script>
export default {
  name: 'chart',
  props: {
    customOption: Object,
    containerId: String
  },
  data() {
    return {
      basicOptions: {
        backgroundColor: '#011f1f',
        title: {
          text: '折线图',
          textStyle: {
            color: '#01ffff',
            fontSize: '20'
          },
          left: 20,
          top: 10
        },
        color: [
          "#2ec7c9",
          "#b6a2de",
          "#5ab1ef",
          "#ffb980",
          "#d87a80",
          "#8d98b3",
          "#e5cf0d",
          "#97b552",
          "#95706d",
          "#dc69aa",
          "#07a2a4",
          "#9a7fd1",
          "#588dd5",
          "#f5994e",
          "#c05050",
          "#59678c",
          "#c9ab00",
          "#7eb00a",
          "#6f5553",
          "#c14089"
        ],
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: [],
          orient: 'horizontal',
          textStyle: {
            color: '#01ffff',
            fontSize: '12'
          },
          left: 'right',
          top: 10
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        toolbox: {
          show: false
        },
        series: []
      }
    }
  },
  mounted() {
    setTimeout(() => {
      this.renderChart();
    }, 300)

  },
  methods: {
    renderChart() {
      let chartContainer = this.$echarts.init(document.getElementById(this.containerId))
      let chartOption = Object.assign(this.basicOptions, this.customOption);
      console.log(chartOption.series);
      chartContainer.setOption(chartOption, true);
    }
  },
  watch: {
    customOption: {
      handler: function () {
        let chartContainer = this.$echarts.init(document.getElementById(this.containerId))
        let chartOption = Object.assign(this.basicOptions, this.customOption);
        console.log(chartOption.series);
        chartContainer.setOption(chartOption, true);
      }
    }
  }
}
</script>
<style lang="scss">
.container{
    width: 100%;
    height: 100%;
}
</style>


