<template>
  <div>
    个人户籍管理 personal id = {{id}}
<!--    个人户籍管理 personal id = {{this.$route.params.id}}-->

  </div>
</template>

<script>
export default {
  name: "Personal",
  props:['id'],
  data() {
    return {
      //fits: ['fill', 'contain', 'cover', 'none', 'scale-down'],
      fits: [ 'contain'],
      url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
    }
  }
}
</script>

<style scoped>

</style>