<template>
  <el-form ref="form" :model="form" label-width="80px">
    <el-form-item label="迁移编号">
      <el-input v-model="no" disabled></el-input>
    </el-form-item>

    <el-form-item label="户籍号">
      <el-input v-model="householderId" disabled></el-input>
    </el-form-item>

    <el-form-item label="支付金额">
      <el-input v-model="amount" disabled></el-input>
    </el-form-item>

    <el-form-item>
      <el-button type="primary" @click="onSubmit()">确认支付</el-button>
      <el-button>取消</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  name: "InPay",
  data(){
    return{
      no:null,
      householderId: null,
      amount:null

    }
  },
  mounted() {
    this.no=this.$route.query.moveId
    this.householderId=this.$route.query.hid
    this.amount=this.$route.query.amount

  },
  methods:{
    onSubmit(){
      this.$router.replace({path: "/index/paySuccess",query:{username:this.$route.query.username}})
    }
  }
}
</script>

<style scoped>

</style>