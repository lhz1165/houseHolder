<template>
  <div>
    <div class="addComm">
      <el-button type="primary" icon="el-icon-circle-plus" @click="addHouseHold()">添加户籍</el-button>

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
          label="户号"
          width="180">
      </el-table-column>

      <el-table-column
          prop="householder"
          label="户主名"
          width="180">
      </el-table-column>
      <el-table-column
          prop="address"
          label="户籍地址"
          width="180">
      </el-table-column>

      <el-table-column
          prop="peopleCount"
          label="总人数">
      </el-table-column>

      <el-table-column
          fixed="right"
          label="操作"
          width="200">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)" type="text" size="small">编辑</el-button>
          <el-button @click="deleteClick(scope.row)" type="text" size="small" >删除</el-button>
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
  name: "HouseHoldList",
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
      postRequest("/houseHold/page", {pageSize: this.pageSize, current: this.pageNum})
          .then(resp=>{
            if (resp.data.code === 200) {
              this.list=resp.data.data.records;
              this.total=resp.data.data.total;
              this.size=resp.data.data.size;
              this.pages=resp.data.data.pages;
            }})
    },
    change(pageNum) {
      this.pageNum = pageNum;
      this.pageQuery();
    },
    addHouseHold(){
      this.$router.replace("/index/addHouseHold")
    },
    handleClick(row){
      this.$router.replace({path:"/index/addHouseHold",query:{hid:row.id}})
    }

  }
}
</script>

<style scoped>
.pagination {
  position: fixed;
  left: 50px;
  bottom: 100px;
  height: 40px;
  width: 100%;
  text-align: center;
}
</style>