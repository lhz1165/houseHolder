import Vue from 'vue'
import VueRouter from 'vue-router'
import login from "@/views/Login";
import  index from "@/views/Index"
import houseHolder from "@/components/HouseHolder";
import personal from "@/components/Personal";
import profile from "@/components/Profile";
import notFound from "@/views/NotFound";
Vue.use(VueRouter)

const routes = [
  {
    path: '/logout',
    name: 'logout',
    redirect:'/login'
  },

  {
    path: '',
    name: 'default',
    redirect:'/login'
  },

  {
    path: '/login',
    name: 'login',
    component: login
  },

  {
    path: '/index/:username',
    name: 'main',
    component: index,
    props:true,
    //嵌套路由
    children: [
      {
        path: '/index/houseHolder',
        component: houseHolder
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
