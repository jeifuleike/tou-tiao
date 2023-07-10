<template>
  <van-cell class="comment-item">
    <van-image slot="icon" class="avatar" round fit="cover" :src="comItem.aut_photo" />
    <div slot="title" class="title-wrap">
      <div class="user-name">{{ comItem.aut_name }}</div>
      <van-button class="like-btn" :loading="loading" :icon="comItem.is_liking ? 'good-job' : 'good-job-o'"
        :class="{ liked: comItem.is_liking }" @click="onloadLike()">{{ comItem.like_count || '赞' }}</van-button>
    </div>
    <div slot="label">
      <p class="comment-content">{{ comItem.content }}</p>
      <div class="bottom-info">
        <span class="comment-pubdate">{{ comItem.pubdate | relativeTime }}</span>
        <van-button class="reply-btn" v-if="isShow" round @click="$emit('reply-click',comItem)">回复 {{ comItem.reply_count }}</van-button>
      </div>
    </div>
  </van-cell>
</template>
  
<script>
import { addLikingsAPI,deleLikAPI } from '@/api'
export default {
  name: 'CommentItem',
  components: {},
  props: {
    comItem: {
      type: [Object],
      required: true
    },
    isShow:{
      type: Boolean,
      default:() => true
    }
  },
  data() {
    return {
      loading:false
    }
  },
  computed: {},
  watch: {},
  created() { },
  mounted() { },
  methods: {
    //点赞
    async onloadLike() {
      this.loading = true
      if (this.$store.state.user) {
        try {
          if (this.comItem.is_liking) {
            await deleLikAPI(this.comItem.com_id)
            this.$emit('chageLiking','dele')
          } else {
            await addLikingsAPI(this.comItem.com_id)
            this.$emit('chageLiking','add')
          }
          this.comItem.is_liking = !this.comItem.is_liking
        } catch (err) {
          this.$toast('点赞失败，请稍后重试！')
        }
      } else {
        return
      }
      this.loading = false
    }
  }
}
</script>
  
<style scoped lang="less">
.comment-item {
  .avatar {
    width: 72px;
    height: 72px;
    margin-right: 25px;
  }

  .title-wrap {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .user-name {
      color: #406599;
      font-size: 26px;
    }
  }

  .comment-content {
    font-size: 32px;
    color: #222222;
    word-break: break-all;
    text-align: justify;
  }

  .comment-pubdate {
    font-size: 19px;
    color: #222;
    margin-right: 25px;
  }

  .bottom-info {
    display: flex;
    align-items: center;
  }

  .reply-btn {
    width: 135px;
    height: 48px;
    line-height: 48px;
    font-size: 21px;
    color: #222;
  }

  .like-btn {
    height: 30px;
    padding: 0;
    border: none;
    font-size: 19px;
    line-height: 30px;
    margin-right: 7px;

    .van-icon {
      font-size: 30px;
    }

    &.liked {
      color: #e5645f;
    }
  }
}
</style>
  