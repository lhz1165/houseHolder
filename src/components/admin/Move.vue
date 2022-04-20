<template>
  <div>
    <el-form ref="form" :model="form" label-width="80px" style=" width: 600px; margin-left: 300px ">
      <el-form-item label="操作" >
        <el-radio :disabled="!checkOp" v-model="op" label="1">迁入</el-radio>
        <el-radio :disabled="!checkOp" v-model="op" label="2" >迁出</el-radio>
      </el-form-item>


      <el-form-item label="户籍" v-if="checkHouse">
        <el-select v-model="houseHoldId" placeholder="请选择">
          <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="用户" v-if="checkUser">
        <el-select v-model="usernames" multiple placeholder="请选择" :disabled="!checkHouse">
          <el-option
              v-for="item in users"
              :key="item.value"
              :label="item.label"
              :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="金额" v-if="checkPay">
        <el-input v-model="payment" v-if="checkPay"></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="onSubmit" >立即创建</el-button>
        <el-button  @click="reset()"> 重置</el-button>
        <el-button  @click="back()"> 取消</el-button>
      </el-form-item>


    </el-form>



  </div>
</template>

<script>
import {getRequest, postRequest} from "@/utils/apis";

export default {
  name: "Move",
  data() {
    return {
      form:{

      },
      options: [],
      users: [],
      houseHoldId: '',
      usernames: [],
      payment: 0,
      op: '',
      checkOp: true,
      checkHouse:false,
      checkUser:false,
      checkPay:false,
    }
  },
  mounted() {
    this.getAllHouseHold();
    this.getAllUsers();
  },

  watch:{
    //迁出 2 1
    op(val, oldval) {
      this.users=[]
      this.checkOp=false
      this.checkHouse=true
    },
    houseHoldId(val, oldval){
      this.checkUser=true
      this.users=[]
      this.getAllUsers()
      this.checkPay=true
    }
  },
  methods:{
    back(){
      this.$router.replace("/index/moveList")
    },
    getAllHouseHold(){
      postRequest("/houseHold/page",{current:1,pageSize:999})
      .then(resp=>{
        if (resp.data.code === 200) {
          if (resp.data.data.records != null) {
            let houseHolds = resp.data.data.records;
            for (let i = 0; i <= houseHolds.length - 1; i++) {
              this.options.push({
                value: houseHolds[i].id,
                label:houseHolds[i].householder
              })
            }
          }
        }
      })
    },
    getAllUsers(){
      console.log(this.houseHoldId)
      if (this.houseHoldId !== '') {
        getRequest("/userInfo/list",{moveType:this.op,houseHoldId:this.houseHoldId})
            .then(resp=>{
              let users = resp.data.data;
              for (let i = 0; i <= users.length - 1; i++) {
                this.users.push({
                  value: users[i].username,
                  label:users[i].username
                })
              }
            });
      }
    },
    onSubmit(){
      postRequest("/move/add",{
        type:this.op,
        usernames:this.usernames,
        houseHoldId:this.houseHoldId,
        payment:this.payment
      }).then(resp=>{
        if (resp.data.code === 200) {
          this.$message.success("操作成功!")
          this.$router.replace("/index/moveList")
        }if (resp.data.code === 500) {
          this.$message.warning(resp.data.msg)
        }
      })
    },
    reset(){
      location.reload()
    }

  }
}
</script>

<style scoped>

</style>