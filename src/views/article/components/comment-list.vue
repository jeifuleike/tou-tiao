<template>
    <van-list v-model="loading" :finished="finished" finished-text="没有更多了" :error="err" error-text="加载失败，请点击重试！" :immediate-check = "false" @load="onLoad">
        <commentItem v-for="(item, index) in commentsList" :key="index" :comItem="item"
            @chageLiking="chageLik($event, index)" @reply-click="$emit('reply-click', {$event,index})" />
    </van-list>
</template>

<script>
import { commentsAPI } from '@/api/index'
import commentItem from './comment-item.vue';
export default {
    name: 'commentList',
    props: {
        source: {
            type: [Number, String, Object],
            required: true
        },
        commentType: {
            type: String,
            //自定义Prop数据验证,传入的值必须是ac中的一个
            validator(value) {
                return ['a', 'c'].includes(value)
            },
            required: true
        },
        commentsList: {
            type: Array,
            //函数默认值
            default: () => []
        }
    },
    components: {
        commentItem
    },
    data() {
        return {
            loading: false,
            finished: false,
            offset: null,
            err: false
        };
    },
    created() {
        this.loading = true
        this.onLoad()
    },
    methods: {
        async onLoad() {
            try {
                // 异步更新数据
                // setTimeout 仅做示例，真实场景中一般为 ajax 请求
                const { data } = await commentsAPI({ type: this.commentType, source: this.source.toString(), offset: this.offset, limit: 10 })
                this.offset = data.data.last_id
                this.commentsList.push(...data.data.results)
                //吧文章评论总数量传递到外部
                this.$emit('onload-success', data.data)
                if (data.data.results.length < 10) {
                    this.finished = true
                }
                // 加载状态结束
                this.loading = false;
            } catch (err) {
                this.err = true
                this.loading = false
            }
        },
        chageLik(event, index) {
            if (event === 'add') {
                this.commentsList[index].like_count = this.commentsList[index].like_count + 1;
            } else {
                this.commentsList[index].like_count = this.commentsList[index].like_count - 1;
            }
        }

    },
}
</script>

<style scoped lang="less"></style>