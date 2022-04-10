<template>
  <div>
    个人户籍管理 personal id = {{id}}
<!--    个人户籍管理 personal id = {{this.$route.params.id}}-->
  </div>
</template>

<script>
export default {
  name: "Personal",
  props:['id']
}
</script>

<style scoped>

</style>