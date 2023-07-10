<template>
    <van-button v-if="!isFollowed" class="follow-btn" type="info" color="#3296fa" round size="small" icon="plus"
        @click="pollowing()" :loading="loading">关注</van-button>
    <van-button v-else class="follow-btn" round size="small" @click="pollowing()" :loading="loading">已关注</van-button>
</template>

<script>
import { deleFollowingsAPI, followingsAPI } from '@/api'
export default {
    name: 'folowUser',
    data() {
        return {
            loading: false
        }
    },
    props: {
        isFollowed: {
            type: Boolean,
            required: true
        },
        autId: {
            type: [String, Number, Object],
            required: true
        }
    },
    methods: {
        //关注列表
        async pollowing() {
            this.loading = true
            if (!this.$store.state.user) {
                this.$toast('请登入后再关注！')
            } else {
                try {
                    if (this.isFollowed) {
                        //已关注
                        await deleFollowingsAPI(this.autId)
                        this.$toast('取消关注成功！')
                    } else {
                        //没有关注
                        await followingsAPI(this.autId)
                        this.$toast('关注成功！')
                    }
                    this.$emit('IsFollowed', !this.isFollowed)
                } catch (err) {
                    let message = '操作失败请重试'
                    if (err.response && err.response.status === 400) {
                        message = '你不能关注你自己！'
                    }
                    this.$toast(message)
                }
            }
            this.loading = false
        }
    }
}
</script>

<style lang="less" scoped></style>