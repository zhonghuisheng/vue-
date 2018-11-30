<template>
  <div class="app-container">
    <!-- 头部 -->
    <mt-header fixed title="固定在顶部">
       <span  slot="left" @click="getback"  v-show="flag">
        <mt-button icon="back">返回</mt-button>
      </span>
    </mt-header>


    <!-- 中间部分 -->
    
    <router-view></router-view>

    <!-- 底部部分 -->
   
    <nav class="mui-bar mui-bar-tab">
      <router-link  class="mui-tab-item " to="/home">
        <span class="mui-icon mui-icon-home"></span>
        <span class="mui-tab-label">首页</span>
      </router-link>
      <router-link class="mui-tab-item" to="/member">
        <span class="mui-icon mui-icon-contact"></span>
        <span class="mui-tab-label">会员</span>
      </router-link>
      <router-link class="mui-tab-item" to="/shopcar">
        <span class="mui-icon mui-icon-extra mui-icon-extra-cart"><span class="mui-badge">{{$store.getters.getTotalNumber}}</span></span>
        <span class="mui-tab-label">购物车</span>
      </router-link>
      <router-link class="mui-tab-item" to="/search">
        <span class="mui-icon mui-icon-search"></span>
        <span class="mui-tab-label">搜索</span>
      </router-link>
    </nav>
  </div>
</template>

<script>
  export default {
    data(){
      return{
        flag:true   //控制返回按钮是显示还是隐藏
      }
    },
      methods:{
        getback(){
          history.go(-1)
        }
      },
      //使用watch来监听路由对象
      watch:{
        '$route':function(newvalue,oldvalue){
          if(newvalue.path=='/home'){
            this.flag=false
          }else{
            this.flag=true
          }
        }
      }
  }
</script>

<style scoped>
  .app-container{
    margin-top: 40px;
    margin-bottom: 80px;
  }
</style>