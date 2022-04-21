<template>
<div>
  <el-form ref="form" :model="form" label-width="80px" style=" width: 600px; margin-left: 300px ">
    <el-form-item label="用户id" v-if="false">
      <el-input v-model="form.id" style="width: 500px" disabled></el-input>
    </el-form-item>

    <el-form-item label="户籍号" v-if="isEdit">
      <el-input v-model="form.householderId" style="width: 500px" disabled></el-input>
    </el-form-item>

    <el-form-item label="用户名">
      <el-input v-model="form.username" :disabled="isEdit"></el-input>
    </el-form-item>

    <el-form-item label="真实姓名">
      <el-input v-model="form.realName"></el-input>
    </el-form-item>

    <el-form-item label="民族">
      <el-input v-model="form.race"></el-input>
    </el-form-item>

    <el-form-item label="籍贯">
      <el-input v-model="form.place"></el-input>
    </el-form-item>

    <el-form-item label="身份证">
      <el-input v-model="form.identity"></el-input>
    </el-form-item>

    <el-form-item label="密码">
      <el-input v-model="form.password"></el-input>
    </el-form-item>

    <el-form-item label="联系电话">
      <el-input v-model="form.phone"></el-input>
    </el-form-item>


    <el-form-item label="户口类型">
      <el-radio-group v-model="form.type">
        <el-radio label="常住" value="1"></el-radio>
        <el-radio label="外地" value="2"></el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="生日">
      <div class="block">
        <el-date-picker
            v-model="form.birthday"
            type="date"
            placeholder="选择日期">
        </el-date-picker>
      </div>
    </el-form-item>


    <el-form-item label="居住地">
      <el-input v-model="form.address"></el-input>
    </el-form-item>

    <el-form-item label="性别">
      <el-radio-group v-model="form.gender">
        <el-radio label="男" value="男"></el-radio>
        <el-radio label="女" value="女"></el-radio>
      </el-radio-group>
    </el-form-item>

    <el-form-item>
      <el-button type="primary" @click="edit" v-if="isEdit">更新</el-button>
      <el-button type="primary" @click="onSubmit" v-else>立即创建</el-button>

      <el-button  @click="back()"> 取消</el-button>
    </el-form-item>
  </el-form>

</div>
</template>

<script>
import {getRequest, postRequest} from "@/utils/apis";

export default {
  name: "AddUserInfo",
  data() {
    return {
      form: {
        id: null,
        username: '',
        realName: '',
        race: '',
        place: '',
        identity: '',
        password: '',
        phone: '',
        type: '',
        birthday: '',
        address: '',
        gender: '',
        householderId:''
      },
      isEdit:false
    }
  },
  mounted() {
    let uid = this.$route.query.uid;
    if ( uid != null) {
      getRequest("/userInfo/get",{id:uid})
          .then(resp=>{
            this.form=resp.data.data
            this.form.birthday=this.getDate(resp.data.data.birthday);
          })
      this.isEdit = true;
    }
  },
  methods: {
    onSubmit() {
      postRequest("/userInfo/add",this.form)
      .then(resp=>{
        if (resp.data.code === 200) {
          this.$message.success("新增成功!")
          this.$router.replace("/index/userInfoList")
        }else if(resp.data.code === 500){
          this.$message.success(resp.data.msg)
        }
      })
    },
    back(){
      this.$router.replace("/index/userInfoList")
    },
    //时间戳格式化
    getDate(time) {
      let date = new Date(Number(time)); // 初始化日期
      // let year = date.getFullYear(); //获取年份
      // let month = date.getMonth() + 1; // 获取月份
      // let day = date.getDate(); // 获取具体日
      // let defaultDate = `${year}-${month}-${day}`;
      return date
    },
    edit(){
      console.log(this.form.birthday)
      postRequest("/userInfo/update",this.form)
          .then(resp=>{
            if (resp.data.code === 200) {
              this.$message.success("更新!")
              this.$router.replace("/index/userInfoList")
            }else if(resp.data.code === 500){
              this.$message.success(resp.data.msg)
            }
          })
    }
  }
}
</script>

<style scoped>

</style>