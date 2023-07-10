<template>
  <div class="chaSearch">
    <!-- 搜索栏开始 -->
    <form action="/">
      <van-search v-model="SearchIndex" show-action placeholder="请输入搜索关键词" @search="onSearch" @cancel="$router.back()"
        @focus="isShow = false" background="#3296fa" />
    </form>
    <!-- 搜索栏结束 -->
    <div class="view">
       <!-- 搜索结果 -->
    <search-result v-if="isShow" :searchText="SearchIndex"></search-result>
    <!-- 搜索结果 -->

    <!-- 联想建议 -->
    <search-sugges v-else-if="SearchIndex" :recom="SearchIndex" @searchSugg="onSearch"></search-sugges>
    <!-- 联想建议 -->

    <!-- 搜索历史记录 -->
    <search-history v-else-if="!(history.length === 0)" :history = "history" @searchHis = "onSearch" @deletHistory = "deleteHis"></search-history>
    <!-- 搜索历史记录 -->
    </div>   
  </div>
</template>

<script>
import SearchHistory from './compoents/search-history.vue'
import searchResult from './compoents/search-result.vue'
import searchSugges from './compoents/search-sugges.vue'
import { getItem,setItem } from '@/utils/storage'

export default {
  data() {
    return {
      SearchIndex: '',
      isShow: false,
      history:getItem('searchHistory') || []
    };
  },
  components: {
    searchResult,
    searchSugges,
    SearchHistory
  },
  methods: {
    //搜索触发函数
    onSearch(value) {
      this.isShow = true
      //处理搜索联想
      this.SearchIndex = value
      //先查找搜索历史中是否含有现在搜索的词
      const index = this.history.indexOf(value)
      //如果有的话就先删除history原来有的词
      if(!(index === -1)){
        this.history.splice(index,1)
      }
      //限制搜索历史显示为五条数据
      if(this.history.length>=8){
        //如果搜索历史有五条数据了就删除数组最后一个元素，也就是用户最久没有搜索的词
        this.history.splice(this.history.length-1,1)
      }
      //把用户搜索的词插入history的最前面
      this.history.unshift(value)
      //本地化处理
      setItem('searchHistory',this.history)
    },
    deleteHis(index){
      //判断是什么删除方式
      if(index === -1){
        //如果传的值为-1则是全部删除，直接让history为空
        this.history = []
      }else{
        //如果不为-1则删除索引位的数据
        this.history.splice(index,1)
      }
      //本地化处理
      setItem('searchHistory',this.history)
    }
  }
}
</script>

<style scoped lang="less">
.van-search{
  position: fixed;
  width: 100%;
  z-index: 9999;
}
.view{
  padding-top: 110px;
}
.van-search__action {
  color: #fff;
}
</style>
