<template>
  <div class="comment-post">
    <van-field
      class="post-field"
      v-model.trim="message"
      rows="2"
      autosize
      type="textarea"
      maxlength="50"
      :placeholder="postIndex? `回复 ${postIndex.aut_name}`:'请输入留言'"
      show-word-limit
    />
    <van-button
      class="post-btn"
      @click="release()"
      :disabled = "!message.length"
    >发布</van-button>
  </div>
</template>

<script>
import { addCommentsAPI } from '@/api'
export default {
  name: 'CommentPost',
  components: {},
  props: {
    postArtId:{
      type:[String,Number,Object],
      required:true
    },
    replyId:{
      type:[String,Number,Object],
      default: () => null
    },
    postIndex:{
      type:Object,
      default: () => null
    },

  },
  data () {
    return {
      message: ''
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {
    async release(){
      this.$toast.loading({ message: '发布中...', forbidClick: true })
      try{
        if(!this.$store.state.userInfo){
        this.$toast('请登入后再评价！')
      }else{
        const { data } = await addCommentsAPI({
          target:this.postArtId.toString(),
          content:this.postIndex? `${this.message}//@${this.postIndex.aut_name}:${this.postIndex.content}`:this.message,
          art_id:this.replyId? this.replyId.toString() : null})
        this.message = ''
        this.$toast('发布成功！')
        this.$emit('unPost',data.data.new_obj)
      }
      }catch(err){
        this.$toast('发布失败，请稍后重试！')
      }
      
    }
  }
}
</script>

<style scoped lang="less">
.comment-post {
  display: flex;
  align-items: center;
  padding: 32px 0 32px 32px;
  .post-field {
    background-color: #f5f7f9;
  }
  .post-btn {
    width: 150px;
    border: none;
    padding: 0;
    color: #6ba3d8;
    &::before {
      display: none;
    }
  }
}
</style>