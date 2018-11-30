<template>
  <div class="content">
    <h3>{{goodsinfo.title}}</h3>
    <hr/>
    <div class="text" v-html="goodsinfo.content">
    </div>
  </div>
</template>

<script>
  export default {
    data(){
      return{
          id:this.$route.params.id,
          goodsinfo:{}
      }
    },
    created(){
      this.getinfo()
    },
    methods:{
      getinfo(){
        this.$http.get('api/getgoodsdesc/'+this.id).then(function(res){
          //  console.log(res)
          if(res.body.status==0){
            this.goodsinfo=res.body.message[0]
          }
        })
      }
    }
  }
</script>

<style lang='scss' scoped>
  .content{
    padding: 15px;
    h3{
    color: blue;
  }
  text{
    font-size: 13px;
    
    }
  }
  /deep/ img{
      width: 100%;
      height: 100%
  }
    
</style>