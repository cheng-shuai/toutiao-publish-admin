<template>
  <div class="update-cover-container">
    <div class="upload-image-wrap" @click="showDialog">
      <img src="../image.png" alt="" v-if="!value">
      <img v-else :src="value" alt="" ref="image" class="upload-image">
    </div>
    <el-dialog
      title="选择素材"
      append-to-body
      :visible.sync="dialogVisible"
    >
      <el-tabs type="card" v-model="activeName">
        <el-tab-pane label="素材库" name="material">
          <image-list
            :is-show-add="false"
            :is-show-action="false"
            :is-show-size="false"
            :is-show-selected="true"
            ref="image-list"
          />
        </el-tab-pane>
        <el-tab-pane label="上传图片" name="upload">
          <input
            type="file"
            ref="file"
            @change="onFileChange"
          >
          <img width="150" ref="preview-image" src="" alt="">
        </el-tab-pane>
      </el-tabs>
      <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="submitUpload">确 定</el-button>
  </span>
    </el-dialog>
  </div>
</template>

<script>
import { uploadImage } from '@/api/image'
import ImageList from '@/views/image/components/ImageList'

export default {
  name: 'UpdateCover',
  props: ['value'],
  data () {
    return {
      dialogVisible: false,
      activeName: 'material'
    }
  },
  components: {
    ImageList
  },
  methods: {
    showDialog () {
      this.dialogVisible = true
    },
    onFileChange () {
      const file = this.$refs.file.files[0]

      this.$refs['preview-image'].src = window.URL.createObjectURL(file)
      // // 防止上传相同文件不触发change事件
      // this.$refs.file.value = ''
    },
    submitUpload () {
      if (this.activeName === 'upload') {
        const file = this.$refs.file.files[0]
        if (!file) {
          this.$message.warning('请选择上传的文件')
          return
        }
        const fd = new FormData()
        fd.append('image', file)
        uploadImage(fd).then(res => {
          this.dialogVisible = false
          this.input = res.data.data.url
          this.$emit('input', res.data.data.url)
        })
      } else if (this.activeName === 'material') {
        const imageList = this.$refs['image-list']
        const selected = imageList.selected
        if (selected === null) {
          this.$message.warning('请选择图片')
          return
        }
        // 关闭对话框
        this.dialogVisible = false
        // 修改绑定的父组件数据
        this.$emit('input', imageList.images[selected].url)
      }
    }
  }
}
</script>

<style lang="less" scoped>
.update-cover-container {
  .upload-image-wrap {
    width: 150px;
    height: 150px;
    border: 1px dashed #ccc;
    img {
      width: 100%;
    }
    .upload-image {
      width: 150px;
      height: 150px;
    }
  }
}
</style>
