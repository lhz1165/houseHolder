<template>
<div>
  <div>
     <el-input placeholder="请输入内容" v-model="input1" class="myinput">
      <template slot="prepend">用户名</template>
    </el-input>

      <el-input placeholder="请输入内容" v-model="input2" class="myinput">
        <template slot="prepend">身份证</template>
      </el-input>

      <el-input placeholder="请输入内容" v-model="input3 " class="myinput">
        <template slot="prepend">组号</template>
      </el-input>

      <el-button class="searchbtn">查询</el-button>


  </div>
  <el-table
      :data="tableData"
      border
      style="width: 100%">
    <el-table-column
        prop="date"
        label="日期"
        width="180">
    </el-table-column>
    <el-table-column
        prop="name"
        label="姓名"
        width="180">
    </el-table-column>
    <el-table-column
        prop="address"
        label="地址">
    </el-table-column>
    <el-table-column
        fixed="right"
        label="操作"
        width="100">
      <template slot-scope="scope">
        <el-button @click="handleClick(scope.row)" type="text" size="small">

          查看</el-button>
        <el-button type="text" size="small" @click="redirectInfo()">编辑</el-button>
      </template>
    </el-table-column>
  </el-table>

  <el-pagination
      background
      layout="prev, pager, next"
      :total="100">
  </el-pagination>

</div>
</template>

<script>
export default {
  name: "HouseHolder",
  data() {
    return {
      tableData: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
      }],
     input1: '',
      input2: '',
      input3: '',
    }
  },
  methods:{
    handleClick(row) {
      this.$router.push({path:"/index/houseHolder/info"})
      console.log(row);
    },
    redirectInfo() {
      this.$router.push({path:"/index/houseHolder/info"})
    },
  }
}
</script>

<style scoped>
.myinput {
  width: 200px;
  margin-bottom: 25px;
  margin-left: 50px;
}
.searchbtn{
  margin-left: 50px;
}
.el-pagination{
  margin-top: 50px;
  margin-left: 100px;


}

</style>