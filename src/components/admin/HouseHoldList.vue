<template>
  <div>
    <div class="addComm">
      <el-button type="primary" icon="el-icon-circle-plus" @click="addComment()">新增户籍</el-button>

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
export default {
  name: "HouseHoldList"
}
</script>

<style scoped>

</style>