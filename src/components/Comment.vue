<template>
  <div>
    <div class="addComm">
      <el-button type="primary" icon="el-icon-circle-plus" @click="addComment()">新增评论</el-button>

    </div>
    <el-table
        :data="list"
        border
        style="width: 100%"
        max-height="500px"
        :cell-style="{padding:'2px 0'}"
        :row-style="{height:'20px'}">

      <el-table-column type="index" :index="indexMethod">
      </el-table-column>

      <el-table-column
          prop="commentUser"
          label="姓名"
          width="180">
      </el-table-column>
      <el-table-column
          prop="createTime"
          label="日期"
          width="180">
      </el-table-column>

      <el-table-column
          prop="title"
          label="标题">
      </el-table-column>

      <el-table-column
          prop="content"
          label="内容">
      </el-table-column>

      <el-table-column
          fixed="right"
          label="操作"
          width="200">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)" type="text" size="small">查看评论</el-button>
          <el-button @click="deleteClick(scope.row)" type="text" size="small" >删除评论</el-button>
        </template>
      </el-table-column>
    </el-table>

<!--    <el-pagination-->
<!--        class="pagination"-->
<!--        background-->
<!--        layout="prev, pager, next"-->
<!--        :pageSize="pageSize"-->
<!--        :total="total"-->
<!--        @current-change="change">-->
<!--    </el-pagination>-->
    <div class="pageP">
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
  name: "Comment",
  data() {
    return {
      list: [],
      pageSize: 10,
      total: 0,
      pageNum: 1,
      userName:null,
    }
  },
  mounted() {
  this.pageQuery();
  },
  methods:{
    indexMethod(index) {
      return index+1 ;
    },
    pageQuery(){
      postRequest("/comment/page", {pageSize: this.pageSize, current: this.pageNum,userName:this.userName})
          .then(resp=>{
            if (resp.data.code === 200) {
              this.list=resp.data.data.records;
              this.total=resp.data.data.total;
              this.size=resp.data.data.size;
              this.pages=resp.data.data.pages;
              for (var i=0;i<this.list.length;i++)
              {
                let datatime = parseInt(this.list[i].createTime);
                this.list[i].createTime=(new Date(datatime).toLocaleString());
              }
            }})
    },
    change(pageNum) {
      this.pageNum = pageNum;
      this.pageQuery();
    },

    //查看详情
    handleClick(row) {
      console.log(row.id)
      this.$router.replace({
        name:"commentInfo",
        params: {cid: row.id}
      })
    },

    //删除
    deleteClick(row){
      console.log(row.id)
      getRequest("/comment/delete",{
        cid: row.id
      })
      .then(resp=>{
        if (resp.data.code === 200) {
          this.$message.success('删除成功')
          setTimeout(() =>{
            window.location.reload();
          },500);
        }else {
          this.$message.error('删除失败')
        }
      })

    },
    addComment(){
      this.$router.replace("/index/addComment")
    }
  }
}
</script>

<style scoped>

.addComm{
  margin-left: 1000px;
  margin-bottom: 20px;
}
.pagination {
  position: fixed;
  left: 50px;
  bottom: 100px;
  height: 40px;
  width: 100%;
  text-align: center;
}
/*.pageP{*/
/*  margin-bottom: 50px;*/
/*}*/
</style>