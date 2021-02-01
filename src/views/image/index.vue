<template>
  <div class="image-container">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>素材管理</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div class="action-head">
        <el-radio-group v-model="collect" @change="onChangeCollect" size="medium">
          <el-radio-button :label="false">全部</el-radio-button>
          <el-radio-button :label="true">收藏</el-radio-button>
        </el-radio-group>
        <el-button type="success" size="medium" @click="dialogUploadVisible = true">上传素材</el-button>
      </div>
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
    <!--    弹出层（上传图片）-->
    <el-dialog title="上传素材" :visible.sync="dialogUploadVisible" :append-to-body="true">
      hello world
    </el-dialog>
  </div>
</template>

<script>
import { getImages } from '@/api/image'

export default {
  name: 'ImageIndex',
  data () {
    return {
      collect: false,
      images: [],
      dialogUploadVisible: false
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
.action-head {
  margin-bottom: 20px;
  display: flex;
  justify-content: space-between;
}
</style>
