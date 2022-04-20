<template>
  <div>
    <el-descriptions class="margin-top" title="个人信息" :column="3" size="medium" border>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-user"></i>
         姓名
        </template>
        {{userinfo.realName}}
      </el-descriptions-item>

      <el-descriptions-item >
        <template slot="label">
          <i class="el-icon-user"></i>
          性别
        </template>
        {{userinfo.gender}}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-mobile-phone"></i>
          手机号
        </template>
        {{userinfo.phone}}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-location-outline"></i>
          籍贯
        </template>
        {{userinfo.place}}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-tickets"></i>
          民族
        </template>
        <el-tag size="small"> {{userinfo.race}}</el-tag>
      </el-descriptions-item>

      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-user"></i>
          生日
        </template>
        {{userinfo.birthday}}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-user"></i>
          身份证
        </template>
        {{userinfo.identity}}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-user"></i>
          户籍状态
        </template>
        {{userinfo.status}}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-user"></i>
          户籍号
        </template>
        {{userinfo.householderId}}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-office-building"></i>
          联系地址
        </template>
        {{userinfo.address}}
      </el-descriptions-item>

    </el-descriptions>
    <el-divider></el-divider>
    <el-descriptions class="margin-top" title="户籍信息" :column="2" size="medium" border>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-user"></i>
          户主名
        </template>
        {{ userinfo.householder }}
      </el-descriptions-item>

      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-mobile-phone"></i>
          户籍地址
        </template>
        {{ userinfo.houseAddress }}
      </el-descriptions-item>

      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-user"></i>
          备注
        </template>
        {{ userinfo.description }}
      </el-descriptions-item>


    </el-descriptions>

  </div>


</template>

<script>
import {getRequest} from "@/utils/apis";

export default {
  name: "HouserHolderInfo",
  data() {
    return {
      userinfo:{
        address: "",
        birthday: "",
        gender: "",
        houseAddress: '',
        householder: '',
        householderId: '',
        id: '',
        identity: "",
        password: "",
        phone: "",
        place: "",
        race: "",
        realName: "",
        status: "",
        type: "",
        userId: '',
        username: "",
        description:"",

      },
      username:'',
    }
  },
  mounted() {
    this.username=this.$route.query.username
    this.queryInfo()

  },
  methods: {

    onSubmit() {
      console.log('submit!');
    },
    queryInfo(){
      console.log(this.username)
      getRequest("/userInfo/getByUserName",{username:this.username})
      .then(resp=>{
        if (resp.data.code === 200) {
          this.userinfo=resp.data.data
        }
      })
    },
  }
}
</script>

<style scoped>

</style>