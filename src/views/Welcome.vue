<template>
  <div class="root">
    <div class="item">
      <h2>欢迎使用户籍管理系统</h2>
      <h4>当前身份为-{{identity}}</h4>
    </div>
  </div>
</template>

<script>
export default {
  name: "Welcome",
  data() {
    return{
      identity:'普通用户'
    }
  },
  mounted() {
    let userObj =JSON.parse(window.localStorage.getItem("user"))
    if (userObj.type==='1'){
      this.identity='管理员'
    }
  },
}
</script>

<style scoped>
.root {
  width : 100%;
  height : 100%;
  border: 2px solid black;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #B3C0D1;
}
.item {

}
</style>