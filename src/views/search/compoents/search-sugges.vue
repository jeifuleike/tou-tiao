<template>
    <div class="search-suggestion">
        <van-cell icon="search" v-for="(item, index) in suggestions" :key="index" @click="search(item)">
            <span slot="title" v-html="HeightText(item)"></span>
        </van-cell>
    </div>
</template>

<script>
import { suggestionAPI } from '@/api'
//import { debounce } from 'lodash'
export default {
    props: {
        recom: {
            type: String,
            required: true
        }
    },
    data() {
        return {
            suggestions: [],
            time: null
        }
    },
    watch: {
        recom: {
            //当recom发生改变时就会触发handler
            //handler函数名是固定的
            //debounce函数
            //参数1：一个函数
            //参数2：延迟时间
            //返回值：防抖后的函数
            // handler:debounce(function(value){
            //     this.localStorageSuggestions(value)
            // },200),
            handler: function (value) {
                this.MysetTime(() => { this.localStorageSuggestions(value) })
            },
            //当组件注册后会立刻执行一次
            immediate: true
        }
    },
    methods: {
        //请求联想建议方法
        async localStorageSuggestions(q) {
            try {
                const { data } = await suggestionAPI(q)
                this.suggestions = data.data.options
            } catch (err) {
                console.log(err)
                this.$toast('数据获取失败，请稍后重试')
            }
        },
        //自己写的防抖定时器
        MysetTime(fun) {
            if (this.time) {
                clearTimeout(this.time)
            }
            this.time = setTimeout(fun, 200);
        },
        //高亮输入词
        HeightText(str) {
            const Height = new RegExp(this.recom,'gi')
            if(str){
                //不能/this.searchText/这样写，会吧里面的当作匹配数据
                return this.recom ? str.replace(Height, `<span style = "color : red">${this.recom}</span>`) : str;
            }
        },
        //点击联想建议进入搜索
        search(str){
            this.$emit('searchSugg',str)
        }
    }
}
</script>

<style scoped lang="less">

</style>