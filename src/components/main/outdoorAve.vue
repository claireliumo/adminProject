<template>
    <div class="outdoorave">
        <div class="outdoorave-title" @click="expandTable">
            <i class="el-icon-plus" v-if="!isExpand"></i>
            <i class="el-icon-minus" v-else></i>
            {{datas.title}}
        </div>
        <div class="outdoorave-content" v-if="isExpand">
            <charts :containerId ="'charts' + datas.key" :customOption="options" ref="chart"></charts>
        </div>
    </div>
</template>
<script>
import charts from './charts'
export default {
    name: 'OutdoorAve',
    props: {
        datas: Object,
        options: {
            type: Object,
            default: ()=>{ return {}}
        }
    },
    data() {
        return {
            isExpand: false,
            //options: {},
            result: []
        }
    },
    components: {
        charts
    },
    methods: {
        expandTable() {
            this.isExpand = !this.isExpand;
        }
    }
}
</script>
<style lang="scss">
.outdoorave {
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


