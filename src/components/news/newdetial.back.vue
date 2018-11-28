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

      <!-- 评论区 -->
      <div class='comment'> 
        <h2 class="title">发表评论</h2>
        <textarea name=""  cols="30" rows="10" placeholder="请输入要BB的内容(最多888个字)" v-model="contents"></textarea>
        <mt-button type="primary" size="large" @click="btnBB()">发布评论</mt-button>
        <div class="list">
          <div class="list-item">
            <div class='info' v-for="(item,index) in comments" :key='index'>
              <div class="user">第{{index+1}}楼用户: 发表时间:  {{item.add_time|dateFormat}}      </div>
              <div class="content1">
                  {{item.content}}
              </div>
            </div>
          <!-- 加载评论 -->
          <mt-button type="danger" plain size="large" @click="morecontent()">加载更多</mt-button>
          </div>
        </div>
      </div>

  </div>
</template>

<script>
//引入弹框提示组件
import {Toast} from 'mint-ui'
  export default {
    data(){
      return {
        //接收当前文档 并保存起来
        id:this.$route.params.id,
        newsInfo:{},
        pageindex:1,//默认加载第一页的评论数据
        comments:[], //评论数据 上面循环
        contents:''  //获取评论
      }
    },
    created(){
      //初始化请求
      this.getnew();
      this.getComments()

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
      },
      //获取当前数据的评论
      getComments(){
        this.$http.get('api/getcomments/'+this.id+'?pageindex='+this.pageindex).then(function(res){
            // console.log(res)
            if(res.body.status==0){
              if(res.body.message.length==0){
                Toast('没有更多啦')
              }
              // this.comments=res.body.message
              //加载评论数据 不能覆盖原评论数据 使用concat连接 在一起
               this.comments=this.comments.concat(res.body.message)
            }
        })
      },
      //btnBB()//发表评论的方法 ------------------------------
      btnBB(){
        //判断是否为空
        if(this.contents.trim()==''){
          Toast('内容不能为空');
          return;
        }
        //发送Ajax请求
        this.$http.post('api/postcomment/'+this.id,{content:this.contents}).then(function(res){
          // console.log(res)
          if(res.body.status==0){
            Toast('评论成功');
            this.contents='' //清空评论信息
            this.comments=[]; //数据清空
            this.getComments(); //重新获取评论信息
             
          }
        })
      },
      //加载更多评论-----------------------------------------
      morecontent(){
        this.pageindex ++
       this.getComments();
      }
    }


  }
</script>

<style lang='scss' >
  .detail-container {
    padding:0 10px;
    .title{
      font-size:16px;
      color:red;
      text-align: center;
      padding:10px 0;
    }

    .subtitle{
      color:blue;
      font-size:13px;

      .click{
        float:right;
      }
    }
    textarea{
      font-size: 14px;
      height: 120px;
    }
    .user{
      background-color:#ccc;
      font-size: 13px;
      padding: 5px;
    }
    .list{
      padding: 0px 5px;;
    }
    
  }
  .content1{
     /deep/ img{
        width:100%;
        height:100%;
      }
    }
</style>