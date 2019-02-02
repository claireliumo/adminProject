<template>
    <div class="config">
        <div class="config_title">
            数据录入
        </div>
    </div>
</template>
<script>
export default {
    name: 'manage',
    props: {},
    data(){
        return {

        }
    }
}
</script>
<style lang="scss" scoped>
.config {
    width: 100%;
    height: 100%;
    position: relative;
    background: linear-gradient(#023838, #011f1f);
    &_title{
      //  width: 100%;
        height: 80px;
        line-height: 80px;
        color: #01ffff;
        font-size: 50px;
        font-weight: 600;
        text-align: left;
        margin: 0 30px;
        padding: 3px 10px;
        border-bottom: 3px solid #01ffff;
    }
}
</style>

