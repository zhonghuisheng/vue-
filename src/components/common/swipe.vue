<template>
  <div class="swipe">
  <mt-swipe :auto="3000">
      <mt-swipe-item v-for="item in lunbo" :key="item.url">
        <img :src="item.img" alt="" class="img">
      </mt-swipe-item>
    </mt-swipe>
  </div>
</template>

<script>
  export default {
    //使用props来接收父组件传递的数据
    props:['lunbo']
    
  }
</script>

<style lang='scss' scoped>
.swipe{
  .mint-swipe-item{
    text-align: center
  }
  height: 200px;
    

   /deep/ img {
      //  width: 80%;
      height: 100%;
    }
}
  
</style>