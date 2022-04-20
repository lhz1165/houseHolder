<template>
<div>
  <el-row>

    <el-col :sm="12" :lg="6">
      <el-result icon="success" title="支付成功!" subTitle="请到个人中心查看户籍结果">
        <template slot="extra">
          <el-button type="primary" size="medium" @click="back()">返回</el-button>
        </template>
      </el-result>
    </el-col>

  </el-row>
</div>
</template>

<script>
export default {
  name: "PaySuccess",
  methods:{
    back(){
      this.$router.replace({path: "/index/payment",query:{username:this.$route.query.username}})
    }
  }
}
</script>

<style scoped>

</style>