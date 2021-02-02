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
            :src="userProfile.photo"></el-avatar>
          <p>点击修改头像</p>
        </label>
        <input type="file" id="file" hidden>
      </el-col>
    </el-row>
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
      userProfile: {}
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
