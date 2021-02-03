<template>
  <div class="fans-container">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>粉丝管理</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <el-tabs type="card" value="list">
        <el-tab-pane label="粉丝列表" name="list">
          <div class="fansList" v-for="(fans, index) in fansList" :key="index">
            <div style="text-align: center;">
              <el-avatar :src="fans.photo" shape="circle" class="avatar"></el-avatar>
            </div>
            <div class="fansName">{{ fans.name }}</div>
            <div class="btn">
              <el-button type="primary" round size="small">关注</el-button>
            </div>
          </div>
          <div>
            <el-pagination
              class="pagination"
              background
              layout="prev, pager, next"
              :total="totalCount">
            </el-pagination>
          </div>
        </el-tab-pane>
        <el-tab-pane label="粉丝画像" name="portrayal">
          <!-- 为 ECharts 准备一个具备大小（宽高）的 DOM -->
          <div ref="main" style="width: 600px;height:400px;"></div>
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script>
import { getFansList } from '@/api/fans'
import * as echarts from 'echarts'

export default {
  name: 'FansIndex',
  data () {
    return {
      fansList: {},
      totalCount: null
    }
  },
  created () {
    this.loadFansList()
  },
  methods: {
    loadFansList () {
      getFansList().then(res => {
        console.log(res)
        this.fansList = res.data.data.results
        this.totalCount = res.data.data.total_count
      })
    }
  },
  mounted () {
    // 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(this.$refs.main)

    // 指定图表的配置项和数据
    var option = {
      title: {
        text: 'ECharts 入门示例'
      },
      tooltip: {},
      legend: {
        data: ['销量']
      },
      xAxis: {
        data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
      },
      yAxis: {},
      series: [{
        name: '销量',
        type: 'bar',
        data: [5, 20, 36, 10, 10, 20]
      }]
    }

    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option)
  }
}
</script>

<style lang="less" scoped>
.fansList {
  width: 120px;
  height: 170px;
  border: 1px dashed #ccc;

  .avatar {
    width: 80px;
    height: 80px;
    margin-top: 10px;
  }

  .fansName {
    text-align: center;
    font-size: 12px;
    margin-top: 8px;
  }

  .btn {
    text-align: center;
    margin-top: 10px;
  }
}

.pagination {
  display: flex;
  margin-top: 20px;
  justify-content: flex-end;
}
</style>
