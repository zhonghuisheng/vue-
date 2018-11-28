<template>
  <div class="photo-container">
    <h2 class="title">{{photoInfo.title}}</h2>
    <p class="subtitle">
      <span>发表时间 {{photoInfo.add_time}}</span>
      <span class="click">点击{{photoInfo.click}}次</span>
    </p>
    <hr/>
    <!-- 图片区域 -->
    <vue-preview :slides="photohumb" ></vue-preview>
    
    <!-- 文章内容 -->
    <div class="content" v-html="photoInfo.content">
    </div>

    <!-- 引入评论的公共组件 -->
    <commont :id="id"></commont>
  </div>

</template>


<script>
//引入评论的公共组件
  import commont from '../common/common.vue'
  export default {
    data(){
      return{
        //接收路由传送过来的id
        id:this.$route.params.id,
        photoInfo:{} , //存储当前图片的详情数据
        photohumb:[]
      }
    },
    created() {
      this.getphotoInfo()  //获取文章内容 标题等 
      this. getphotohumb()  //获取图片
    },
    methods:{
      getphotoInfo(){
        this.$http.get('api/getimageInfo/'+this.id).then(function(res){
          // console.log(res)
          if(res.body.status==0){
            this.photoInfo=res.body.message[0]
          }
        })
      },
      getphotohumb(){   //获取图片的缩略图
        this.$http.get('api/getthumbimages/'+this.id).then(function(res){
          // console.log(res)
          if(res.body.status==0){
            //由于vue-preview 插件 需要每个图片设置msre w 和h 属性 不然图片出不来
            res.body.message.forEach(element => {
              element.w=600;
              element.h=400;
              element.msrc=element.src
            });
            this. photohumb=res.body.message
          }
        })
      }
    },
    //注册评论字组件
    components:{
      commont
    }
  }
</script>


<style lang="scss" scoped>
  .photo-container{
    .title{
      text-align: center;
      color:blue
    }
  }
  img{
    width: 100%
  }
  .subtitle{
    display:flex;
    justify-content: space-between
  }
  .images{
    padding: 5px ;
  }
</style>