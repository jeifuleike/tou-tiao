<template>
  <div class="home-container">
    <nav class="home-nav">
      <van-button @click="$router.push('/search')" round type="info" class="search-btn" icon="search" size="small">搜索</van-button>
    </nav>
    <van-tabs v-model="active" class="channel-tabs" swipeable animated>
      <van-tab :title="item.name" v-for="item in  $store.state.userList" :key="item.id">
        <ArticleList class="channel-list" :channel="item"></ArticleList>
      </van-tab>
      <div slot="nav-right" class="reight"></div>
      <div slot="nav-right" class="hamburger-btn">
        <van-icon name="wap-nav" @click="show = true"/>
      </div>
    </van-tabs>
    <van-popup v-model="show" closeable position="bottom" close-icon-position="top-left" round :style="{ height: '100%' }" >
      <channel-edit @changeChannel = "switchChannel" @changeActive = "chageActive" :myActive="active"/>
    </van-popup>
  </div>
</template>

<script>
import ArticleList from './components/acaticlelist'
import ChannelEdit from './components/channel-edit.vue'

export default {
  name: 'HomeIndex',
  components: {
    ArticleList,
    ChannelEdit
  },
  data() {
    return {
      active: 0,
      show:false,
      //固定频道
    };
  },
  async created() {
    if(this.$store.state.user||this.$store.state.userList == undefined){
      await this.$store.dispatch('fetchUserList')
    }
  },
  computed:{
  },
  methods:{
    chageActive(value){
      if(value<this.active){
        this.active = this.active-1
      }
    },
    switchChannel(value){
      this.active = value
      this.show = false
    }
  }
}
</script>

<style lang="less" scoped>
.home-container {
  padding-bottom: 100px;

  .home-nav {
    width: 100%;
    height: 90px;
    background-color: #3296FA;
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    z-index: 9;

    .search-btn {
      width: 555px;
      height: 64px;
      background-color: #5babfb;
      border: none;
      font-size: 32px;

      .van-icon-search {
        color: #fff;
        font-size: 32px;
      }
    }
  }

  /deep/ .channel-tabs {
    .van-tabs__wrap {
      padding-top: 90px;
      height: 82px;
      z-index: 9999;
    }

    .channel-list {}

    .van-tab {
      min-width: 200px;
      border-right: 1px solid #edeff3;
      font-size: 30px;
      color: #777;
    }

    .van-tab--active {
      color: #333;
    }

    .van-tabs__nav {
      padding-bottom: 0;
    }

    .van-tabs__line {
      width: 31PX !important;
      height: 6px !important;
      background-color: #3296fa;
      bottom: 8px;
    }

    .hamburger-btn {
      width: 66px;
      height: 82px;
      position: fixed;
      right: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: #fff;
      opacity: 0.902;

      &::before {
        content: "";
        width: 1px;
        height: 100%;
        background-image: url(@/assets/gradient-gray-line.png);
        position: absolute;
        left: 0;
        background-size: contain;
      }
    }

    .reight {
      width: 51px;
      height: 82px;
      flex-shrink: 0;
    }
  }
}
</style>