<template>
  <div class="layout-container">
    <el-container>
      <el-aside :width="isCollapse ? '64px' : '200px'">
        <app-aside class="aside-menu" :is-collapse="isCollapse"/>
      </el-aside>
      <el-container>
        <el-header>
          <div class="ls">
            <i :class="{
              'el-icon-s-fold': !isCollapse,
              'el-icon-s-unfold': isCollapse
            }"
               @click="isCollapse = !isCollapse"></i>
            <span>江苏传智播客科技教育有限公司</span>
          </div>
          <el-dropdown>
            <div class="avatar-wrap">
              <img class="avatar" :src="user.photo" alt="">
              <span>{{ user.name }}</span>
              <i class="el-icon-arrow-down"></i>
            </div>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item  @click.native="goSetting"><i class="el-icon-setting"></i>个人设置</el-dropdown-item>
              <el-dropdown-item @click.native="onLogout"><i class="el-icon-unlock"></i>退出登录
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-header>
        <el-main>
          <router-view/>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import AppAside from '@/views/layout/components/AppAside'
import { getUserProfile } from '@/api/user'
import globalBus from '@/utils/global-bus'

export default {
  name: 'Layout',
  data () {
    return {
      user: {}, // 当前登录用户信息
      isCollapse: false // 侧边栏折叠状态
    }
  },
  components: {
    AppAside
  },
  created () {
    this.loadUserProfile()
    // 注册事件
    globalBus.$on('update-user', (data) => {
      this.user.name = data.name
      this.user.photo = data.photo
    })
  },
  methods: {
    loadUserProfile () {
      getUserProfile().then(res => {
        this.user = res.data.data
      })
    },
    onLogout () {
      this.$confirm('确认退出吗？')
        .then(() => {
          // 移除用户信息
          window.localStorage.removeItem('user')
          // 跳转到登录页面
          this.$router.push('/login')
          this.$message.success('退出成功')
        })
        .catch(_ => {
          this.$message.warning('已取消退出')
        })
    },
    goSetting () {
      this.$router.push('/setting')
    }
  }
}
</script>

<style lang="less" scoped>
.layout-container {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}

.el-container {
  height: 100%;
}

.el-aside {
  background-color: #002033;
}

.el-header {
  background-color: #FFFFFF;
  border-bottom: 1px solid #DDDDDD;
}

.aside-menu {
  height: 100%;
}

.el-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.avatar-wrap {
  display: flex;
  justify-content: center;
  align-items: center;

  span {
    padding: 0 5px;
  }

  .avatar {
    width: 30px;
    height: 30px;
  }
}
</style>
