<template>
    <div class="comment-reply">
        <van-nav-bar class="replyNavBer" @click-left="$emit('unisReplyShow')"
            :title="commentItem.reply_count > 0 ? `${commentItem.reply_count}条回复` : '暂无更多回复'">
            <van-icon slot="left" name="cross" />
        </van-nav-bar>
        <div class="scroll-wrap">
            <commentItem :comItem="commentItem" :isShow="false" />
            <!-- 评论的回复列表 -->
            <van-cell title="全部回复"></van-cell>
            <commentList :source="commentItem.com_id" commentType="c" :commentsList="commentLists" @reply-click = 'replyClick' />
        </div>
        <!-- 底部区域 -->
        <div class="post-wrap">
            <van-button size="small" round class="post-btn" @click=" onPost()">写评论</van-button>
        </div>
        <!-- 发表评论 -->
        <van-popup v-model="isShow" position="bottom">
          <commentPost :postArtId="commentItem.com_id" :replyId="replyAutId" @unPost="setPost" :postIndex="replyIndex" />
        </van-popup>
    </div>
</template>

<script>
import commentItem from './comment-item.vue';
import commentList from './comment-list.vue';
import commentPost from './comment-post.vue';
export default {
    name: 'CommentReply',
    components: {
        commentItem,
        commentList,
        commentPost
    },
    props: {
        commentItem: {
            type: Object,
            required: true
        },
        replyAutId:{
            type:[String,Number,Object],
            required:true
        }
    },

    data(){
        return{
            isShow:false,
            commentLists: [],
            replyIndex:null
        }
    },
    methods:{
    //发送留言后的处理
    setPost(value) {
      this.commentLists.unshift(value)
      this.isShow = false
      this.$emit('replyPost')
    },
    //点击发送留言后的方法
    onPost(){
        this.replyIndex = null
        this.isShow = true

    },
    //在留言里回复别人的留言
    replyClick(obj){
        this.replyIndex = obj.$event
        this.isShow= true
    }
    }
}
</script>

<style lang="less" scoped>
/deep/.van-nav-bar {
    background-color: #fff !important;

    .van-nav-bar__title {
        color: #000 !important;
    }

    .van-icon {
        color: #3296fa !important;
    }
}
.scroll-wrap{
    position: fixed;
    top:220px;
    left: 0;
    right: 0;
    bottom: 88px;
    overflow-y: auto;
}
.post-wrap {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    height: 88px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #fff;
    border-top: 1px solid #d8d8d8;

    .post-btn {
        width: 60%;
    }
}

</style>