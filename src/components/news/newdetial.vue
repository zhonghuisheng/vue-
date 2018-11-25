<template>
  <div>
    <h1>新闻---{{id}}</h1>
  </div>
</template>

<script>
  export default {
    data(){
      return {
        //接收当前文档 并保存起来
        id:this.$route.params.id
      }
    }
  }
</script>

<style scoped>

</style>