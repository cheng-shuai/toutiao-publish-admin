<template>
  <el-menu
    default-active="/"
    background-color="#002033"
    text-color="#fff"
    active-text-color="#ffd04b"
    router
    :collapse="isCollapse"
    :collapse-transition="false"
  >
    <el-menu-item index="/">
      <i class="iconfont icon-home"></i>
      <span slot="title">首页</span>
    </el-menu-item>
    <el-menu-item index="article">
      <i class="iconfont icon-ContainingthePDFZIP"></i>
      <span slot="title">内容管理</span>
    </el-menu-item>
    <el-menu-item index="image">
      <i class="iconfont icon-image"></i>
      <span slot="title">素材管理</span>
    </el-menu-item>
    <el-menu-item index="publish">
      <i class="iconfont icon-publish"></i>
      <span slot="title">发布文章</span>
    </el-menu-item>
    <el-menu-item index="comment">
      <i class="iconfont icon-comment"></i>
      <span slot="title">评论管理</span>
    </el-menu-item>
    <el-menu-item index="fans">
      <i class="iconfont icon-gift"></i>
      <span slot="title">粉丝管理</span>
    </el-menu-item>
    <el-menu-item index="setting">
      <i class="iconfont icon-setting"></i>
      <span slot="title">个人设置</span>
    </el-menu-item>
  </el-menu>
</template>

<script>
export default {
  name: 'AppAside',
  methods: {},
  props: ['is-collapse'],
  data () {
    return {
      // isCollapse: false
    }
  }
}
</script>

<style scoped>
.iconfont {
  margin-right: 10px;
}
</style>
