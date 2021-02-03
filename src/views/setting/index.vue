<template>
  <div class="setting-container">
    <el-row :gutter="20">
      <el-col :span="12">
        <el-form :model="userProfile" label-width="80px" :rules="formRules">
          <el-form-item label="编号">
            <el-input v-model="userProfile.id"></el-input>
          </el-form-item>
          <el-form-item label="手机">
            <el-input v-model="userProfile.mobile"></el-input>
          </el-form-item>
          <el-form-item label="媒体名称" prop="name">
            <el-input v-model="userProfile.name"></el-input>
          </el-form-item>
          <el-form-item label="媒体介绍" prop="intro">
            <el-input type="textarea" v-model="userProfile.intro"></el-input>
          </el-form-item>
          <el-form-item label="邮箱" prop="email">
            <el-input v-model="userProfile.email"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">保存设置</el-button>
          </el-form-item>
        </el-form>
      </el-col>
      <el-col :span="12" class="avatar-div">
        <label for="file">
          <el-avatar
            shape="square"
            :size="178"
            fit="cover"
            :src="userProfile.photo"></el-avatar>
          <p>点击修改头像</p>
        </label>
        <input
          type="file"
          id="file"
          ref="file"
          hidden
          @change="onFileChange">
      </el-col>
    </el-row>
    <!--    弹出层-->
    <el-dialog
      title="更换头像"
      append-to-body
      :visible.sync="dialogVisible"
      @opened="openAfter"
      @closed="closeAfter"
    >
      <div class="preview-image-wrap">
        <img ref="preview-image" :src="previewImage" class="preview-image" alt="">
      </div>
      <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="onUpdateAvatar" :loading="isLoading">确 定</el-button>
  </span>
    </el-dialog>
  </div>
</template>

<script>
import { editUserProfile, getUserProfile, uploadAvatar } from '@/api/setting'
import 'cropperjs/dist/cropper.css'
import Cropper from 'cropperjs'

export default {
  name: 'Setting',
  data () {
    return {
      userProfile: {},
      previewImage: '',
      dialogVisible: false,
      cropper: null, // 裁切器实例
      isLoading: false, // 按钮loading状态
      formRules: {
        name: [
          {
            required: true,
            message: '请输入媒体名称',
            trigger: 'blur'
          },
          {
            min: 3,
            max: 15,
            message: '长度在 3 到 15 个字符',
            trigger: 'change'
          }
        ],
        intro: [
          {
            required: true,
            message: '请输入媒体的介绍',
            trigger: 'blur'
          }
        ],
        email: [
          {
            required: true,
            message: '请输入邮箱地址',
            trigger: 'blur'
          },
          {
            type: 'email',
            message: '请输入正确的邮箱地址',
            trigger: ['blur', 'change']
          }
        ]
      }
    }
  },
  methods: {
    onSubmit () {
      editUserProfile({
        name: this.userProfile.name,
        intro: this.userProfile.intro,
        email: this.userProfile.email
      }).then(res => {
        this.$message.success('修改资料成功')
      })
    },
    loadUserProfile () {
      getUserProfile().then(res => {
        this.userProfile = res.data.data
      })
    },
    onFileChange () {
      // 显示弹出层
      this.dialogVisible = true

      // 显示预览图片
      const file = this.$refs.file
      this.previewImage = window.URL.createObjectURL(file.files[0])

      // 结局相同文件不触发change事件
      this.$refs.file.value = ''
    },
    openAfter () {
      const image = this.$refs['preview-image']
      this.cropper = new Cropper(image, {
        aspectRatio: 1,
        viewMode: 1,
        dragMode: 'none',
        movable: true
      })
    },
    closeAfter () {
      this.cropper.destroy()
    },
    onUpdateAvatar () {
      this.isLoading = true
      this.cropper.getCroppedCanvas().toBlob(blob => {
        const fd = new FormData()
        fd.append('photo', blob)
        // 请求更新用户头像提交fd
        uploadAvatar(fd).then(res => {
          // 关闭弹出层
          this.dialogVisible = false
          // 从服务端更新用户头像
          this.userProfile.photo = res.data.data.photo
          // 更新完头像后loading关闭
          this.isLoading = false
          // 修改用户头像成功
          this.$message.success('修改用户头像成功')
        })
      })
    }
  },
  created () {
    this.loadUserProfile()
  }
}
</script>

<style lang="less" scoped>
.avatar-div {
  display: flex;
  justify-content: center;
  text-align: center;
}

.preview-image-wrap {
  .preview-image {
    display: block;
    height: 250px;
    /* This rule is very important, please don't ignore this */
    max-width: 100%;
  }
}
</style>
