<template>
  <div>

    <el-descriptions class="margin-top" title="个人信息" :column="3" size="medium" border>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-user"></i>
          姓名
        </template>
        kooriookami
      </el-descriptions-item>

      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-user"></i>
          性别
        </template>
        kooriookami
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-mobile-phone"></i>
          手机号
        </template>
        18100000000
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-location-outline"></i>
          籍贯
        </template>
        苏州市
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-tickets"></i>
          民族
        </template>
        <el-tag size="small">学校</el-tag>
      </el-descriptions-item>

      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-user"></i>
          生日
        </template>
        kooriookami
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-user"></i>
          身份证
        </template>
        kooriookami
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-user"></i>
          户籍状态
        </template>
        kooriookami
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-user"></i>
          户籍号
        </template>
        kooriookami
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-office-building"></i>
          联系地址
        </template>
        江苏省苏州市吴中区吴中大道 1188 号
      </el-descriptions-item>

    </el-descriptions>
    <el-divider></el-divider>
    <el-descriptions class="margin-top" title="户籍信息" :column="2" size="medium" border>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-user"></i>
          户主名
        </template>
        kooriookami
      </el-descriptions-item>

      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-user"></i>
          组号
        </template>
        kooriookami
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-mobile-phone"></i>
          户籍地址
        </template>
        18100000000
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-location-outline"></i>
          籍贯
        </template>
        苏州市
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-tickets"></i>
          人数
        </template>
        <el-tag size="small">学校</el-tag>
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-user"></i>
          户号
        </template>
        kooriookami
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-user"></i>
          备注
        </template>
        kooriookami
      </el-descriptions-item>


    </el-descriptions>

  </div>


</template>

<script>
export default {
  name: "HouserHolderInfo",
  data() {
    return {
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      }
    }
  },
  methods: {
    onSubmit() {
      console.log('submit!');
    }
  }
}
</script>

<style scoped>

</style>