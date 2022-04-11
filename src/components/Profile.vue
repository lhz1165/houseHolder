<template>
<div>
  系统管理员 id = {{querb.id}}



  <el-form ref="form" :model="form" label-width="80px">
    <div class="myavatar">
      <el-upload
          class="avatar-uploader"
          action="https://jsonplaceholder.typicode.com/posts/"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload">
        <img v-if="form.url" :src="form.url" class="avatar">
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
        <el-button type="primary" @click="onSubmit">立即创建</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </div>


  </el-form>
</div>
</template>

<script>
export default {
  name: "UserInfo",
  data() {
    return {
      form: {
        name: '',
        password: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: '',
        url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
      }
    }
  },
  beforeRouteEnter:(to,from,next)=>{
    next(vm => {
      vm.getData();
    })
  },
  computed:{
    querb(){
      return this.$route.query
    }
  },
  methods:{
    getData(){
      this.axios({
        method:'get',
        url:'http://localhost:8080/data.json'
      }).then((resp)=>{
        console.log(resp)
      }).catch(error=>{
        console.log(error)
      })
    },
    onSubmit() {
      console.log('submit!');
    },
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
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