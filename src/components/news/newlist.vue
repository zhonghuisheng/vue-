<template>
    <ul class="mui-table-view">
      <li class="mui-table-view-cell mui-media" v-for="item in newlist" :key='item.id'>
        <router-link :to="'/home/newdetial/'+item.id">
          <img class="mui-media-object mui-pull-left" :src="item.img_url">
          <div class="mui-media-body">
            <h4>{{item.title}}</h4>
            <p class="size">
              <span class="mui-ellipsis">发布时间:{{item.add_time}}</span>
              <span class="click">点击:{{item.click}}次</span>
            </p>
          </div>
        </router-link>
      </li>
    </ul>
</template>

<script>
  export default {
    data(){
      return{
        newlist:[]
      }
    },
    created(){
      this.getnewslist()
    },
    methods:{
     getnewslist(){
       //获取新闻列表的数据
        this.$http.get("api/getnewslist").then(function(res){
          if(res.body.status==0){
              this.newlist=res.body.message
          }
          
      })
     }
    }
  }
</script>

<style scoped>
  .size{
    font-size: 12px;
    color: blue
  }
  .mui-table-view h4{
      font-size: 14px;
  }
  .click{
    float: right;
  }
</style>