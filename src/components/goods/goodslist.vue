<template>
    <div class="goodslist">
      <router-link class="item" :to="'/home/goodsdetail/'+item.id" tag="div" v-for="item in goodlist" :key="item.id">
        <img v-lazy="item.img_url" alt="">
        <h2 class="title">{{item.title}}</h2>
        <div class="info">
          <p class="price">
            <span class="now">¥{{item.sell_price}}</span>
            <span class="old">¥ {{item.market_price}}</span>
          </p>
          <p class="hot">
            <span>热卖中</span>
            <span>剩{{item.stock_quantity}}件</span>
          </p>
        </div>
      </router-link>

      <!-- 加载更多 -->
      <mt-button type="danger" size="large" @click="morelist">加载更多</mt-button>
    
    </div>
  
</template>

<script>
  export default {
    data(){
      return{
        goodlist:[],
        pageindex:'1'
      }
    },
    created(){
      this.getlist()
    },
    methods:{
      // 发起请求ajax 获取接口商品列表数据
      getlist(){
        this.$http.get('api/getgoods?pageindex='+this.pageindex).then(function(res){
           console.log(res);
          if(res.body.status==0){
            this.goodlist=this.goodlist.concat(res.body.message);
          }
        })
      },
      //加载更多
      morelist(){
       this. pageindex ++;
        this.getlist();
      }
    }

  }
</script>


<style lang='scss' scoped>
  .goodslist {
    // 设置容器为弹性布局
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;

    padding: 8px;

    .item {
      width: 48%;
      border: 1px solid #ccc;
      margin-bottom: 5px;
      box-shadow: 0px 0px 5px #ccc;
      border-radius: 3px;
      padding:4px;

      display:flex;
      // 垂直排列
      flex-direction: column;
      // 设置上顶端和底部对齐
      justify-content: space-between;

      // display: flex;
      // // 垂直排列
      // flex-direction: column; 
      // // 设置上下顶端和底部对齐
      // justify-content: space-between;

      .title {
        font-size: 15px;
      }

      .info {
        // background-color:rgba(109, 103, 103, 0.2);
        background-color:#eee;
        padding:3px 5px;
        margin:0px;
        .price {
          .now {
            color: red;
            font-weight: bold;
          }

          .old {
            text-decoration: line-through;
            margin-left: 8px;
            font-size: 12px;
          }
        }


        .hot{
          display: flex;
          justify-content: space-between;
        }
      }



    }

    img {
      width: 100%;
    }
  }
</style>