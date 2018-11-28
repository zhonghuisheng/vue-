<template>
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
          <mt-button type="danger" plain size="large" @click="morecontent()" class="more">加载更多</mt-button>
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
        
        pageindex:1,//默认加载第一页的评论数据
        comments:[], //评论数据 上面循环
        contents:''  //获取评论
      }
    },
    // 接收父传过来的id
    props:['id'],
    created(){
      //初始化请求
      this.getComments()

    },
    methods:{
      
       //获取当前数据的评论
      getComments(){
        //当前id是父给子传送的id
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
           console.log(res)
          if(res.body.status==0){
            Toast('评论成功');
            this.contents='' //清空评论信息
            this.comments=[]; //数据清空
            this.pageindex=1;   
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

<style lang='scss' scoped>
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
   
    .more{
      margin-top: 20px;
    }
  }
  .user{
    background-color: #ccc;
  }
</style>
