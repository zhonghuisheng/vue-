<template>
  <div>
    <div class="mui-numbox" data-numbox-min='1'>
      <button class="mui-btn mui-numbox-btn-minus" type="button">-</button>

      <input class="mui-numbox-input" ref="number" type="number" :value='goods_number' @change="changeNumber">
     
      <button class="mui-btn mui-numbox-btn-plus" type="button">+</button>
    </div>
  </div>
</template>

<script>

//引入js特效
import mui from '../../lib/mui/js/mui.js'
  export default {

     //接收父传递过来的商品数量和商品id
     props:['goods_number','id'],

     methods:{
      //修改购物车商品的数量
      changeNumber(){
        //获取数字输入框的数字
        var number =this.$refs.number.value;
        //商品id
        var id =this.id;
        //调用方法 把数量同步到本地存储
        this.$store.commit('changeNumber',{number:number,id:id})
      }
    },

   
    
     mounted(){
      //执行这里，说明虚拟dom已经挂载到真实dom中，这时候，可以用js去操作页面中的dom元素
      //初始化我们的number-box组件
      mui('.mui-numbox').numbox(); 
     },
     
  }
</script>

<style scoped>

</style>