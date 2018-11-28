<template>
  <div class="postlist">
    <van-tabs v-model="active" @click="getImages">
      <van-tab v-for="item in cats" :key='item.id' :title="item.title" >
         
          <div class="content">
            <router-link tag="div" :to="'/home/photodetail/'+item.id" class="img" v-for="item in images" :key="item.id" >
              <!-- 图片懒加载 -->
              <img v-lazy="item.img_url" alt="">
              <div class="info">
                <div class="title">{{item.title}}</div>   
                <div class="zhaiyao">{{item.zhaiyao}}</div>   
              </div>
            </router-link>
          </div>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
  export default {
    data(){
      return{
        active:'0',
        cats:[] ,  //存储标签页
        images:[] 
      }
    },
    created(){
      //标签页面的数据 
      this.getmessage();
      //初始化标签页为 全部的数据 
      this.getImages(0,'全部') ;
    },
    methods:{
      //标签页面的数据 
      getmessage(){
        this.$http.get('api/getimgcategory').then(function(res){
           console.log(res)
          if(res.body.status==0){
            this.cats=res.body.message
            //需要设置一个全部的标签页面
            this.cats.unshift({id:0,title:'全部'})
          }
        })
      },
      //标签页的单击事件
      getImages(index,title){
        // console.log(index)
        // console.log(title)
        //获取对应 的分类id 通过Index来取出数据
        //由于cats默认是一个空数组 是没有数据 通过index下标,获取不到对应的id值
        var id=this.cats.length==0?0: this.cats[index].id;
        // console.log(id) 
        //发送ajax请求 获取对应分类的图片列表数据
        this.$http.get('api/getcatimages/'+id).then(function(res){
          // console.log(res)
          if(res.body.status==0){
            this.images=res.body.message
          }
        }) 
      }

    }
  }
</script>

<style lang='scss' scoped>
  .postlist{
    padding: 5px;
     .content{
        position: relative;
        // display: flex;
        // flex-direction: column;
        // justify-content: space-between;
      }
      img{
        width: 100%;
      }
      .info{
         background-color: #ccc;
        //  position: absolute;
        bottom: 0px;  
      }
  }
 
  
</style>