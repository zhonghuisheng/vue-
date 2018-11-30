<template>
  <div class="app-container">
     <h1>会员</h1> 
     <button @click="change1">改变增加</button> 
  </div>
</template>

<script>
  export default {
     data(){
       return{
         price:'this.store.state.price'
       }
     },
     methods:{
       change1(){
         this.$store.commit('change',{p1:100,p2:200})
       }
     }
  }
</script>

<style scoped>

</style>