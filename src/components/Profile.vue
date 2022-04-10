<template>
<div>
  系统管理员 id = {{querb.id}}
</div>
</template>

<script>
export default {
  name: "UserInfo",
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
    }
  }
}
</script>

<style scoped>

</style>