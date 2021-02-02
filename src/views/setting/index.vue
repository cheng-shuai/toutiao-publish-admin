<template>
  <div class="setting-container">
    <el-row :gutter="20">
      <el-col :span="12">
        <el-form :model="userProfile" label-width="80px">
          <el-form-item label="编号">
            <el-input v-model="userProfile.id"></el-input>
          </el-form-item>
          <el-form-item label="手机">
            <el-input v-model="userProfile.mobile"></el-input>
          </el-form-item>
          <el-form-item label="媒体名称">
            <el-input v-model="userProfile.name"></el-input>
          </el-form-item>
          <el-form-item label="媒体介绍">
            <el-input type="textarea" v-model="userProfile.intro"></el-input>
          </el-form-item>
          <el-form-item label="邮箱">
            <el-input v-model="userProfile.email"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">保存设置</el-button>
            <el-button>取消</el-button>
          </el-form-item>
        </el-form>
      </el-col>
      <el-col :span="12" class="avatar-div">
        <label for="file">
          <el-avatar
            shape="square"
            :size="178"
            fit="cover"
            :src="previewImage"></el-avatar>
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
      :visible.sync="dialogVisible">
      <img :src="previewImage" alt="" width="178" height="178">
      <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
  </span>
    </el-dialog>
  </div>
</template>

<script>
import { getUserProfile } from '@/api/setting'

export default {
  name: 'Setting',
  data () {
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
      },
      userProfile: {},
      previewImage: '',
      dialogVisible: false
    }
  },
  methods: {
    onSubmit () {
      console.log(111)
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
      const blobData = window.URL.createObjectURL(file.files[0])
      this.previewImage = blobData

      // 结局相同文件不触发change事件
      this.$refs.file.value = ''
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
</style>
