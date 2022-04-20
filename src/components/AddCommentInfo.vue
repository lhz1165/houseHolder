<template>
    <div>
      <el-form ref="form"   class="myForm">
        <el-descriptions title="添加反馈">
          <el-descriptions-item label="用户">{{ username }}</el-descriptions-item>
        </el-descriptions>
        <br/>
        <el-descriptions title="标题"></el-descriptions>
        <el-input
            type="textarea"
            :rows="2"
            placeholder="请输入反馈标题"
            v-model="title"
            maxlength="100"
            class="Mycontent"
        >
        </el-input>
        <br/>
        <br/>
        <br/>
        <br/>
        <el-descriptions title="内容">
        </el-descriptions>

        <el-input
            type="textarea"
            :rows="3"
            placeholder="请输入反馈内容"
            v-model="content"
            maxlength="100"
            class="Mycontent"
        > </el-input>
        <br/>
        <br/>
        <br/>
        <br/>
        <el-row>
          <el-button type="success" class="myBtn" @click="onSubmit()">添加</el-button>
          <el-button type="success" class="myBtn" @click="back()">返回</el-button>
        </el-row>
      </el-form>



    </div>
</template>

<script>
import {postRequest} from "@/utils/apis";

export default {
  name: "AddCommentInfo",
  data(){
    return{
      username:'',
      title:'',
      content:'',
    }
  },
  mounted() {
    let userObj = JSON.parse(window.localStorage.getItem("user"));
    if (userObj != null) {
      this.username=userObj.username
    }
  },
  methods:{
    onSubmit(){
      postRequest("/comment/add",{
        content:this.content,
        commentUser:this.username,
        title:this.title,
      }).then(resp=>{
        if (resp.data.code === 200) {
          this.$message.success("添加成功")
          this.$router.replace({name:"comment"})
        }
      })
    },
    back(){
      this.$router.replace("/index/comment")
    }
  }
}
</script>
<style>
.myBtn{
  margin:  auto 100px;
}
.myForm{
  width: 800px;
  margin-left: 200px ;
}

</style>

