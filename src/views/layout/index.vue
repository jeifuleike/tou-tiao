<template>
    <div class="layout-container">
        <router-view></router-view>
        <van-tabbar v-model="active" class="layout-tabbar" route>
            <van-tabbar-item name="首页" to="/home">
                <i slot="icon" class="toutiao icon-shouye"></i>
                首页
            </van-tabbar-item>
            <van-tabbar-item name="问答" to="/qa">
                <i slot="icon" class="toutiao icon-sousuo"></i>
                问答
            </van-tabbar-item>
            <van-tabbar-item name="视频" to="/video">
                <i slot="icon" class="toutiao icon-shipin"></i>
                视频
            </van-tabbar-item>
            <van-tabbar-item name="我的" to="/my">
                <i slot="icon" class="toutiao icon-wode"></i>
                {{ $store.state.user? '我的' : '未登录'}}
            </van-tabbar-item>
        </van-tabbar>
    </div>
</template>

<script>
export default {
    name: 'LayoutIne',
    data() {
        return {
            active: '',
        };
    },
    created() {
        this.active = this.$route.name; // 在页面加载时获取当前路由的名称并赋值给 active
    },
    beforeRouteUpdate(to, from, next) {
        this.active = to.name; // 更新 active 数据为当前路由的名称
        next();
    },
}
</script>

<style lang="less" scoped>
.layout-container {
    .layout-tabbar {
        i.toutiao {
            font-size: 40px;
        }
    }
}
</style>
