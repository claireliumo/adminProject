<template>
    <div class="indoorhis">
        <div class="indoorhis-title" @click="expandTable">
            <i class="el-icon-plus" v-if="!isExpand"></i>
            <i class="el-icon-minus" v-else></i>
            {{datas.title}}
        </div>
        <div class="indoorhis-content" v-if="isExpand">
            <charts v-for="(item,key) in indoorHidOp" :key="key" :containerId ="'charts' + key" :customOption="item"></charts>
        </div>
    </div>
</template>
<script>
import charts from './charts'
export default {
    name: 'IndoorHis',
    props: {
        datas: Object
    },
    data(){
        return {
            result: [],
            isExpand: false,
            indoorHidOp: {
                '2-1-2-1': {
                    title: {
                        text: '历史温度',
                        textStyle: {
                            color: '#01ffff',
                            fontSize: '20'
                        },
                        left: 20,
                        top: 10
                    },
                    xAxis: {
                        type: 'category',
                        boundaryGap: false,
                        data: ['1','2','3','4','5','6','7','8','9','10','11','12','13','14','15','16','17','18','19','20','21','22','23','0'],
                        axisLine: {
                            lineStyle: {
                                color: '#01ffff'
                            }
                        }
                    },
                    yAxis: {
                        type: 'value',
                        axisLabel: {
                            formatter: '{value} °C'
                        },
                        axisLine: {
                            lineStyle: {
                                color: '#01ffff'
                            }
                        }
                    },
                    series: [
                        {
                            name:'温度',
                            type:'line',
                            data:[0, 2,4, 10, -2, 5, 8, 9, 11, -2, 10, 12, 6, 10,11, 11, 3, 13, 12, 13, 10,7,6,7],
                            markPoint: {
                                data: [
                                    {type: 'max', name: '最高温度'},
                                    {type: 'min', name: '最低温度'}
                                ]
                            }
                        }
                    ]
                },
                '2-1-2-2': {
                    title: {
                        text: '历史温度',
                        textStyle: {
                            color: '#01ffff',
                            fontSize: '20'
                        },
                        left: 20,
                        top: 10
                    },
                    xAxis: {
                        type: 'category',
                        boundaryGap: false,
                        data: ['1','2','3','4','5','6','7','8','9','10','11','12','13','14','15','16','17','18','19','20','21','22','23','0'],
                        axisLine: {
                            lineStyle: {
                                color: '#01ffff'
                            }
                        }
                    },
                    yAxis: {
                        type: 'value',
                        axisLabel: {
                            formatter: '{value} %'
                        },
                        axisLine: {
                            lineStyle: {
                                color: '#01ffff'
                            }
                        }
                    },
                    series: [
                        {
                            name:'湿度',
                            type:'line',
                            data:[15, 21, 35, 23, 12, 23, 30, 21, 11, 15, 23, 12, 23, 20,31, 19, 15, 13, 12, 13, 10,7,6,7],
                            markPoint: {
                                data: [
                                    {type: 'max', name: '最高湿度'},
                                    {type: 'min', name: '最低温度'}
                                ]
                            }
                        }
                    ]
                },
                '2-1-2-3':{
                    title: {
                        text: '历史VOC',
                        textStyle: {
                            color: '#01ffff',
                            fontSize: '20'
                        },
                        left: 20,
                        top: 10
                    },
                    xAxis: {
                        type: 'category',
                        boundaryGap: false,
                        data: ['1','2','3','4','5','6','7','8','9','10','11','12','13','14','15','16','17','18','19','20','21','22','23','0'],
                        axisLine: {
                            lineStyle: {
                                color: '#01ffff'
                            }
                        }
                    },
                    yAxis: {
                        type: 'value',
                        axisLabel: {
                            formatter: '{value} m/s'
                        },
                        axisLine: {
                            lineStyle: {
                                color: '#01ffff'
                            }
                        }
                    },
                    series: [
                        {
                            name:'风速',
                            type:'line',
                            data:[11, 11, 15, 13, 12, 13, 10, 11, 11, 15, 13, 12, 13, 10,11, 11, 15, 13, 12, 13, 10,7,6,7],
                            markPoint: {
                                data: [
                                    {type: 'max', name: '最大风速'},
                                    {type: 'min', name: '最小风速'}
                                ]
                            }
                        }
                    ]
                },
                '2-1-2-4':{
                    title: {
                        text: '历史PM2.5',
                        textStyle: {
                            color: '#01ffff',
                            fontSize: '20'
                        },
                        left: 20,
                        top: 10
                    },
                    xAxis: {
                        type: 'category',
                        boundaryGap: true,
                        data: ['1','2','3','4','5','6','7','8','9','10','11','12','13','14','15','16','17','18','19','20','21','22','23','0'],
                        axisLine: {
                            lineStyle: {
                                color: '#01ffff'
                            }
                        }
                    },
                    yAxis: {
                        type: 'value',
                        axisLabel: {
                            formatter: '{value} '
                        },
                        axisLine: {
                            lineStyle: {
                                color: '#01ffff'
                            }
                        }
                    },
                    series: [
                        {
                            name:'PM2.5',
                            type:'line',
                            data:[31, 51, 25, 33, 62, 33, 10, 80, 110, 12, 44, 66, 13, 10,30, 30, 15, 13, 40, 13, 10,7,6,29],
                            markPoint: {
                                data: [
                                    {type: 'max', name: '最高PM2.5'},
                                    {type: 'min', name: '最低PM2.5'}
                                ]
                            }
                        }
                    ]
                }
            }
        }
    },
    methods:{
        expandTable() {
            this.isExpand = !this.isExpand;
        }
    },
    components:{
        charts
    }
}
</script>
<style lang="scss">
.indoorhis {
    &-title {
        color: #01ffff;
        font-size: 24px;
        text-align: left;
    }
    &-content {
        margin: 20px 0;
        width: 100%;
        height: 200px;
    }
}
</style>

