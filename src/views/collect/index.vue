<template>
  <div class="history">
    <van-nav-bar title="浏览历史" left-arrow @click-left="$router.back()" />
    <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
      <ArticleItem v-for="(item, index) in historyList" :key="index" :article="item" />
    </van-list>
  </div>
</template>

<script>
import ArticleItem from '@/components/article-item'
import { historyAPI } from '@/api'
export default {
  name:'History',
  components:{
    ArticleItem
  },
  data(){
    return{
      page:1,
      per_page:10,
      historyList:[],
      loading:false,
      finished:false
    }
  },
  methods:{
    //请求浏览历史记录
    async onLoad(){
      try{
        const {data} = await historyAPI({page:this.page,per_page:this.per_page})
        this.historyList.push(...data.data.results)
        if(data.data.results.length<10){
          this.finished = true
        }else{
          this.page++  
        }
        this.loading = false
      }catch(err){
        this.$toast('加载失败，请刷新后重试')
        this.loading = false
      }
    }
  }
}
</script>

<style lang="less" scoped>

</style>