<template>
  <div class="image-list">
    <div class="action-head">
      <el-radio-group v-model="collect" @change="onChangeCollect" size="medium">
        <el-radio-button :label="false">全部</el-radio-button>
        <el-radio-button :label="true">收藏</el-radio-button>
      </el-radio-group>
      <el-button v-if="isShowAdd" type="success" size="medium" @click="dialogUploadVisible = true">上传素材</el-button>
    </div>
    <!--      素材图片-->
    <el-row :gutter="10" class="selected-div">
      <el-col :xs="12" :sm="8" :md="6" :lg="4"
              v-for="(img, index) in images"
              :key="index"
              class="img-item"
              @click.native="selected = index"
      >
        <el-image
          v-if="isShowSize"
          style=" height: 180px; width: 180px"
          :src="img.url"
          fit="cover"
        ></el-image>
        <el-image
          v-else
          style=" height: 100px;"
          :src="img.url"
          fit="cover"
        ></el-image>
        <div class="selected" v-if="isShowSelected && selected === index"></div>
        <div class="select-btn" v-if="isShowAction">
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
    <div style="display: flex; justify-content: flex-end;">
      <el-pagination
        background
        layout="prev, pager, next"
        @current-change="onCurrentChange"
        :current-page="page"
        :total="totalCount"
        :hide-on-single-page="true"
      >
      </el-pagination>
    </div>
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
  name: 'ImageList',
  props: {
    isShowAdd: {
      type: Boolean,
      default: true
    },
    isShowAction: {
      type: Boolean,
      default: true
    },
    isShowSize: {
      type: Boolean,
      default: true
    },
    isShowSelected: {
      type: Boolean,
      default: false
    }
  },
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
      currentType: false,
      selected: null
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
        per_page: 10
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

.img-item {
  margin: 0 20px 20px;
  position: relative;
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

.selected-div {
  position: relative;
}

.selected {
  background: url("./selected.png") no-repeat;
  background-size: cover;
  width: 100px;
  height: 100px;
  position: absolute;
  top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
