<template>
<div class="homeWrapper">
<!--  <el-container style=" border: 1px solid #eee">-->
  <el-container class="main_container">
<!--头-->
    <el-header style=" font-size: 12px" class="homeHeader">
      <div class="title">户籍管理</div>
      <el-dropdown class="el-dropdown-link" @command="commandHandler">
        <span >
          {{user.username}}
          <img  class="info-pic" :src="'http://localhost:8089'+user.avatar" alt="">
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="profile">个人中心</el-dropdown-item>
<!--          <el-dropdown-item command="setting">设置</el-dropdown-item>-->
          <el-dropdown-item command="logout">
            退出
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </el-header>




    <el-container>

        <!--管理员页面-->
       <el-aside width="200px" style="background-color: rgb(238, 241, 246)" v-if="user.type==='1'">
          <el-menu :default-openeds="['1', '2','3','4','5']">
            <el-submenu index="1">
              <template slot="title"><i class="el-icon-message"></i>户籍管理</template>
              <el-menu-item-group>
                <el-menu-item index="1-2" @click="jump('/index/houseHoldList')">
                  户籍信息
                </el-menu-item>
              </el-menu-item-group>

              <el-menu-item-group>
                <el-menu-item index="1-2" @click="jump('/index/userInfoList')">
                  居民信息
                </el-menu-item>
              </el-menu-item-group>

              <el-menu-item-group>
                <el-menu-item index="1-2"@click="jump('/index/moveList')" >
                  迁出/迁出管理
                </el-menu-item>
              </el-menu-item-group>
            </el-submenu>

            <el-submenu index="2" >
              <template slot="title"><i class="el-icon-menu"></i>缴费</template>
              <el-menu-item-group>
                <el-menu-item index="1-2" @click="jump('/index/payment')">
                  缴费信息
                </el-menu-item>
              </el-menu-item-group>
            </el-submenu>


            <el-submenu index="4">
              <template slot="title"><i class="el-icon-setting"></i>反馈投诉</template>
              <el-menu-item-group >
                <el-menu-item index="1-2" @click="jump('/index/comment')">
<!--                  <router-link to="/index/comment" tag="label">反馈投诉</router-link>-->
                  反馈投诉
                </el-menu-item>
              </el-menu-item-group>
            </el-submenu>


          </el-menu>

        </el-aside>

        <!--普通用户页面-->
       <el-aside width="200px" style="background-color: rgb(238, 241, 246)" v-else>
        <el-menu :default-openeds="['1']">
          <el-submenu index="1">
            <template slot="title"><i class="el-icon-message"></i>个人户籍管理</template>
            <el-menu-item-group>


              <el-menu-item index="1-2" @click="jumpUser('/index/houseHolder/Info',user.username)">
<!--                <router-link v-bind:to="{path:'/index/houseHolder/Info',query:{id:user.id}}" tag="label" >户籍信息</router-link>-->
                户籍信息
              </el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group >
              <el-menu-item index="1-2" @click="jumpUser('/index/moveList',user.username)">
                迁入/迁出查询
              </el-menu-item>
            </el-menu-item-group>


              <el-menu-item-group>
                <el-menu-item index="1-2" @click="jumpUser('/index/payment',user.username)">
                  缴费信息
                </el-menu-item>
              </el-menu-item-group>


            <el-menu-item-group >
              <el-menu-item index="1-2">
                <router-link to="/index/comment" tag="label">反馈投诉</router-link>
              </el-menu-item>
            </el-menu-item-group>
          </el-submenu>






        </el-menu>

      </el-aside>


      <el-container>
        <el-main>
          <router-view></router-view>
        </el-main>

      </el-container>
    </el-container>
    <el-footer>
      <div>
        @Copyright 2022 HDU-
      </div>
    </el-footer>
  </el-container>
</div>
</template>

<script>
import axios from "axios";
import {postRequest} from "@/utils/apis";

export default {
  name: "Index",
  data() {
    const item = {
      date: '2016-05-02',
      name: '王小虎',
      address: '上海市普陀区金沙江路 1518 弄'
    };
    return {
      tableData: Array(20).fill(item),
      user:{}
    }
  },
  mounted() {
   this.getUserInfo()
  },
  methods:{
    getUserInfo(){
      postRequest('/getUserInfo')
      .then(resp=>{
        if (resp.data.code===200){
          this.user=resp.data.data;
          window.localStorage.removeItem("user")
          window.localStorage.setItem("user",JSON.stringify(resp.data.data))
        }
      })
    },
    commandHandler(command){
      if (command === "logout") {
        axios.post("http://localhost:8089/logout")
        .then(resp=>{
          if (resp.data.code===200){
            this.$message.success('退出成功!')
            window.localStorage.clear()
            this.$router.replace("/login")
          }
        })
      }else if (command==="profile"){
          this.$router.replace({path:'/index/profile',query:{id:this.user.id}})
      }
    },
    jump(url){
      this.$router.replace(url)
    },
    jumpUser(url,username){
      if (username != null) {
        this.$router.replace({path:url,query:{username:username}});
      }else {
        this.$router.replace(url);
      }

    }
  },
}
</script>

<style scoped>
.el-header {
  background-color: #B3C0D1;
  color: #333;
  line-height: 60px;
}

.el-aside {
  color: #333;
}



.el-footer {
  background-color: #B3C0D1;
  color: #333;
  text-align: center;
  line-height: 60px;
}
.homeHeader{
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 15px;
  box-sizing: border-box;
}
.homeHeader .title{
    font-size: 30px;
  color: white;
}
.info-pic{
  width: 40px;
  height: 40px;
  border-radius: 10px;
  margin-top: 20px;
}
.homeWrapper {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
.main_container {
  height: 100%;
}

</style>