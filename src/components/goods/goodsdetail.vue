<template>
  <div>
    <!-- 卡片 商品轮播图 -->
    <div class="mui-card ">
				<!-- <div class="mui-card-header">页眉</div> -->
				<div class="mui-card-content">
					<div class="mui-card-content-inner img">
            <!-- 引入商品轮播图 -->
						<swipe :lunbo="lunbo" ></swipe>
					</div>
				</div>
				<!-- <div class="mui-card-footer">页脚</div> -->
			</div>

    <!-- 商品购买区域 -->
      <div class="mui-card">
        <h2>{{GoodsInfo.title}}</h2>
        <hr/>
				<div class="mui-card-content">
					<div class="mui-card-content-inner">
            <div class="price">
              <span class="old">市场价:¥ {{GoodsInfo.market_price}}</span>
              <span class="now">销售价:¥ {{GoodsInfo.sell_price}}</span>
            </div>
            <div class="number"> 购买数量:
              <div class="mui-numbox" data-numbox-min='1' data-numbox-max='200'>
                <button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
                <input id="test" class="mui-input-numbox" type="number" value="5" />
                <button class="mui-btn mui-btn-numbox-plus" type="button">+</button>
              </div>
            </div>
            <div class="btn">
                <mt-button type="primary">立即购买</mt-button>
                <mt-button type="danger">加入购物车</mt-button>
            </div>
					</div>
				</div>
			</div>

      <!-- 商品参数区域 -->
      <div class="mui-card">
				<!-- <div class="mui-card-header">页眉</div> -->
				<div class="mui-card-content">
					<div class="mui-card-content-inner">
            <h4>商品参数</h4>
            <hr/>
            <div class="info">
                <div>商品货号: {{GoodsInfo.goods_no}}</div>
                <div>库存情况: {{GoodsInfo.stock_quantity}}</div>
                <div>上架时间: {{GoodsInfo.add_time | dateFormat}}</div>
            </div>
            <div class="button"> 
                 <mt-button type="primary" size="large" plain  @click="goodsdesc">图文介绍</mt-button>
                 <mt-button type="danger" size="large" plain class="common">商品评论</mt-button>
            </div>

					</div>
				</div>
				<!-- <div class="mui-card-footer">页脚</div> -->
			</div>
     </div>
</template>

<script>
//  引入第一个卡片商品轮播图组件
    import swipe from '../common/swipe.vue';
//引入mui的js文件
    import mui from '../../lib/mui/js/mui.js';

  export default {
     mounted(){
      //执行这里，说明虚拟dom已经挂载到真实dom中，这时候，可以用js去操作页面中的dom元素
      //初始化我们的number-box组件
      mui('.mui-numbox').numbox(); 
      },
    data(){
      return{
        id:this.$route.params.id,
        lunbo:[], //轮播图
        GoodsInfo:{}  //商品详情信息
      }
    },
    //注册商品轮播图组件
    components:{
      swipe
    },
    //初始化轮播图数据
    created(){
      this.getphoto(),
      this.getGoodsInfo() //商品详情信息自动请求
    },
    methods:{
      //跳转到商品图文的页面----------------------
      goodsdesc(){
         this.$router.push('/home/goodsdesc/'+this.id);
      },
      //获取轮播图---------------
      getphoto(){
        this.$http.get('api/getthumbimages/'+this.id).then(function(res){
          // console.log(res.body)
          if(res.body.message.length==0){
            // 表示当前商品没有图片 设置一个默认图片
            res.body.message.push({
              img:"http://img1.imgtn.bdimg.com/it/u=2956559318,464808035&fm=26&gp=0.jpg",
              src:"http://img1.imgtn.bdimg.com/it/u=2956559318,464808035&fm=26&gp=0.jpg"
            })

          }else{
            //有图片
            //由于轮播图组件 每个图都需要src与url属性 所以需要构造这两个数据
            res.body.message.forEach(element => {
              element.img=element.src;
              element.url=element.src;
            });
          }
          //赋值给当前的lunbo
           this.lunbo=res.body.message
        })
      },
      //获取商品的详情--------------
      getGoodsInfo(){
        this.$http.get('api/getgoodsinfo/'+this.id).then(function(res){
            // console.log(res)
          if(res.body.status==0){
            this.GoodsInfo=res.body.message[0];
          }
        })
      },
      
    }
    
  }
</script>

<style lang='scss' scoped>
  .btn{
    margin-top: 20px;
  }
  .number{
    margin-top: 20px;
  }
   .price{
     font-weight: bold;
     .old{
       text-decoration: line-through;
     }
     .now{
       color: red;
     }
   }
    // 商品参数区域
    .info{
      background-color: rgb(248, 241, 241);
     
    }
    .button{
      padding-top: 15px;
        .common{
          margin-top: 10px;
        }
    }
</style>