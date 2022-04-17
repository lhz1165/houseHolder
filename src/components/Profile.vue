<template>
<div>
  <el-form ref="form" :model="form" label-width="80px">
    <div class="myavatar">
      <el-upload
          class="avatar-uploader"
          action="http://localhost:8089/upload"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
          :headers="headers"
          >
<!--    上传传参    :data="param"-->
        <img v-if="picName" :src="picName" class="avatar">
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
    </div>
    <div class="myform">
      <el-form-item label="用户名" >
        <el-input v-model="form.username" disabled></el-input>
      </el-form-item>


      <el-button type="text" @click="dialogFormVisible = true">修改密码</el-button>

      <el-dialog title="修改密码" :visible.sync="dialogFormVisible">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">

          <el-form-item label="密码" prop="pass">
            <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="checkPass">
            <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click="submitForm('ruleForm')">确认</el-button>
          <el-button @click="dialogFormVisible = false">取 消</el-button>
        </div>
      </el-dialog>




      <el-form-item>
        <el-button type="primary" @click="onSubmit">更新</el-button>
        <el-button @click="onSubmitExit">返回</el-button>
      </el-form-item>
    </div>


  </el-form>
</div>
</template>

<script>
import {getRequest, postRequest} from "@/utils/apis";

export default {
  name: "UserInfo",
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else {
        if (this.ruleForm.checkPass !== '') {
          this.$refs.ruleForm.validateField('checkPass');
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.ruleForm.pass) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    return {
      form: {
        username: '',
      },
      headers: {
        'token': window.sessionStorage.getItem("token")
      },
      picName: '',
      //用户更新的参数
      userParam: {
        id: 0,
        picAddr: '',
      },
      dialogFormVisible: false,
      ruleForm: {
        pass: '',
        checkPass: '',
        age: ''
      },
      rules: {
        pass: [
          { validator: validatePass, trigger: 'blur' }
        ],
        checkPass: [
          { validator: validatePass2, trigger: 'blur' }
        ],
      },
    }
  },
  mounted() {
    this.loadAvatar();
    let userObj =JSON.parse(window.sessionStorage.getItem("user"))
    this.userParam.id=userObj.id
    this.userParam.picAddr=userObj.avatar
    this.form.username=userObj.username
  },
  methods:{
    //初始化头像
    loadAvatar(){
        postRequest('/getUserInfo')
            .then(resp=>{
              if (resp.data.code===200){
                this.picName= "http://localhost:8089"+resp.data.data.avatar
              }
            })
    },
    onSubmit() {
      console.log(this.userParam)
     postRequest("/user/update",this.userParam)
      .then(resp=>{
        if (resp.data.code === 200) {
          if (resp.data.data != null) {
            this.$message.success("更新成功!");
            this.picName= "http://localhost:8089"+this.userParam.picAddr
          }else {
            this.$message.success(resp.data.message);
          }


        }
      })
      this.$router.go(0)
    },
    onSubmitExit(){
     this.$router.replace({path:"/index/houseHolder/Info",query:{id:JSON.parse(window.sessionStorage.getItem("user")).id}})
    },
    submitForm(formName) {
      //
      this.$refs[formName].validate((valid) => {
        if (valid) {
          postRequest("/user/updatePass",{
            id:this.userParam.id,
            password:this.ruleForm.pass,
            password2:this.ruleForm.checkPass,
          }).then(resp=>{
            if (resp.data.code === 200) {
                this.$message.success("更新成功!");
                this.dialogFormVisible = false
            }else {
              this.$message.error("操作失败!");
              this.dialogFormVisible = false
            }
          })

        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },

    handleAvatarSuccess(res, file) {
      console.log(res)
      if (res.code===200){
        this.userParam.picAddr=res.data
        console.log(this.userParam)
        this.$message.success("上传成功!")
      }else {
        this.$message.error("上传失败!")
      }
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg';
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      return isJPG && isLt2M;
    }
  },

}
</script>

<style scoped>
.el-input {width: 300px;}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409EFF;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;

}
.avatar {
  width: 200px;
  height: 200px;
  display: block;

}
.myavatar{
  margin-left: 200px;
  margin-bottom: 50px;
}


.myform{
  margin-left: 130px;
}


</style>