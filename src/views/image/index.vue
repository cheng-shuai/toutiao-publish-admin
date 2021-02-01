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
            fit="cover"
          ></el-image>
          <div class="select-btn">
            <i :class="{
              'el-icon-star-on': img.is_collected,
              'el-icon-star-off': !img.is_collected
            }"
               @click="onCollectImage(img)"
            ></i>
            <i class="el-icon-delete"
               @click="onDeleteImage(img)"></i>
          </div>
        </el-col>
      </el-row>
      <!--      分页-->
      <el-pagination
        background
        layout="prev, pager, next"
        @current-change="onCurrentChange"
        :current-page="page"
        :total="totalCount"
        :page-size="12"
        :hide-on-single-page="true"
      >
      </el-pagination>
    </el-card>
    <!--    弹出层（上传图片）-->
    <el-dialog
      width="400px"
      title="上传素材"
      :visible.sync="dialogUploadVisible"
      :append-to-body="true"
    >
      <el-upload
        drag
        :show-file-list="false"
        :headers="uploadHeaders"
        name="image"
        :on-success="uploadSuccess"
        action="http://api-toutiao-web.itheima.net/mp/v1_0/user/images"
        multiple>
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
      </el-upload>
    </el-dialog>
  </div>
</template>

<script>
import { getImages, collectImage, delectImage } from '@/api/image'

export default {
  name: 'ImageIndex',
  data () {
    return {
      collect: false,
      images: [],
      dialogUploadVisible: false,
      uploadHeaders: {
        Authorization: `Bearer ${JSON.parse(window.localStorage.getItem('user')).token}`
      },
      totalCount: null,
      page: 1,
      currentType: false
    }
  },
  created () {
    this.loadImages(false)
  },
  methods: {
    loadImages (collect, page = 1) {
      getImages({
        collect,
        page,
        per_page: 12
      }).then(res => {
        this.page = page
        this.totalCount = res.data.data.total_count
        this.images = res.data.data.results
      })
    },
    onChangeCollect (value) {
      this.loadImages(value)
      this.currentType = value
    },
    uploadSuccess () {
      this.dialogUploadVisible = false
      this.loadImages(false)
      this.$message.success('上传素材成功')
    },
    onCurrentChange (page) {
      this.loadImages(this.currentType, page)
    },
    onCollectImage (img) {
      collectImage(img.id, !img.is_collected).then(res => {
        img.is_collected = !img.is_collected
        if (img.is_collected) {
          this.$message.success('收藏图片成功')
        } else {
          this.$message.success('取消收藏图片成功')
        }
      })
    },
    onDeleteImage (img) {
      delectImage(img.id).then(res => {
        this.loadImages(false, this.page)
        this.$message.success('删除图片成功')
      })
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

.select-btn {
  position: relative;
  bottom: 0;
  top: -35px;
  width: 180px;
  height: 30px;
  background: rgba(0, 0, 0, .1);
  display: flex;
  font-size: 21px;
  justify-content: space-around;
  align-items: center;

  i {
    cursor: pointer;
  }
}
</style>
