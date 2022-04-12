<template>
<div>
  <el-container style="height: 900px; border: 1px solid #eee">


<!--    <el-header style="text-align: right; font-size: 12px" class="homeHeader">-->
    <el-header style=" font-size: 12px" class="homeHeader">
      <div class="title">户籍管理</div>
      <el-dropdown class="el-dropdown-link" @command="commandHandler">
        <span >
          {{user.username}}
          <img  class="info-pic" src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg" alt="">
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="profile">个人中心</el-dropdown-item>
          <el-dropdown-item command="setting">设置</el-dropdown-item>
          <el-dropdown-item command="logout">
            退出
<!--            <router-link to="/logout" tag="span"></router-link>-->
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>

    </el-header>




    <el-container>
<!--      aside-->
      <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
        <el-menu :default-openeds="['1', '2','3']">
          <el-submenu index="1">
            <template slot="title"><i class="el-icon-message"></i>系统用户管理</template>
            <el-menu-item-group>
              <el-menu-item index="1-2">
                <router-link v-bind:to="{path:'/index/profile',query:{id:11111}}" tag="label" >修改信息</router-link>
              </el-menu-item>
            </el-menu-item-group>
          </el-submenu>

          <el-submenu index="2">
            <template slot="title"><i class="el-icon-menu"></i>户籍管理</template>
            <el-menu-item-group>

              <el-menu-item index="1-2">
                <router-link to="/index/houseHolder" tag="label">户籍管理</router-link>
              </el-menu-item>
            </el-menu-item-group>
          </el-submenu>


          <el-submenu index="3">
            <template slot="title"><i class="el-icon-setting"></i>个人户籍管理</template>
            <el-menu-item-group >
              <el-menu-item index="1-2">
                <router-link v-bind:to="{name:'personal',params:{id:123}}" tag="label">个人户籍管理</router-link>
              </el-menu-item>
            </el-menu-item-group>
          </el-submenu>

          <el-submenu index="4">
            <template slot="title"><i class="el-icon-setting"></i>test</template>
            <el-menu-item-group >
              <el-menu-item index="1-2">
                <router-link to="/index/avatar" >test</router-link>
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
        @Copyright 2022 hello
      </div>
    </el-footer>
  </el-container>
</div>
</template>

<script>
import axios from "axios";

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
      user:''
    }
  },
  mounted() {
   this.getUserInfo()
  },
  methods:{
    getUserInfo(){
      axios.post('http://localhost:8089/getUserInfo')
      .then(resp=>{
        if (resp.data.code===200){
          this.user=resp.data.data;
        }
      })
    },
    commandHandler(command){
      if (command === "logout") {
        axios.post("http://localhost:8089/logout")
        .then(resp=>{
          if (resp.data.code===200){
            this.$message.success('退出成功!')
            window.sessionStorage.clear()
            console.log("log out")
            this.$router.replace("/")
          }
        })
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

</style>