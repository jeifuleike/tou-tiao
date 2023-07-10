<template>
  <div class="my-container">
    <div class="header not-login" v-if="!user">
      <div class="login-btn" @click="$router.push('/login')">
        <img src="@/assets/mobile.png" alt="">
        <span class="text">登录 / 注册</span>
      </div>
    </div>
    <div class="header user-info" v-else>
      <div class="base-info">
        <div class="base-info-left">
          <van-image round class="avatar" fit="cover" :src="$store.state.userInfo?.photo">
            <template v-slot:loading>
              <van-loading type="spinner" size="40" color="#1989fa" />
            </template>
          </van-image>
          <span>{{ userInfo.name }}</span>
        </div>
        <div class="base-info-right">
          <van-button round size="mini" to="/user/profile">编辑资料</van-button>
        </div>
      </div>
      <div class="data-stats">
        <div class="data-item">
          <span class="count">{{ userInfo.art_count }}</span>
          <span class="text">头条</span>
        </div>
        <div class="data-item">
          <span class="count">{{ userInfo.follow_count }}</span>
          <span class="text">关注</span>
        </div>
        <div class="data-item">
          <span class="count">{{ userInfo.fans_count }}</span>
          <span class="text">粉丝</span>
        </div>
        <div class="data-item">
          <span class="count">{{ userInfo.like_count }}</span>
          <span class="text">获赞</span>
        </div>
      </div>
    </div>
    <van-grid :column-num="2" class="grid-nav mb-9" clickable>
      <van-grid-item class="grid-item">
        <i slot="icon" class="toutiao icon-shoucang"></i>
        <span slot="text" class="txt">收藏</span>
      </van-grid-item>
      <van-grid-item class="grid-item" @click="goHistory">
        <i slot="icon" class="toutiao icon-yuedu"></i>
        <span slot="text" class="txt">历史</span>
      </van-grid-item>
    </van-grid>
    <van-cell title="消息通知" is-link />
    <van-cell title="小智同学" is-link class="mb-9" to="/container"/>
    <van-cell title="退出登录" v-if="user" class="cell-span" @click="OnLogout" clickable></van-cell>
  </div>
</template>
  
<script>
import { mapState } from 'vuex';
export default {
  name: 'MyIndex',

  created() {
    this.$store.dispatch("fetchUserInfo")
    console.log(this.user)
  },
  computed: {
    ...mapState(['user', 'userInfo']),
    userInfo() {
      return this.$store.state.userInfo || {};
    }
  },
  methods: {
    OnLogout() {
      this.$dialog.confirm({
        message: '是否要退出登录',
      })
        .then(() => {
          // on confirm
          this.$store.commit('deleUser')
        })
        .catch(() => {
          // on cancel
        });

    },
    //跳转浏览历史
    goHistory(){
      if(this.user){
        this.$router.push('/user/history')
      }else{
        this.$toast('请登入后再使用该功能')
      }
    }
  }
}
</script>
  
<style scoped lang="less">
.my-container {
  .header {
    height: 361px;
    background: url(@/assets/banner.png);
    background-size: cover;

  }

  .not-login {
    display: flex;
    justify-content: center;
    align-items: center;

    .login-btn {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;

      img {
        width: 132px;
        height: 132px;
      }

      .text {
        margin-top: 15px;
        font-size: 28px;
        color: #fff;
      }
    }
  }

  .user-info {
    .base-info {
      height: 231px;
      padding: 76px 32px 23px;
      box-sizing: border-box;
      display: flex;
      justify-content: space-between;
      align-items: center;

      .base-info-left {
        display: flex;
        align-items: center;

        .avatar {
          width: 132px;
          height: 132px;
          margin-right: 30px;
          border: 1px solid #fff;
        }

        span {
          font-style: 30px;
          color: #fff;
        }
      }
    }

    .data-stats {
      display: flex;

      .data-item {
        height: 130px;
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        .count {
          font-size: 36px;
          color: #fff;
        }

        .text {
          font-size: 23px;
          color: #fff;
        }
      }
    }

  }

  .grid-nav {
    .grid-item {
      height: 141px;

      i.toutiao {
        font-size: 45px;
      }

      .icon-shoucang {
        color: #eb5253;
      }

      .icon-yuedu {
        color: #ff9b1d
      }

      span.txt {
        font-size: 28px;
      }
    }
  }

  .mb-9 {
    margin-bottom: 10px;
  }

  .cell-span {
    .van-cell__title {
      display: flex;
      justify-content: center;
      color: #D06A6A;
    }
  }
}
</style>