<template>
    <div class="detail-container">
     <!-- 大标题 -->
      <h3 class="title">{{ newsInfo.title }}</h3>
      <!-- 子标题 -->
      <div class="subtitle">
        <span>发布时间：{{ newsInfo.add_time | dateFormat }}</span>
        <span class="click">点击 {{ newsInfo.click }}次</span>
      </div>
      <hr>
      <!-- 内容 -->
      <div class="content" v-html="newsInfo.content">
      </div>

      <!-- 引入公共的评论区 -->
      <!-- 父给子传值:属性绑定 -->
      <commont :id="id"></commont>

  </div>
</template>

<script>
//引入评论的子组件
import commont from '../common/common.vue'
// //引入弹框提示组件
// import {Toast} from 'mint-ui'
  export default {
    data(){
      return {
        //接收当前文档 并保存起来
        id:this.$route.params.id,
        newsInfo:{},
        
      }
    },
    
    created(){
      //初始化请求
      this.getnew();

    },
    methods:{
      getnew(){
        //发起ajax请求 获取新闻资讯详情
        this.$http.get('api/getnew/'+this.id).then(function(res){
          // console.log(res)
          if(res.body.status==0){
            this.newsInfo=res.body.message[0]
          }
        })
      }

    },
    //注册字组件
    components:{
        commont
    }
   


  }
</script>

<style lang='scss' scoped>
  .detail-container {
    padding:0 10px;
    .title{
      font-size:16px;
      color:red;
      text-align: center;
      padding:10px 0;
    }
    .content{
     /deep/ img{
        width:100%;
        height:100%;
      }
    }
  }
  
</style>