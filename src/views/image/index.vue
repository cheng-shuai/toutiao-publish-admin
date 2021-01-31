<template>
  <div class="image-container">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>素材管理</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <el-radio-group v-model="collect" style="margin-bottom: 20px;" @change="onChangeCollect">
        <el-radio-button :label="false">全部</el-radio-button>
        <el-radio-button :label="true">收藏</el-radio-button>
      </el-radio-group>
      <!--      素材图片-->
      <el-row :gutter="20">
        <el-col :xs="12" :sm="8" :md="6" :lg="4"
                v-for="(img, index) in images" :key="index">
          <el-image
            style=" height: 180px; width: 180px"
            :src="img.url"
            fit="cover"></el-image>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
import { getImages } from '@/api/image'

export default {
  name: 'ImageIndex',
  data () {
    return {
      collect: false,
      images: []
    }
  },
  created () {
    this.loadImages(false)
  },
  methods: {
    loadImages (collect) {
      getImages({
        collect,
        per_page: 12
      }).then(res => {
        this.images = res.data.data.results
      })
    },
    onChangeCollect (value) {
      this.loadImages(value)
    }
  }
}
</script>

<style lang="less" scoped>

</style>
