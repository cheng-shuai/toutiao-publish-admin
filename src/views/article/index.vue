<template>
  <div class="article-container">
    <!--    上面的部分-->
    <el-card class="box-card">
      <!--      面包屑路径导航-->
      <div slot="header">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>内容管理</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <!--      数据筛选表单-->
      <el-form label-width="80px" size="small">
        <el-form-item label="状态">
          <el-radio-group v-model="status">
            <el-radio :label="null">全部</el-radio>
            <el-radio :label="0">草稿</el-radio>
            <el-radio :label="1">待审核</el-radio>
            <el-radio :label="2">审核通过</el-radio>
            <el-radio :label="3">审核失败</el-radio>
            <el-radio :label="4">已删除</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="频道">
          <el-select v-model="channelId" placeholder="请选择">
            <el-option
              label="全部"
              :value="null">
            </el-option>
            <el-option
              v-for="channel in channels"
              :key="channel.id"
              :label="channel.name"
              :value="channel.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="日期">
          <el-date-picker
            v-model="rangerDate"
            type="datetimerange"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :default-time="['12:00:00']"
            format="yyyy-MM-dd"
            value-format="yyyy-MM-dd">
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="loadArticles(1)" :disabled="isLoading">筛选</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <!--    下面的部分-->
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>根据筛选条件共查询到 {{ totalCount }} 条结果：</span>
      </div>
      <el-table
        v-loading="isLoading"
        :data="articles"
        style="width: 100%">
        <el-table-column
          label="封面"
          width="180">
          <template slot-scope="scope">
            <img v-if="scope.row.cover.images[0]" :src="scope.row.cover.images[0]" alt="" class="image">
            <img v-else src="./error.gif" alt="" class="image">
          </template>
        </el-table-column>
        <el-table-column
          prop="title"
          label="标题"
          width="180">
        </el-table-column>
        <el-table-column
          label="状态">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.status === 0" type="primary">草稿</el-tag>
            <el-tag v-else-if="scope.row.status === 1" type="info">待审核</el-tag>
            <el-tag v-else-if="scope.row.status === 2" type="success">审核通过</el-tag>
            <el-tag v-else-if="scope.row.status === 3" type="danger">审核失败</el-tag>
            <el-tag v-else-if="scope.row.status === 4" type="warning">已删除</el-tag>
          </template>
        </el-table-column>
        <el-table-column
          prop="pubdate"
          label="发布时间">
        </el-table-column>
        <el-table-column
          label="操作"
          width="120">
          <template slot-scope="scope">
            <el-button
              type="primary"
              icon="el-icon-edit" circle plain></el-button>
            <el-button
              type="danger"
              icon="el-icon-delete" circle plain
              @click="onDeleteArticle(scope.row.id)"></el-button>
          </template>
        </el-table-column>
      </el-table>
      <!--      分页-->
      <div class="pagination">
        <el-pagination
          background
          layout="prev, pager, next"
          :total="totalCount"
          :disabled="isLoading"
          :current-page.sync="page"
          @current-change="onCurrentChange">
        </el-pagination>
      </div>
    </el-card>
  </div>
</template>

<script>
// 导入文章模块
import { getArticles, getArticleChannels, deleteArticle } from '@/api/article'

export default {
  name: 'Article',
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
      articles: [],
      totalCount: 0, // 总数据条数
      status: null, // 文章状态
      channels: [],
      channelId: null,
      rangerDate: null,
      isLoading: true,
      page: 1
    }
  },
  methods: {
    loadArticles (page) {
      // 打开loading
      this.isLoading = true
      getArticles({
        page: page,
        per_page: 10,
        status: this.status,
        channel_id: this.channelId,
        begin_pubdate: this.rangerDate ? this.rangerDate[0] : null,
        end_pubdate: this.rangerDate ? this.rangerDate[1] : null
      }).then(res => {
        this.articles = res.data.data.results
        this.totalCount = res.data.data.total_count

        // 关闭loading
        this.isLoading = false
      })
    },
    onCurrentChange (page) {
      this.loadArticles(page)
    },
    loadArticleChannels () {
      getArticleChannels().then(res => {
        this.channels = res.data.data.channels
      })
    },
    onDeleteArticle (articleId) {
      console.log(articleId)
      this.$confirm('确认删除文章吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteArticle(articleId.toString()).then(res => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
          this.loadArticles(this.page)
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    }
  },
  created () {
    this.loadArticles()
    this.loadArticleChannels()
  }
}
</script>

<style lang="less" scoped>
.box-card {
  margin-bottom: 20px;
}

.el-table {
  margin-bottom: 20px;
}

.image {
  width: 150px;
  height: 100px;
}
.pagination {
  display: block;
  text-align: right;
}

</style>
