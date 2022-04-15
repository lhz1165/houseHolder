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
        <el-input v-model="form.name"></el-input>
      </el-form-item>

      <el-form-item label="密码" >
        <el-input v-model="form.password"></el-input>
      </el-form-item>

      <el-form-item label="即时配送">
        <el-switch v-model="form.delivery"></el-switch>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="onSubmit">更新</el-button>
        <el-button>取消</el-button>
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
    return {
      form: {
      },
      headers: {
        'token': window.sessionStorage.getItem("token")
      },
      picName:'',
      //用户更新的参数
      userParam:{
        id:0,
        picAddr:'',
      }
    }
  },
  mounted() {
    this.loadAvatar();
    let userObj =JSON.parse(window.sessionStorage.getItem("user"))
    this.userParam.id=userObj.id
    this.userParam.picAddr=userObj.avatar
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
          this.$message.success("更新成功!")
          this.picName= "http://localhost:8089"+this.userParam.picAddr
        }
      })
      this.$router.go(0)
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
  }
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