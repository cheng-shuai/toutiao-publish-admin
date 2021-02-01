<template>
  <div class="comment-container">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <!--        面包屑导航-->
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>评论管理</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <!--      评论列表-->
      <el-table
        style="width: 100%"
        :data="commonList"
      >
        <el-table-column
          prop="title"
          label="标题">
        </el-table-column>
        <el-table-column
          prop="total_comment_count"
          label="总评论数">
        </el-table-column>
        <el-table-column
          prop="fans_comment_count"
          label="粉丝评论数">
        </el-table-column>
        <el-table-column
          label="状态">
          <template slot-scope="scope">
            <div v-if="scope.row.comment_status === true">正常</div>
            <div v-else>关闭</div>
          </template>
        </el-table-column>
        <el-table-column
          label="操作">
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.comment_status"
              @change="onCommonChange(scope.row.id, scope.row.comment_status)"
              active-color="#13ce66"
              inactive-color="#ff4949">
            </el-switch>
          </template>
        </el-table-column>
      </el-table>
      <!--      分页-->
      <div style="display: flex; justify-content: flex-end;">
        <el-pagination
          style="margin-top: 20px;"
          background
          @current-change="onCurrentChange"
          layout="prev, pager, next"
          :total="totalCount"
          :page-size="10"
        >
        </el-pagination>
      </div>
    </el-card>
  </div>
</template>

<script>
import { getComment, commentChange } from '@/api/comment'

export default {
  name: 'CommentIndex',
  data () {
    return {
      commonList: [],
      totalCount: null
    }
  },
  created () {
    this.loadGetComment()
  },
  methods: {
    loadGetComment () {
      getComment({
        response_type: 'comment'
      }).then(res => {
        this.commonList = res.data.data.results
        this.totalCount = res.data.data.total_count
      })
    },
    onCommonChange (id, commentStatus) {
      commentChange(id.toString(), commentStatus).then(res => {
        this.$message.success('修改状态成功')
      })
    },
    onCurrentChange (page) {
      getComment({
        response_type: 'comment',
        page: page
      }).then(res => {
        this.commonList = res.data.data.results
      })
    }
  }
}
</script>

<style lang="less" scoped>

</style>
