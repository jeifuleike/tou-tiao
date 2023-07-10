<template>
  <div class="article-list">
    <van-pull-refresh v-model="refreshing" @refresh="onRefresh" :success-text=isacaticlistText>
      <van-list v-model="loading" :finished="finished" finished-text="没有更多了" :error.sync="error" error-text="请求失败，点击重新加载"
        @load="onLoad">
        <ArticleItem v-for="item in list" :key="item.id" :article='item'/>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { articles } from '@/api/article';
import ArticleItem from '@/components/article-item'
export default {
  name: 'ArticleList',
  props: {
    channel: {
      type: Object,
      required: true
    }
  },
  components: {
    ArticleItem
  },
  data() {
    return {
      list: [],
      pre_times: null,
      loading: false,
      finished: false,
      error: false,
      refreshing: false,
      isacaticlistText: null
    };
  }, methods: {
    async getArticles() {
      const { data } = await articles({
        channel_id: this.channel.id,
        timestamp: this.pre_times || Date.now()
      })
      if (data.data.results.length) {
        this.pre_times = data.data.pre_timestamp
      } else {
        this.finished = true
      }
      return data.data.results
    },
    async onLoad() {
      // 异步更新数据
      // setTimeout 仅做示例，真实场景中一般为 ajax 请求
      try {
        this.list.push(...await this.getArticles())
        this.loading = false
      } catch (err) {
        this.error = true
        this.loading = false
      }
    },
    async onRefresh() {
      // 清空列表数
      try {
        this.finished = false;
        // 重新加载数据
        // 将 loading 设置为 true，表示处于加载状态
        this.loading = true;
        const articleList = await this.getArticles()
        this.list.splice(0, 0, ...articleList);
        this.isacaticlistText = `刷新成功，更新了${articleList.length}条数据`
        this.refreshing = false
      } catch (err) {
        this.isacaticlistText = '刷新失败'
        this.error = true
        this.refreshing = false
      }
    },
  },
}
</script>

<style scoped lang="less">
.article-list {
  height: 81vh;
  overflow-y: auto;
}
</style>