<template>
  <div>
    aaa{{cid}}
    bbbb
    <el-form ref="form"   class="myForm">
      <el-descriptions title="反馈详情">
        <el-descriptions-item label="用户名">{{username}}</el-descriptions-item>
        <el-descriptions-item label="标题">{{ title }}</el-descriptions-item>
        <el-descriptions-item label="反馈时间">{{time}}</el-descriptions-item>
      </el-descriptions>
      <br/>
      <el-descriptions title="内容"></el-descriptions>
      <el-input
          type="textarea"
          :rows="5"
          placeholder=""
          v-model="content"
          readonly="readonly"
          maxlength="100"
          class="Mycontent"
      >
      </el-input>
      <br/>
      <br/>
      <hr>
      <br/>
      <br/>
      <el-descriptions title="回复">
        <el-descriptions-item label="回复时间">{{replyTime}}</el-descriptions-item>
      </el-descriptions>

      <el-input
          type="textarea"
          :rows="5"
          placeholder=""
          v-model="reply"
          maxlength="100"
          class="Mycontent"
          :readonly="readonly"
      > </el-input>
      <br/>
      <br/>
      <br/>
      <br/>
      <el-row>

        <el-button type="primary" class="myBtn"@click="editComment()" v-if="edit">修改</el-button>
        <el-button type="success" class="myBtn"@click="onSubmit()">返回</el-button>
      </el-row>



    </el-form>

  </div>
</template>

<script>
import {getRequest, postRequest} from "@/utils/apis";

export default {
  name: "CommentInfo",
  props:['cid'],
  data() {
    return {
        username: '',
        title: '',
        time: '',
        content: 'aaa',
        reply:'bbb',
        replyTime:'',
        readonly:true,
        edit:false,
    }
  },
  methods: {
    onSubmit() {
      this.$router.push("/index/comment")
    },
    getCommentInfo(){
      getRequest("/comment/get",{cid: this.cid})
      .then(resp=>{
        let obj = resp.data.data
        if (resp.data.code === 200) {
          this.username=obj.commentUser;
          this.title=obj.title;
          this.content=obj.content;
          this.reply=obj.reply;
          this.replyTime=(new Date(parseInt(obj.replyTime)).toLocaleString());
          this.time=(new Date(parseInt(obj.createTime)).toLocaleString());
        }
      });
      if (window.sessionStorage.getItem("user") != null) {
        if (JSON.parse(window.sessionStorage.getItem("user")).type==="1"){
          this.readonly=false;
          this.edit=true;
        }
      }
    },
    editComment(){
      postRequest("/comment/reply",{
        cid:this.cid,
        reply:this.reply,
      }).then(resp=>{
        if (resp.data.code === 200) {
          this.$message.success('回复成功')
          // setTimeout(() =>{
          //   this.getCommentInfo()
          // },500);
        }
      })

    }
  },
  mounted() {
    this.getCommentInfo()
  }
}
</script>

<style scoped>
.Mycontent{
  width: 800px;
}
.myBtn{
  margin-left: 100px;
}
.myForm{
  width: 800px;
  margin-left: 200px ;
}
</style>