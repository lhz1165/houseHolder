<template>
  <div>
    <div class="addComm" v-if="this.username==null">
      <el-button type="primary" icon="el-icon-circle-plus" @click="addMove()">迁出/迁出</el-button>
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
          label="编号"
          width="180">
      </el-table-column>

      <el-table-column
          prop="username"
          label="用户名"
          width="180">
      </el-table-column>
      <el-table-column
          prop="houseHoldId"
          label="户籍号"
          width="180">
      </el-table-column>

      <el-table-column
          prop="createTime"
          width="180"
          label="操作时间">
      </el-table-column>

      <el-table-column
          prop="type"
          label="类型"
          width="180"
          filter-placement="bottom-end">
        <template slot-scope="scope">
          <el-tag :type="scope.row.type === '迁入' ? 'success' : 'info'"
                  disable-transitions>{{scope.row.type}}</el-tag>
        </template>
      </el-table-column>

      <el-table-column
          prop="status"
          label="状态"
          width="180"
          filter-placement="bottom-end">
        <template slot-scope="scope">
          <el-tag :type="scope.row.status === '待缴费' ? 'danger' : 'primary'"
              disable-transitions>{{scope.row.status}}</el-tag>
        </template>
      </el-table-column>


      <el-table-column
          prop="payment"
          label="支付金额">
      </el-table-column>

<!--      <el-table-column-->
<!--          fixed="right"-->
<!--          label="操作"-->
<!--          width="200">-->
<!--&lt;!&ndash;        <template slot-scope="scope">&ndash;&gt;-->
<!--&lt;!&ndash;          <el-button @click="handleClick(scope.row)" type="text" size="small">确认</el-button>&ndash;&gt;-->
<!--&lt;!&ndash;        </template>&ndash;&gt;-->
<!--      </el-table-column>-->
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
import {getRequest, postRequest} from "@/utils/apis";

export default {
  name: "MoveList",
  data(){
    return {
      list: [],
      pageSize: 10,
      total: 0,
      pageNum: 1,
      username:null,
    }
  },
  mounted() {
    let username =this.$route.query.username
    this.username=username
    if (username != null) {
      this.pageQuery(username);
    }else {
      this.pageQuery(null);
    }
  },
  methods:{
    change(pageNum) {
      this.pageNum = pageNum;
      this.pageQuery();
    },
    addMove(){
      this.$router.replace("/index/move")
    },
    pageQuery(username){
      let param={pageSize: this.pageSize, current: this.pageNum}
      if (username != null) {
        param.username=username
      }
      postRequest("/move/page",param)
      .then(resp=>{
        if (resp.data.code === 200) {
          this.list=resp.data.data.records;
          this.total=resp.data.data.total;
          for (let i=0;i<this.list.length;i++)
          {
            let moveObj = this.list[i];
            if (moveObj.status === "2") {
              moveObj.status="已缴费"
            }else {
              moveObj.status="待缴费"
            }
            if (moveObj.type === "1") {
              moveObj.type="迁入"
            }else {
              moveObj.type="迁出"
            }

            let datatime = parseInt(this.list[i].createTime);
            if (datatime != null) {
              moveObj.createTime=(new Date(datatime).toLocaleString());
            }
          }
        }
      });
    },

    handleClick(row){
      let moveId=row.id
      getRequest("/move/pay",{id:moveId})
      .then(resp=>{
        if (resp.data.code === 200) {
          this.$message.success("迁移成功!")
          setTimeout(() =>{
            window.location.reload();
          },500);
        }else {
          this.$message.error(resp.data.msg)
        }
      })
    },
  }
}
</script>

<style scoped>

</style>