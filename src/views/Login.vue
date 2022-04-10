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
      <el-form-item>
    <!-- 对ruleForm 这个表单做验证-->
        <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>

  </div>
</template>

<script>
export default {
  name: "Login",
  data(){
    return {
      form:{
        username:'',
        password:'',
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
         //跳转
          this.$router.push({name:"main",params:{username: this.form.username}})
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
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