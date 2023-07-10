<template>
  <div class="article-container">
    <!-- 导航栏 -->
    <van-nav-bar class="page-nav-bar" left-arrow @click-left="$router.back()" title="黑马头条"></van-nav-bar>
    <!-- /导航栏 -->

    <div class="main-wrap">
      <!-- 加载中 -->
      <div class="loading-wrap" v-if="loading">
        <van-loading color="#3296fa" vertical>加载中</van-loading>
      </div>
      <!-- /加载中 -->
      <!-- 加载完成-文章详情 -->
      <div class="article-detail " v-else-if="news.title">
        <!-- 文章标题 -->
        <h1 class="article-title">{{ news.title }}</h1>
        <!-- /文章标题 -->

        <!-- 用户信息 -->
        <van-cell class="user-info" center :border="false">
          <van-image class="avatar" slot="icon" round fit="cover" :src="news.aut_photo" />
          <div slot="title" class="user-name">{{ news.aut_name }}</div>
          <div slot="label" class="publish-date">{{ news.pubdate | relativeTime }}</div>
          <folowUser :isFollowed="news.is_followed" :autId="news.aut_id" @IsFollowed="news.is_followed = $event" />
        </van-cell>
        <!-- /用户信息 -->

        <!-- 文章内容 -->
        <div class="article-content markdown-body" v-html="news.content" ref="article-content"></div>
        <van-divider>正文结束</van-divider>
        <commentList :source="news.art_id" commentType="a" @onload-success="totalCommentCount = $event.total_count"
          :commentsList="commentLists" @reply-click="onReply">
        </commentList>
        <!-- 评论区域 -->
        <van-popup v-model="isShow" position="bottom">
          <CommentPost :postArtId="articleId" @unPost="setPost" />
        </van-popup>
        <!-- 底部区域 -->
        <div class="article-bottom">
          <van-button class="comment-btn" type="default" round size="small" @click="isShow = true">写评论</van-button>
          <van-icon name="comment-o" :badge="totalCommentCount" color="#777" />
          <!-- <van-icon color="#777" name="star-o" /> -->
          <CollectArticle class="btn-item" v-model="news.is_collected" :artId="news.art_id" />
          <linkArticle v-model="news.attitude" :artId="news.art_id" />
          <van-icon name="share" color="#777777"></van-icon>
        </div>
        <!-- /底部区域 -->
      </div>
      <!-- /加载完成-文章详情 -->


      <!-- 加载失败：404 -->
      <div class="error-wrap" v-else-if="errStatus === 404">
        <van-icon name="failure" />
        <p class="text">该资源不存在或已删除！</p>
      </div>
      <!-- /加载失败：404 -->

      <!-- 加载失败：其它未知错误（例如网络原因或服务端异常） -->
      <div class="error-wrap" v-else>
        <van-icon name="failure" />
        <p class="text">内容加载失败！</p>
        <van-button @click="loadArticle()" class="retry-btn">点击重试</van-button>
      </div>
      <!-- /加载失败：其它未知错误（例如网络原因或服务端异常） -->
    </div>
    <!-- 评论回复开始 -->
    <van-popup v-model="isReplyShow" position="bottom" style="height:90%">
      <!-- 弹出层组件显示的东西都一样 -->
      <!-- 解决方法使用v-if绑定
      v-if为true时渲染组件
      为false时销毁组件-->
      <CommentReply v-if="isReplyShow" :commentItem="replyValue" @unisReplyShow = "isReplyShow = false" :replyAutId ="articleId" @replyPost = "PostIndex"/>
    </van-popup>
    <!-- 评论回复结束 -->
  </div>
</template>

<script>
import { articleAPI } from '@/api'
import { ImagePreview } from 'vant'
import folowUser from '@/components/follow-user'
import CollectArticle from '@/components/collect-article'
import linkArticle from '@/components/like-article'
import commentList from './components/comment-list.vue'
import CommentPost from './components/comment-post.vue'
import CommentReply from './components/comment-reply.vue'
export default {
  name: 'ArticleIndex',
  components: {
    folowUser,
    CollectArticle,
    linkArticle,
    commentList,
    CommentPost,
    CommentReply
  },
  props: {
    articleId: {
      //要两个类型的原因是从列表进来是数字类型，而通过路径直接复制进来是字符串类型
      type: [Number, String],
      required: true,
    }
  },
  data() {
    return {
      news: {},
      loading: true,
      errStatus: false,
      isShow: false,
      totalCommentCount: 0,
      commentLists: [],
      isReplyShow: false,
      replyValue: {},
      replyIndex:null
    }
  },
  computed: {},
  watch: {},
  created() {
    this.loadArticle()
  },
  mounted() { },
  methods: {
    //获取新闻数据
    async loadArticle() {
      try {
        this.loading = true
        const { data } = await articleAPI(this.articleId)
        //数据驱动不是立刻的
        this.news = data.data
        //如果我们直接console.log(this.$refs['article-content'])结果会为undefined
        //因为文章的视图更新有一个条件为news.title存在数据，而此时文章视图并没有更新出来
        //直接拿dom元素就拿不到
        //我们可以添加一个时间为0的定时器这样，获取dom节点的时间就会被排在渲染视图的后面
        setTimeout(() => {
          //预览图片方法
          this.previewImage()
        }, 0)
        this.relod = false
        this.absent = false
      } catch (err) {
        if (err?.response?.status === 404) {
          this.errStatus = 404
        }
      }
      this.loading = false
    },
    //预览图片方法
    previewImage() {
      const articeContent = this.$refs['article-content']
      const imgs = articeContent.querySelectorAll('img')
      let images = []
      imgs.forEach((element, index) => {
        //将所有图片的地址添加进列表中
        images.push(element.src)
        element.onclick = function () {
          ImagePreview({
            //预览的图片地址数组
            images,
            //预览的位置
            startPosition: index
          });
        }
      });
    },
    //评论处理
    setPost(value) {
      this.commentLists.unshift(value)
      this.isShow = false
      this.totalCommentCount++
    },
    //处理回复评论
    onReply(Obj) {
      this.isReplyShow = true,
      this.replyValue = Obj.$event,
      this.replyIndex = Obj.index
    },
    //添加回复数量
    PostIndex(){
      this.commentLists[this.replyIndex].reply_count++
    }
  }
}
</script>

<style scoped lang="less">
@import url("./github-markdown.css");

.article-container {
  .main-wrap {
    position: fixed;
    left: 0;
    right: 0;
    top: 92px;
    bottom: 88px;
    overflow-y: scroll;
    background-color: #fff;
  }

  .article-detail {
    .article-title {
      font-size: 40px;
      padding: 50px 32px;
      margin: 0;
      color: #3a3a3a;
    }

    .user-info {
      padding: 0 32px;

      .avatar {
        width: 70px;
        height: 70px;
        margin-right: 17px;
      }

      .van-cell__label {
        margin-top: 0;
      }

      .user-name {
        font-size: 24px;
        color: #3a3a3a;
      }

      .publish-date {
        font-size: 23px;
        color: #b7b7b7;
      }

      .follow-btn {
        width: 170px;
        height: 58px;
      }
    }

    .article-content {
      padding: 55px 32px;

      /deep/ p {
        text-align: justify;
      }
    }
  }

  .loading-wrap {
    padding: 200px 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #fff;
  }

  .error-wrap {
    padding: 200px 32px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #fff;

    .van-icon {
      font-size: 122px;
      color: #b4b4b4;
    }

    .text {
      font-size: 30px;
      color: #666666;
      margin: 33px 0 46px;
    }

    .retry-btn {
      width: 280px;
      height: 70px;
      line-height: 70px;
      border: 1px solid #c3c3c3;
      font-size: 30px;
      color: #666666;
    }
  }

  .article-bottom {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: space-around;
    align-items: center;
    box-sizing: border-box;
    height: 88px;
    border-top: 1px solid #d8d8d8;
    background-color: #fff;

    .comment-btn {
      width: 282px;
      height: 46px;
      border: 2px solid #eeeeee;
      font-size: 30px;
      line-height: 46px;
      color: #a7a7a7;
    }

    /deep/.van-icon {
      font-size: 40px;

      .van-info {
        font-size: 16px;
        background-color: #e22829;
      }
    }
  }

  /deep/.page-nav-bar {
    .van-icon {
      color: #fff;
    }
  }
}

/deep/.van-nav-bar {
  background-color: #3296fa;

  .van-ellipsis,
  .van-nav-bar__title,
  .van-icon {
    color: #fff;
  }
}
</style>
