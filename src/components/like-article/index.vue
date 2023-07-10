<template>
  <van-button :icon="value === 1 ? 'good-job' : 'good-job-o'" :class="{ linked: value === 1 }" @click="like()"
        :loading="loading"></van-button>
</template>

<script>
import { likingsAPI,deleLikingsAPI } from '@/api'
export default {
    name:'likeArticle',
    props: {
        value: {
            type: Number,
            required: true
        },
        artId: {
            type: [String, Number],
            required: true
        }
    },
    data() {
        return {
            loading: false
        }
    },
    methods:{
        async like(){
            this.loading = true
            if (!this.$store.state.user) {
                this.$toast('请登入后再点赞！')
            } else {
                try {
                    if (this.value === -1) {
                        await likingsAPI(this.artId)
                        this.$toast('点赞成功！')
                    } else {
                        await deleLikingsAPI(this.artId)
                        this.$toast('取消点赞成功！')
                    }
                    this.$emit('input', this.value === -1? 1:-1)
                } catch (err) {
                    this.$toast('点赞失败，请稍后重试！')
                }
            }
            this.loading = false
        }
    }
}
</script>

<style lang="less" scoped>
.linked{
    .van-icon{
        color: #e5645f;
    }
}
</style>