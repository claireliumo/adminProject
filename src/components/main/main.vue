<template>
  <div>
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
