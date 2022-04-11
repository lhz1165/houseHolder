<template>
<div>
  <el-container style="height: 900px; border: 1px solid #eee">

    <el-header style="text-align: right; font-size: 12px">
      <el-dropdown>
        <i class="el-icon-setting" style="margin-right: 15px"></i>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>查看</el-dropdown-item>
          <el-dropdown-item>新增</el-dropdown-item>
          <el-dropdown-item>
            <router-link to="/logout" tag="span">退出</router-link>

          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <span>{{this.$route.params.username}}</span>
    </el-header>




    <el-container>
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
        <el-foot>Footer</el-foot>
      </el-container>

    </el-container>

  </el-container>
</div>
</template>

<script>
export default {
  name: "Index",
  data() {
    const item = {
      date: '2016-05-02',
      name: '王小虎',
      address: '上海市普陀区金沙江路 1518 弄'
    };
    return {
      tableData: Array(20).fill(item)
    }
  }
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
</style>