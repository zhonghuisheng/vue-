
//导入jqery类库 
import $ from 'jquery';

//导入vue模块--------------------------
import Vue from 'vue';

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

// //导入路由-----------------------------
// import Vuerouter from "vue-router"
// // 挂载路由到Vue身上
// Vue.use(Vuerouter);

// //引入四个页面----------------------------------------------------------
// import member from "./components/tabbar/member.vue";
// import shopcar from "./components/tabbar/shopcar.vue";
// import home from "./components/tabbar/home.vue";
// import search from "./components/tabbar/search.vue";
// // 实例化路由
// var router=new VueRouter({
//   routes:[
//     {path:'/',redirect:'/home'},  //重定向到首页
//     {path:'/member',component:member},
//     {path:'/shopcar',component:shopcar},
//     {path:'/home',component:home},
//     {path:'/search',component:search},
//   ],
//   //修改选中选项卡的显示高亮
//   'linkActiveClass':'mui-active'
  
// })

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
  router
  
})