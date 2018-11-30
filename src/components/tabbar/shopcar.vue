<template>
   <div>
     <!-- 购物车商品列表 -->
  			<div class="mui-card" v-for="(item,index) in goodlist" :key="item.id">
				<div class="mui-card-content">
					<div class="mui-card-content-inner">
            <div class="cart" >
              <!-- 切换开关绑定change事件 -->
              <mt-switch v-model="$store.getters.getGoodsSelect[item.id]" @change="changeSelected(item.id,$store.getters.getGoodsSelect[item.id])" ></mt-switch>
              <img :src="item.thumb_path" >
              <div class="box">
                <h5>{{item.title}}</h5>
                <div class="monery">
                  <span class="font">￥{{item.sell_price}}</span> 
                  <!-- 引用子组件  -->
                  <!-- 父给子传递数据 -->
                  <!-- 把购物车商品的数量和id传递给子组件 -->
                   <box :goods_number="$store.getters.getGoodsNumber[item.id]" :id="item.id"></box>   
                   <a href="#" @click.prevent="delCarGoods(item.id,index)">删除</a>
                </div>
              </div>
            </div>
					</div>
				</div>
			</div>
     <!-- 购物车结算区域 -->
     <div class="jiesuan">
     <div class="mui-card">
				<div class="mui-card-content">
					<div class="mui-card-content-inner">
            <div class="accounts">
              <div class="total">总计(不含运费)</div>
              已勾选商品 <span class="color">{{$store.getters.getSelectGoodsInfo['selectedNumber']}}</span>件 ,总价<span class="color">￥{{$store.getters.getSelectGoodsInfo['selectedPrice']}}</span> 
              <button type="button" class="mui-btn mui-btn-warning">去结算</button>
            </div>

					</div>
				</div>
			</div>
      </div>
      <!-- <p>{{$store.getters.getSelectGoodsInfo['selectedNumber']}}</p> -->
 </div>

</template>

<script>

//引入数字加减按钮
import box from '../common/carnumberbox.vue'
  export default {
    data(){
      return{
        goodlist:[],
        // flag:false
      }
    },
    //注册组件 (数字增加按钮)
      components:{
        box
      },
      created(){
        this.getGoodsList()
      },
      methods:{
        //删除购物车商品
        delCarGoods(id,index){
          //重新渲染购物车   (删除商品goodslist中的数据)
            this.goodlist.splice(index,1)
            //同步到本地存储
            this.$store.commit('delCarGoods',id)
            
           
        },
        //改变按钮的选定状态
      changeSelected(id,selected){
          this.$store.commit('changeSelected',{id:id,selected:selected})
      },
        //获取购物车的商品
        getGoodsList(){
          //先获取到购物车的商品id 拼接成一个字符串 88,89
          var id=this.$store.getters.getGoodsIds;
          //如果购物车没有数据则不发送ajax请求
          if(id==''){
            return;
          }
          this.$http.get('api/getshopcarlist/'+id).then(function(res){hjnink
            // console.log(res)
            if(res.body.status==0){
              this.goodlist=res.body.message;
            }
          })
        }
      },
      
  }
</script>

<style lang="scss" scoped>
  .cart{
    margin-top: 10px;
    display: flex;

    img{
      width: 60px;
      height: 60px;
     margin-right:10px;
    }
  }
  .monery{
    display: flex;
  }
  .font{
    color:red;
    font-weight: bold;
    font-size:14px;
  }
  h5{
    font-size:15px;
    font-weight: bold;
    color: black;
  }
  //结算区域
  .jiesuan{
          margin-bottom: 10px;

    .total{
      margin: 10px;
        
    }
    button{
      margin-left: 50px;
    }
  }
  .color{
          color: red;
          font-weight: bold;
          font-size: 16px;
        }
  .accounts{
    align-items: center;
  }
</style>