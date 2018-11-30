//导入路由-----------------------------
import VueRouter from "vue-router"

//导入vue模块--------------------------
import Vue from 'vue';
// 挂载路由到Vue身上
Vue.use(VueRouter);

//引入四个页面----------------------------------------------------------

import member from "./components/tabbar/member.vue";
import shopcar from "./components/tabbar/shopcar.vue";
import home from "./components/tabbar/home.vue";
import search from "./components/tabbar/search.vue";
import newlist from "./components/news/newlist.vue";
 import newdetial from "./components/news/newdetial.vue";
 import photolist from "./components/photo/photolist.vue";
 import photodetail from "./components/photo/photodetail.vue";
 import goodslist from "./components/goods/goodslist.vue";
 import goodsdetail from "./components/goods/goodsdetail.vue";
 import goodsdesc from "./components/goods/goodsdesc.vue";
 import goodscommon from "./components/goods/goodscommon.vue";

 
// 实例化路由-----------------------------------------------------------
var router=new VueRouter({
  routes:[
    {path:'/',redirect:'/home'},  //重定向到首页
    {path:'/member',component:member},
    {path:'/shopcar',component:shopcar},
    {path:'/home',component:home},
    {path:'/search',component:search},
    {path:'/home/newlist',component:newlist},
    {path:'/home/newdetial/:id',component:newdetial},
    {path:'/home/photolist',component:photolist},
    {path:'/home/photodetail/:id',component:photodetail},
    {path:'/home/goodslist',component:goodslist},
    {path:'/home/goodsdetail/:id',component:goodsdetail},
    {path:'/home/goodsdesc/:id',component:goodsdesc},
    {path:'/home/goodscommon/:id',component:goodscommon},
  ],
  //修改选中选项卡的显示高亮
  'linkActiveClass':'mui-active'
  
})

//暴露目标
export default router;