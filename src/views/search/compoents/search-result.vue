<template>
  <div class="search-result">
    <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
      <ArticleItem v-for="(item, index) in list" :key="index" :article="item" />
    </van-list>
  </div>
</template>

<script>
import { searchApI } from '@/api';
import ArticleItem from '@/components/article-item'
export default {
  props: {
    searchText: {
      type: String,
      require: true
    }
  },
  data() {
    return {
      list: [],
      page: 1,
      per_page: 10,
      loading: false,
      finished: false,
    };
  },
  components: {
    ArticleItem
  },
  methods: {
    async onLoad() {
      try{
      // 异步更新数据
      // 加载状态结束
      const searchList = await this.getSearchResult()
      console.log(searchList)
      if (searchList.length) {
        this.list = [...this.list, ...searchList]
        this.page++
        // 数据全部加载完成
        this.loading = false;
      } else {
        this.finished = true;
      }
      }catch(err){
        this.error = true;
        this.loading = false
        this.$toast('数据获取失败，请稍后重试')
      }
    },
    //数据请求方法
    async getSearchResult() {
      const { data } = await searchApI({ q: this.searchText, page: this.page, per_page: this.per_page })
      return data.data.results
    }
  },
}
</script>

<style scoped lang="less"></style>
