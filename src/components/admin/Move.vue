<template>
  <div>
    <el-form ref="form" :model="form" label-width="80px" style=" width: 600px; margin-left: 300px ">
      <el-form-item label="户籍" >
        <el-select v-model="houseHoldId" placeholder="请选择">
          <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="用户" >
        <el-select v-model="usernames" multiple placeholder="请选择">
          <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
          </el-option>
        </el-select>

      </el-form-item>

      <el-form-item label="操作" >
        <el-radio v-model="op" label="in">迁入</el-radio>
        <el-radio v-model="op" label="out" >迁出</el-radio>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit" >立即创建</el-button>
        <el-button  @click="back()"> 取消</el-button>
      </el-form-item>


    </el-form>



  </div>
</template>

<script>
export default {
  name: "Move",
  data() {
    return {
      form:{

      },
      moves:[{
        value: '1',
        label: '迁入'
      },
        {
          value: '2',
          label: '迁出'
        }
      ],
      options: [{
        value: '选项1',
        label: '黄金糕'
      }, {
        value: '选项2',
        label: '双皮奶'
      }, {
        value: '选项3',
        label: '蚵仔煎'
      }, {
        value: '选项4',
        label: '龙须面'
      }, {
        value: '选项5',
        label: '北京烤鸭'
      }],
      houseHoldId: '',
      usernames: [],
      op: 'in',
    }
  },
  methods:{
    back(){
      this.$router.replace("/index/userInfoList")
    },
  }
}
</script>

<style scoped>

</style>