<template>
  <div class="search-history">
    <van-cell title="搜索历史">
      <span v-if="isshow" @click="$emit('deletHistory',-1)">全部删除</span>
      <span v-if="isshow" @click="isshow = false">完成</span>
      <van-icon name="delete" @click="isshow = true" />
    </van-cell>
    <van-cell class="historyList" v-for="(item, index) of history" :key="index" :title="item" @click="setHistory(index,item)" >
      <van-icon name="close" v-if="isshow" />
    </van-cell>
  </div>
</template>

<script>
export default {
  props: {
    history: {
      type: Array,
      require: true
    }
  },
  data() {
    return {
      isshow: false
    }
  },
  methods:{
    setHistory(index,value){
      if(this.isshow){
        this.$emit('deletHistory',index)
      }else{
        this.$emit('searchHis', value)
      }
    }
  }

}
</script>

<style scoped lang="less">
.van-cell__value {
  span {
    font-size: 25px;
    margin-right: 10px;
    color: red;
  }
}
</style>