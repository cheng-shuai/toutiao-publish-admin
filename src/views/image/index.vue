<template>
  <div class="image-container">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>素材管理</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <el-radio-group v-model="radio1" style="margin-bottom: 20px;">
        <el-radio-button label="全部"></el-radio-button>
        <el-radio-button label="北京"></el-radio-button>
      </el-radio-group>
      <!--      素材图片-->
      <el-row :gutter="20">
        <el-col :xs="12" :sm="8" :md="6" :lg="4">
          <el-image
            style=" height: 100px"
            src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
            fit="cover"></el-image>
        </el-col>
        <el-col :xs="12" :sm="8" :md="6" :lg="4">
          <el-image
            style="height: 100px"
            src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
            fit="cover"></el-image>
        </el-col>
        <el-col :xs="12" :sm="8" :md="6" :lg="4">
          <el-image
            style="height: 100px"
            src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
            fit="cover"></el-image>
        </el-col>
        <el-col :xs="12" :sm="8" :md="6" :lg="4">
          <el-image
            style="height: 100px"
            src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
            fit="cover"></el-image>
        </el-col>
        <el-col :xs="12" :sm="8" :md="6" :lg="4">
          <el-image
            style="height: 100px"
            src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
            fit="cover"></el-image>
        </el-col>
        <el-col :xs="12" :sm="8" :md="6" :lg="4">
          <el-image
            style="height: 100px"
            src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
            fit="cover"></el-image>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'ImageIndex',
  data () {
    return {
      radio1: '全部'
    }
  }
}
</script>

<style lang="less" scoped>

</style>
