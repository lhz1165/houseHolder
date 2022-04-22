<template>
  <div>
    <div class="addComm">
      <el-button type="primary" icon="el-icon-circle-plus" @click="addUserInfo()">添加用户</el-button>

    </div>
    <el-table
        :data="list"
        border
        style="width: 100%"
        max-height="500px"
        :cell-style="{padding:'2px 0'}"
        :row-style="{height:'20px'}">

      <el-table-column
          prop="id"
          label="id"
          width="180">
      </el-table-column>

      <el-table-column
          prop="username"
          label="用户名"
          width="180">
      </el-table-column>
      <el-table-column
          prop="realName"
          label="真实姓名"
          width="180">
      </el-table-column>

      <el-table-column
          prop="identity"
          label="身份证">
      </el-table-column>

      <el-table-column
          prop="phone"
          label="联系电话">
      </el-table-column>

      <el-table-column
          prop="paid"
          label="是否生效">

        <template slot-scope="scope">
          <el-tag :type="scope.row.paid=='生效' ? 'success' :'info'" disable-transitions>{{scope.row.paid}}</el-tag>
        </template>
      </el-table-column>


      <el-table-column
          prop="status"
          label="户籍状态"
          width="100"
          filter-placement="bottom-end">
        <template slot-scope="scope">
          <el-tag :type="scope.row.status === '迁入' ? 'success' : scope.row.status ==='注销'?'info':'warning'" disable-transitions>{{scope.row.status}}</el-tag>
        </template>
      </el-table-column>

      <el-table-column
          prop="type"
          label="居住类型"
          width="100"
          filter-placement="bottom-end">
        <template slot-scope="scope">
          <el-tag :type="scope.row.type === '常住' ? 'primary' : 'info'"
                  disable-transitions>{{scope.row.type}}</el-tag>
        </template>
      </el-table-column>

      <el-table-column
          fixed="right"
          label="操作"
          width="200">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)" type="text" size="small">编辑</el-button>
          <el-button @click="operationUserinfo(scope.row)" type="text" size="small" >注销/恢复</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div >
      <el-pagination
          class="pagination"
          background
          layout="prev, pager, next"
          :pageSize="pageSize"
          :total="total"
          @current-change="change">
      </el-pagination>
    </div>
  </div>

</template>

<script>
import {postRequest} from "@/utils/apis";

export default {
  name: "UserInfoList",
  data(){
    return {
      list: [],
      pageSize: 10,
      total: 0,
      pageNum: 1
    }
  },
  mounted() {
    this.pageQuery();
  },
  methods:{
    pageQuery(){
      postRequest("/userInfo/page", {pageSize: this.pageSize, current: this.pageNum})
          .then(resp=>{
            if (resp.data.code === 200) {
              this.list=resp.data.data.records;
              this.total=resp.data.data.total;
              this.size=resp.data.data.size;
              this.pages=resp.data.data.pages;
              for (let i=0;i<this.list.length;i++)
              {
                let datatime = parseInt(this.list[i].birthday);
                this.list[i].birthday=(new Date(datatime).toLocaleString());
                let status = this.list[i].status
                if (status === "1") {
                  this.list[i].status="迁入"
                }else if (status === "2"){
                  this.list[i].status="迁出"
                }else {
                  this.list[i].status="注销"
                }

                let paid = this.list[i].paid
                if (paid ) {
                  this.list[i].paid="生效"
                } else {
                  this.list[i].paid="未生效"
                }


              }
            }})
    },
    change(pageNum) {
      this.pageNum = pageNum;
      this.pageQuery();
    },
    addUserInfo(){
      this.$router.replace("/index/addUserInfo")
    },
    handleClick(row){
      this.$router.replace({path:"/index/addUserInfo",query:{uid:row.id}})
    },
    operationUserinfo(row){
      let nowStatus=0;
      if (row.status === '注销') {
        nowStatus = 2;
      }else {
        nowStatus = 3;
      }

      postRequest("/userInfo/deleteOrRecover",{
        id:row.id,
        status:nowStatus,
      })
          .then(resp=>{
            if (resp.data.code === 200) {
              if (row.status === '注销') {
                this.$message.success("恢复成功");
              }else {
                this.$message.success("注销成功");

              }
              this.pageQuery();
            }else if(resp.data.code === 500){
              this.$message.error(resp.data.msg)
            }
          });
    }


  }


}
</script>

<style scoped>

</style>