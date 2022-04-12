<template>
  <div>
    <el-form ref="ruleForm" :model="form" label-width="80px" class="login-box" :rules="rules" >
      <h3 class="login-title">欢迎登录</h3>
      <el-form-item label="账号"  prop="username">
        <el-input v-model="form.username"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input  type="password" v-model="form.password"></el-input>
      </el-form-item>
      <el-form-item label="用户类型">
        <el-select v-model="form.type" placeholder="活动区域">
          <el-option label="管理员"  value="1" ></el-option>
          <el-option label="普通用户"  value="2"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item>
    <!-- 对ruleForm 这个表单做验证-->
        <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>

  </div>
</template>

<script>
import {postRequest} from "@/utils/apis";
import axios from "axios";
export default {
  name: "Login",
  data(){
    return {
      form:{
        username:'',
        password:'',
        type:'1',
      },
      rules: {
        username: [
          {required: true, message: '请输入用户名', trigger: 'blur'},
        ],
        password: [
          {required: true, message: '请输入密码', trigger: 'blur'},
        ]
      }
    }
  },
  methods:{
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
         //登录拦截
          axios.post('http://localhost:8089/login',{username: this.form.username, password: this.form.password,type:this.form.type})
              .then(successResponse => {
                if (successResponse.data.code === 200) {
                  this.$message.success('登录成功!')
                  //跳转
                  window.sessionStorage.setItem('isLogin','true')
                  this.$store.dispatch('asyncUpdateUser',{
                    name:this.form.username
                  })
                  //验证
                  this.$router.push({name:"main",params:{username: this.form.username}})

                } else {
                  this.$message.error('账号或者密码错误!')
                  console.log("dk")
                  //{code :"",data:}
                  console.log(successResponse.data)

                }
              }).catch(failResponse => {
            console.log(failResponse)
            this.$message.warning('登录失败！')
          })
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
  }
}
</script>

<style scoped>
.login-box{
  width: 400px;
  margin: 200px auto;
  border: 1px solid #DCDFE6;
  padding: 40px;
  border-radius: 10px;
  box-shadow: 0 0 30px #DCDFE6;
}
.login-title{
  text-align: center;

}

</style>