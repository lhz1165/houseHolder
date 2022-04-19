<template>
  <div>
    <div class="addComm">
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
          prop="householder"
          label="用户名"
          width="180">
      </el-table-column>
      <el-table-column
          prop="address"
          label="户籍号"
          width="180">
      </el-table-column>

      <el-table-column
          prop="peopleCount"
          label="操作时间">
      </el-table-column>

      <el-table-column
          prop="peopleCount"
          label="类型">
      </el-table-column>

      <el-table-column
          prop="peopleCount"
          label="状态">
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
export default {
  name: "MoveList",
  data(){
    return {
      list: [],
      pageSize: 10,
      total: 0,
      pageNum: 1
    }
  },
  mounted() {

  },
  methods:{
    change(pageNum) {
      this.pageNum = pageNum;
      this.pageQuery();
    },
    addMove(){

    }
  }
}
</script>

<style scoped>

</style>