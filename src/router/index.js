import Vue from 'vue'
import VueRouter from 'vue-router'
import login from "@/views/Login";
import  index from "@/views/Index"
import houseHolder from "@/components/HouseHolder";
import personal from "@/components/Personal";
import profile from "@/components/Profile";
import notFound from "@/views/NotFound";
import avatar from "@/components/Avatar";
import houserHolderInfo from "@/components/HouserHolderInfo";
import comment from "@/components/Comment";
import commentInfo from "@/components/CommentInfo";
import addCommentInfo from "@/components/AddCommentInfo";
import moveIn from "@/components/MoveIn";
import moveOut from "@/components/MoveOut";


Vue.use(VueRouter)



const routes = [
  {
    path: '/logout',
    name: 'logout',
    redirect:'/login'
  },

  {
    path: '/',
    name: 'default',
    redirect:'/login'
  },

  {
    path: '/login',
    name: 'login',
    component: login
  },

  {
    path: '/index',
    name: 'main',
    component: index,
    props:true,
    //嵌套路由
    children: [
      {
        path: '/index/houseHolder',
        component: houseHolder,
      },
      {
        path:'/index/houseHolder/info',
        name:"houseHolderInfo",
        component:houserHolderInfo,
        props:true
      },
      {
        path: '/index/personal/:id',
        name:"personal",
        component: personal,
        props:true
      },
      {
        path: '/index/profile',
        name:"profile",
        component: profile,
        props:true
      },
      {
        path: '/index/comment',
        name:"comment",
        component: comment,
        props:true
      },
      {
        path: '/index/avatar',
        name:"avatar",
        component: avatar,
        props:true
      },
      {
        path: '/index/commentInfo',
        name:"commentInfo",
        component: commentInfo,
        props:true
      },
      {
        path: '/index/addComment',
        name:"addCommentInfo",
        component: addCommentInfo,
        props:true
      },

      {
        path: '/index/moveIn',
        name:"moveIn",
        component: moveIn,
        props:true
      },

      {
        path: '/index/moveOut',
        name:"moveOut",
        component: moveOut,
        props:true
      },

    ],

  },
  {path: '*', name: "404",component: notFound},

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
