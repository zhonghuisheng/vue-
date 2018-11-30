
//导入jqery类库 
import $ from 'jquery';

//导入vue模块--------------------------
import Vue from 'vue';

//引入vuex实现组件数据共享-------------------(购物)
import Vuex from 'vuex'
//安装到vUE身上去
Vue.use(Vuex)

//一开始就从本地获取购物车中的商品数量 
var carData=JSON.parse(localStorage.getItem('carData') || '[]');
//实现数据共享 
var store=new Vuex.Store({
    //数据共享定义在state中
    state:{
      carData:carData   //获取这个共享数据使用 this.$stroe.state.xxx (这个xx为price)
    },
    // 属性mutations 专门用来修改state中的数据--------------------------------------------------------------------------------
    mutations:{
      //调用这个方法 this.$store.commit('方法名','唯一的参数')
     add(state,data){
       
       var flag=false; //默认没有相同商品
       //如果有相同商品 则只需要加数量
       state.carData.forEach(function(item,index) {
         if(item.id==data.id){
           //找到相同商品 增加数量
           var oldnumber=parseInt(item.number)
           oldnumber +=parseInt(data.number);
           item.number=oldnumber;
           flag=true;  //找到了相同商品把标识改为true
         }
       });
        if(flag==false){
          //上面循环没有找到相同商品,则添加一个商品
          state.carData.push(data);
        }
        //把商品写入本地存储
        localStorage.setItem('carData',JSON.stringify(state.carData));
      },
      //修改商品的选中状态
      //改变按钮的选定状态---------------------------------------
      changeSelected(state,obj){  
          //  console.log(obj)
          state.carData.forEach(function(item,index){
            //找到对应商品id 修改带过来的状态
            if(item.id==obj.id){
              item.selected=obj.selected;
            }  
          });
          //需要同步到本地存储
          localStorage.setItem('carData',JSON.stringify(state.carData));
      },
          //删除购物车商品-------------------------------------------------
          delCarGoods(state,id){
            state.carData.forEach(function(item,index){
                if(item.id==id){
                  //删除当前的id元素
                  state.carData.splice(index,1);
                  //需要同步到本地存储
                  localStorage.setItem('carData',JSON.stringify(state.carData));
                }
            });
          },
          //修改购物车数量---------------
          changeNumber(state,obj){
              //修改数量 
              state.carData.forEach(function(item,index){
                  if(item.id==obj.id){
                    //找到了对应的id 修改商品数量 
                    item.number=obj.number
                  }
              });
              //同步到本地存储
             localStorage.setItem('carData',JSON.stringify(state.carData));

          }
      
     
    },
    //使用getters  (向外暴露数据 如在购物车上显示数量) -----------------------------------------------------------------
    //调用形式: this.$store.getters.方法名
    getters:{
      getTotalNumber(state){
        //算出商品的总数量 -----------------------
        var totalNumber=0;
        state.carData.forEach(function(item,index){
          totalNumber +=parseInt(item.number);
          // console.log(totalNumber)  
        });
        //返回外面所需要的值
        return totalNumber;
      },
      //获取购物车商品字符串id----------------------------------
      getGoodsIds(state){
        var ids=[];
        state.carData.forEach(function(item,index){
          ids.push(item.id); 
        })
        //变成字符串
        return ids.join(',')
      },
      //获取购物车商品id和对应数量的对象 {商品id:商品数量number,id:number}--------------------------------
      getGoodsNumber(state){
        var obj={};
        state.carData.forEach(function(item,index){
         obj[item.id]=item.number;
        });
        return obj;
      },
      //获取商品的选中对象{商品id:商品先中状态}--------------------
      getGoodsSelect(state){
        var obj={};
        state.carData.forEach(function(item,index){
         obj[item.id]=item.selected;
        });
        return obj;
      },
      // 获取购物车商品的总数量和总价格-----------------------------------------
      getSelectGoodsInfo(state){
        var obj={
          selectedNumber:0,
          selectedPrice:0,
        }
        state.carData.forEach(function(item,index){
          //判断是否选中
          if(item.selected==true){
            obj['selectedNumber']+=parseInt(item.number);
            obj['selectedPrice']+=parseInt(item.price)*parseInt(item.number);
          }
         });
         return obj;
      }


    }
})






//引入moment模块-----------------------
import moment from 'moment'
//定义全局过滤器
Vue.filter('dateFormat',function(dateStr,pattern="YYYY-MM-DD HH:mm:ss"){
  return moment(dateStr).format(pattern);
})

//引入vue-resource模块 用来发送ajax-----------
import vueResource from "vue-resource"
//安装到Vue的身上去
 Vue.use(vueResource);

 //全局设置请求ajax的根域名
 Vue.http.options.root="http://127.0.0.1:3000";
 //全局设置post请求体，默认post表单传递数据
Vue.http.options.emulateJSON = true;

//导入app.vue根组件 -------------------
import app from "./app.vue"



//引入路由
import router from './router'


//引入mint-ui组件-------------------------
import { Header } from 'mint-ui';
import 'mint-ui/lib/style.css'
import VueRouter from 'vue-router';
import { Swipe, SwipeItem } from 'mint-ui';
Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);
Vue.component(Header.name, Header);
//引入发布评论按钮
import { Button } from 'mint-ui';
Vue.component(Button.name, Button);
//引入购物车按钮开关
import { Switch } from 'mint-ui';
Vue.component(Switch.name, Switch);


//按需引入vant滑动组件-----------------
import { Tab, Tabs } from 'vant';
import 'vant/lib/index.css';
Vue.use(Tab).use(Tabs);

//引入mint懒加载组件--------------------------
import { Lazyload } from 'mint-ui';
Vue.use(Lazyload);

//引入mui css样式-------------------------
import './lib/mui/css/mui.min.css';
//引入mui 字体图标 购物车-------------------------
 import './lib/mui/css/icons-extra.css';

 //引入图片预览的插件--------------------------------
 import VuePreview from 'vue-preview'
Vue.use(VuePreview)


//实例化Vue
new Vue({
  el:"#app",
  // render:function(c){   可以简写为下面
  //   return c(app)
  render:(c)=> c(app),  //根目录 app.vue 渲染
  //把路由挂载到Vm实现身上
  router,
    //把数据共享挂载到vm身上
  store
})