<template>
  <div>
   <!-- 父给子传递数据  -->
    <common :id='id'></common>
  </div>
</template>

<script>
//引入公共评论的子组件 
import common from '../common/common.vue';
  export default {
    data(){
      return {
        //接收路由参数
        id:this.$route.params.id
      }
    },
    // 注册评论组件
    components:{
      common
    },
    
   

  }
</script>

<style scoped>

</style>