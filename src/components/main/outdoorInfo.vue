<template>
    <div class="realtime-info">
        <table>
            <tr v-for="data in result" :key="data.name">
                <td>{{data.name}}</td>
                <td>{{data.data}}</td>
            </tr>
        </table>
    </div>
</template>
<script>
export default {
    name: 'outdoorInfo',
    props: {

    },
    mounted(){
        //请求数据
        this.result = [
                    {
                        name: '实时温度',
                        data: '-4 ℃'
                    },
                    {
                        name: '实时相对湿度',
                        data: '20%'
                    },
                    {
                        name: '实时风向',
                        data: '西南'
                    },
                    {
                        name: '实时风速',
                        data: '3.0 m/s'
                    },
                    {
                        name: '实时PM2.5',
                        data: '92 μg/m³'
                    }
                ]
    },
    data(){
        return {
            result: []
        }
    }
}
</script>

<style lang="scss" scoped>
.realtime-info{
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
</style>
