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
    name: 'IndoorReal',
    props: {
        datas: Object
    },
    data() {
        return {
            isExpand: false,
            result: [
                {
                        name: '温度',
                        data: '-9 ℃'
                    },
                    {
                        name: '湿度',
                        data: '15%'
                    },
                    {
                        name: 'VOC',
                        data: '2.7 m/s'
                    },
                    {
                        name: 'PM2.5',
                        data: '92 μg/m³'
                    }
            ]
            
        }
    },
    methods: {
        expandTable: function(){
            this.isExpand = !this.isExpand;
            
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

