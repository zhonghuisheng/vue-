<template>
  <div class="home-container">
    <!-- 首页的轮播图 -->
    <!-- 父给子传递数据 属性绑定 -->
    <swipe :lunbo="lunbo"></swipe>
     <!-- <mt-swipe :auto="3000">
      <mt-swipe-item v-for="item in lunbo" :key="item.url">
        <img :src="item.img" alt="" class="img">
      </mt-swipe-item>
    </mt-swipe> -->
     <!-- 九宫格  -->
    <ul class="mui-table-view mui-grid-view mui-grid-9">
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <router-link  to='/home/newlist'>
          <img src="../../images/menu1.png" alt="">
          <div class="mui-media-body">新闻资讯</div>
        </router-link>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
          <router-link to='home/photolist' >
            <img src="../../images/menu2.png" alt="">
              <div class="mui-media-body">图片分享</div>
          </router-link>
        </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <router-link to='/home/goodslist'>
           <img src="../../images/menu3.png" alt="">
          <div class="mui-media-body">商品购买</div>
        </router-link>
        </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
          <img src="../../images/menu4.png" alt="">
          <div class="mui-media-body">留言反馈</div>
        </a></li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
           <img src="../../images/menu5.png" alt="">
          <div class="mui-media-body">视频专区</div>
        </a></li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
          <img src="../../images/menu6.png" alt="">
          <div class="mui-media-body">联系我们</div>
        </a></li>
      
    </ul>
  </div>
</template>

<script>
//引入公共轮播图组件
import swipe from '../common/swipe.vue'
  export default {
    data() {
      return {
        lunbo: []
      }
    },
    created() {
      this.getlunbo();
    },
    methods: {
      getlunbo() {
        // console.log('ajax请求')
        this.$http.get('http://127.0.0.1:3000/api/getlunbo').then(function (res) {
          if (res.body.status == 0) {
            this.lunbo = res.body.message;
          }
        })
      }
    },
    components:{
      swipe
    }
  }
</script>

<style lang='scss' scoped>
  .home-container {
    
    .mui-grid-9{
    background-color: #fff;
    .mui-table-view-cell{
      border: none;
    }
   }
   .mui-table-view img{
     width: 50%;
   }
  }
  
  
</style>