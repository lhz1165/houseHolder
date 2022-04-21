<template>
  <div>
    <el-form ref="form" :model="form" label-width="auto"  style="margin-left: 500px">

      <el-form-item label="户号" v-if="show">
        <el-input v-model="form.id" style="width: 500px" disabled></el-input>
      </el-form-item>

      <el-form-item label="户主">
        <el-select v-model="form.householder" placeholder="请选择">
          <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
          >
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="地址">
        <el-input v-model="form.address" style="width: 500px"></el-input>
      </el-form-item>

      <el-form-item label="描述">
        <el-input v-model="form.description" style="width: 500px"></el-input>
      </el-form-item>
      <br/>
      <div v-if="show">
        <i class="el-icon-user-solid"></i>
        <el-table
            :data="form.houseHoldUsers"
            style="width: 50%">
          <el-table-column
              prop="id"
              label="id"
              width="180">
          </el-table-column>
          <el-table-column
              prop="realName"
              label="姓名"
              width="180">
          </el-table-column>
          <el-table-column
              prop="identity"
              label="身份证">
          </el-table-column>

        </el-table>
      </div>


      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <el-row>
        <el-button type="success" class="myBtn" @click="updateHouseHold()"v-if="show">保存</el-button>
        <el-button type="success" class="myBtn" @click="onSubmit()" v-else>添加</el-button>
        <el-button type="success" class="myBtn" @click="back()">取消</el-button>
      </el-row>
    </el-form>

  </div>

</template>

<script>
import {getRequest, postRequest} from "@/utils/apis";

export default {
  name: "AddHouseHold",
  data(){
    return{
     form:{
       address:"",
       householder:"",
       id:0,
       houseHoldUsers:[],
       description:""
     },
      options: [],
      show:false
    }
  },
  mounted() {
    let hid = this.$route.query.hid;
    if ( hid != null) {
      getRequest("/houseHold/get",{id:hid})
      .then(resp=>{
        this.form.id=hid
        this.form.householder=resp.data.data.householder
        this.form.address=resp.data.data.address
        this.form.description=resp.data.data.description
        for (let i=0; i<resp.data.data.userInfos.length; i++){
          this.form.houseHoldUsers.push({
            id:resp.data.data.userInfos[i].id,
            realName:resp.data.data.userInfos[i].realName,
            identity:resp.data.data.userInfos[i].identity,
          })
        }

      })
      this.show = true;
    }
    postRequest("/user/page",{current:1,pageSize:9999})
    .then(resp=>{
      if (resp.data.code === 200) {
        for (let i=0; i<resp.data.data.records.length; i++){
          this.options.push({
            value: resp.data.data.records[i].username,
            label: resp.data.data.records[i].username
          })
        }
      }
    });

  },
  methods:{
    back(){
      this.$router.replace("/index/houseHoldList")
    },
    onSubmit(){

      postRequest("/houseHold/add",{
        householder:this.form.householder,
        address:this.form.address,
        description:this.form.description
      }).then(resp=>{
        if (resp.data.code === 200) {
          this.$message.success("新增成功!")
          this.$router.replace("/index/houseHoldList")
        }else {
          this.$message.error(resp.data.msg)
        }
      })

    },
    updateHouseHold(){
      postRequest("/houseHold/update",{
        id:this.form.id,
        householder:this.form.householder,
        address:this.form.address,
         description:this.form.description
      }).then(resp=>{
        if (resp.data.code === 200) {
          this.$message.success("更新成功!")
          this.$router.replace("/index/houseHoldList")
        }else if(resp.data.code === 500){
          this.$message.error(resp.data.msg)
        }
      })

    }
  }
}
</script>

<style scoped>

</style>