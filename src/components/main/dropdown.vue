<template>
    <div class="tool-bar"> 
       <ul>
        <li v-for="(data, index) in datas" 
            :key="index" 
            :style="{fontSize: fontSize + 'px'}"
            @click.stop="itemClick(data, index)">
            <span>{{data.name}}</span>
            <dropdown v-if="data.children && data.children.length > 0"
                      :datas="data.children" :style="{fontSize: fontSize - 4 + 'px'}"></dropdown>
        </li>
       </ul> 
    </div>    
</template>
<script>
export default {
    name: 'dropdown',
    props: {
        datas: Array,
        fontSize: String
    },
    data() {
        return {
            activeItem: false
        }
    },
    methods: {
        itemClick: function (item, index) {
            console.log('itemClick');
            if(item.children && item.children.length > 0) {
               // this.$refs.children.$el.style.display = 'block'
            }
            else {
                this.$emit('change', item, index)
            }
        }
    }
}
</script>
<style lang="scss">
    .tool-bar {
       // display: none;
        ul {
            background: transparent;
            display: block;
            li {
                color: #01ffff;
                font-size: 28px;
            }
        }
    }
</style>


