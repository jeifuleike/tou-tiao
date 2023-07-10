<template>
    <van-button :icon="value ? 'star' : 'star-o'" :class="{ collected: value }" @click="collect()"
        :loading="loading"></van-button>
</template>

<script>
import { collectionsAPI, deleCollectionsAPI } from '@/api'
export default {
    name: 'collectArticle',
    props: {
        value: {
            type: Boolean,
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
    methods: {
        async collect() {
            this.loading = true
            if (!this.$store.state.user) {
                this.$toast('请登入后再收藏！')
            } else {
                try {
                    if (this.value) {
                        await deleCollectionsAPI(this.artId)
                        this.$toast('取消收藏成功！')
                    } else {
                        await collectionsAPI(this.artId)
                        this.$toast('收藏成功！')
                    }
                    this.$emit('input', !this.value)
                } catch (err) {
                    this.$toast('收藏失败，请稍后重试！')
                }
            }
            this.loading = false
        }
    }
}
</script>

<style lang="less" scoped>
.collected {
    .van-icon {
        color: #ffa500;
    }
}
</style>