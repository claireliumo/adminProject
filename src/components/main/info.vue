<template>
    <div class="info">
        <div class="info-title" @click="expandTable">
            <i class="el-icon-plus" v-if="!isExpand"></i>
            <i class="el-icon-minus" v-else></i>
            {{datas.title}}
        </div>
        <div class="info-content" v-show="isExpand">
            <table>
                <tr v-for="data in result" :key="data.name">
                    <td>{{data.name}}</td>
                    <td>{{data.data}}</td>
                </tr>
            </table>
        </div>
    </div>
</template>
<script>
export default {
    name: 'info',
    props: {
        datas: Object
    },
    data() {
        return {
            isExpand: false,
            result: [
                {
                    name: '用地面积',
                    data: '29450 M²'
                },
                {
                    name: '建筑数量',
                    data: '8'
                },
                {
                    name: '总建筑面积',
                    data: '58900 m2'
                },
                {
                    name: '容积率',
                    data: '2.0'
                },
                {
                    name: '绿地率',
                    data: '30%'
                }
            ]
            
        }
    },
    methods: {
        expandTable: function(){
            this.isExpand = !this.isExpand;
            if(this.datas.title === '园区概况'){
                this. result = [
                    {
                        name: '用地面积',
                        data: '29450 M²'
                    },
                    {
                        name: '建筑数量',
                        data: '8'
                    },
                    {
                        name: '总建筑面积',
                        data: '58900 m2'
                    },
                    {
                        name: '容积率',
                        data: '2.0'
                    },
                    {
                        name: '绿地率',
                        data: '30%'
                    }
                ]
            }
            else {
                this.result = [
                {
                    name: '建筑面积',
                    data: '7643 M²'
                },
                {
                    name: '建筑高度',
                    data: '26.06 m'
                },
                {
                    name: '建筑时间',
                    data: '2018'
                },
                {
                    name: '层数',
                    data: '5'
                }
            ]
            }
            //request table data
        }
    }
}
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
                    &:first-child{
                        width: 40%;
                    }
                }
            }
        }
    }
}
</style>

