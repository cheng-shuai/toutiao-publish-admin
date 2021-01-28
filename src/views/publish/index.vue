<template>
  <div class="publish-container">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>{{ this.$route.query.id ? '修改文章' : '发布文章' }}</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <!--      表单-->
      <el-form :model="article" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="标题" class="title-item">
          <el-input v-model="article.title"></el-input>
        </el-form-item>
        <el-form-item label="内容">
          <el-tiptap
            v-model="article.content"
            lang="zh"
            height="400"
            :extensions="extensions"
          />
        </el-form-item>
        <el-form-item label="封面">
          <el-radio-group v-model="article.cover.type">
            <el-radio :label="1">单图</el-radio>
            <el-radio :label="3">三图</el-radio>
            <el-radio :label="0">无图</el-radio>
            <el-radio :label="-1">自动</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="频道">
          <el-select v-model="article.channel_id" placeholder="请选择频道">
            <el-option :label="channel.name" :value="channel.id" v-for="(channel, index) in channels"
                       :key="index"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onPushArticle">发布</el-button>
          <el-button type="plain" @click="onSaveDraft">存入草稿</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
// 导入获取文章频道列表
import { getArticleChannels, publishArticle, getArticle, updateArticle } from '@/api/article'
// 导入富文本编辑器
import {
  ElementTiptap,
  Doc,
  Text,
  Paragraph,
  Heading,
  Bold,
  Underline,
  Italic,
  Image,
  Strike,
  ListItem,
  BulletList,
  OrderedList,
  TodoItem,
  TodoList,
  HorizontalRule,
  Fullscreen,
  Preview,
  CodeBlock
} from 'element-tiptap'
// import element-tiptap 样式
import 'element-tiptap/lib/index.css'

// 上传图片
import { uploadImage } from '@/api/image'

export default {
  name: 'Publish',
  data () {
    return {
      article: {
        title: '', // 文章标题
        content: '', // 文章内容
        cover: {
          type: 0,
          images: []
        },
        channel_id: null // 文章所属id
      },
      channels: [], // 文章频道列表
      extensions: [
        new Doc(),
        new Text(),
        new Paragraph(),
        new Heading({ level: 3 }),
        new Bold({ bubble: true }), // 在气泡菜单中渲染菜单按钮
        new Image({
          uploadRequest (file) {
            const fd = new FormData()
            fd.append('image', file)
            return uploadImage(fd).then(res => {
              return res.data.data.url
            })
          }
        }),
        new Underline(), // 下划线
        new Italic(), // 斜体
        new Strike(), // 删除线
        new HorizontalRule(), // 华丽的分割线
        new ListItem(),
        new BulletList(), // 无序列表
        new OrderedList(), // 有序列表
        new TodoItem(),
        new TodoList(),
        new Fullscreen(),
        new Preview(),
        new CodeBlock()
      ]
    }
  },
  created () {
    this.getChannels()
    const articleId = this.$route.query.id
    if (articleId) {
      this.loadArticle(articleId)
    }
  },
  methods: {
    getChannels () {
      getArticleChannels().then(res => {
        this.channels = res.data.data.channels
      })
    },
    onPushArticle () {
      const articleId = this.$route.query.id
      if (articleId) {
        updateArticle(articleId, false, this.article).then(res => {
          this.$message.success('修改成功')
          this.$router.push('/article')
        })
      } else {
        publishArticle(false, this.article).then(res => {
          this.$message.success('发布成功')
          this.$router.push('/article')
        })
      }
    },
    onSaveDraft () {
      const articleId = this.$route.query.id
      if (articleId) {
        updateArticle(articleId, true, this.article)
      }
      publishArticle(true, this.article)
      this.$message.success('保存为草稿成功')
    },
    loadArticle (artileId) {
      getArticle(artileId).then(res => {
        this.article = res.data.data
      })
    }
  },
  components: {
    'el-tiptap': ElementTiptap
  }
}
</script>

<style lang="less" scoped>
.title-item {
  width: 500px;
}

</style>
