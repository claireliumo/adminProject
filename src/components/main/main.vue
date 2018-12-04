<template>
  <div class="main">
   <Header />

  </div>
</template>
<script>
import Header from './header.vue'
export default{
  name: 'Main',
  methods: {
    handleSelectChange: function (key) {
      console.log(key)
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
    width: 100%;
    height: 100vh;
  }
</style>
