import Vue from 'vue'
import VueRouter from 'vue-router'
import login from "@/views/Login";
import  index from "@/views/Index"
import houseHolder from "@/components/HouseHolder";
import personal from "@/components/Personal";
import profile from "@/components/Profile";
import notFound from "@/views/NotFound";
import houserHolderInfo from "@/components/HouserHolderInfo";
import comment from "@/components/Comment";
import commentInfo from "@/components/CommentInfo";
import addCommentInfo from "@/components/AddCommentInfo";
import houseHoldList from "@/components/admin/HouseHoldList";
import addHouseHold from "@/components/admin/AddHouseHold";
import userInfoList from "@/components/admin/UserInfoList";
import addUserInfo from "@/components/admin/AddUserInfo";
import move from "@/components/admin/Move";
import moveList from "@/components/admin/MoveList";
import payMent from "@/components/PayMent";
import inPay from "@/components/InPay"
import paySuccess from "@/components/PaySuccess";

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
        path: '/index/houseHoldList',
        name:"houseHoldList",
        component: houseHoldList,
        props:true
      },

      {
        path: '/index/addHouseHold',
        name:"addHouseHold",
        component: addHouseHold,
        props:true
      },

      {
        path: '/index/userInfoList',
        name:"userInfoList",
        component: userInfoList,
        props:true
      },

      {
        path: '/index/addUserInfo',
        name:"addUserInfo",
        component: addUserInfo,
        props:true
      },
      {
        path: '/index/move',
        name:"move",
        component: move,
        props:true
      },
      {
        path: '/index/moveList',
        name:"moveList",
        component: moveList,
        props:true
      },
      {
        path: '/index/payment',
        name:"payMent",
        component: payMent,
        props:true
      },
      {
        path: '/index/inPay',
        name:"inPay",
        component: inPay,
        props:true
      },
      {
        path: '/index/paySuccess',
        name:"paySuccess",
        component: paySuccess,
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
