<template>
    <div class="container">
        <van-nav-bar fixed left-arrow @click-left="$router.back()" title="小智同学"></van-nav-bar>
        <div class="chat-list">
            <div class="chat-item" v-for="(item, index) in list" :key="index"
                :class="item.name === 'xz' ? 'left' : 'right'">
                <van-image v-if="item.name === 'xz'" fit="cover" round src="https://img.yzcdn.cn/vant/cat.jpeg" />
                <div class="chat-pao">{{ item.msg }}</div>
                <van-image v-if="!(item.name === 'xz')" fit="cover" round :src="$store.state.userInfo.photo" />
            </div>
        </div>
        <div class="reply-container van-hairline--top">
            <van-field v-model="value" placeholder="说点什么...">
                <span @click="send()" slot="button" style="font-size: 12px; color: #999">提交</span>
            </van-field>
        </div>
    </div>
</template>

<script>
import { io } from "socket.io-client";
export default {
    data() {
        return {
            value: "",
            //webSocket对象
            socket: null,
            //聊天记录
            list: [],
        };
    },
    created() {
        this.initConnection();
    },
    methods: {
        initConnection() {
            this.socket = io("https://toutiao.itheima.net", {
                query: {
                    token: this.$store.state.user.token,
                },
                transports: ["websocket"],
            });
            this.socket.on("connect", () => {
                // 链接成功后，以小智的身份发一句你好并把消息添加到页面
                const info = {
                    name: "xz",
                    msg: "你好",
                };
                this.list.push(info);
            });
            // 监听服务器返回的消息
            this.socket.on("message", (info) => {
                this.list.push({
                    name: "xz",
                    msg: info.msg,
                });
            });
        },
        send() {
            //创建用户要发送的对象
            if(this.value.length === 0){
                this.$toast('请输入内容！')
                return
            }
            const info = {
                name: this.$store.state.user.name,
                msg: this.value,
            };
            //将用户发的渲染到页面上
            this.list.push(info);
            // 2、把消息发送给后端
            this.socket.emit("message", info);
            this.value = ''
        },
    },
};
</script>

<style lang="less" scoped>
.container {
    height: 100%;
    width: 100%;
    position: absolute;
    left: 0;
    top: 0;
    box-sizing: border-box;
    background: #fafafa;
    padding: 92px 0 100px 0;

    .chat-list {
        height: 100%;
        overflow-y: scroll;

        .chat-item {
            padding: 20px;

            .van-image {
                vertical-align: top;
                width: 80px;
                height: 80px;
            }

            .chat-pao {
                vertical-align: top;
                display: inline-block;
                max-width: 70%;
                min-height: 80px;
                line-height: 76px;
                border: 0.5px solid #c2d9ea;
                border-radius: 8px;
                position: relative;
                padding: 0 20px;
                background-color: #e0effb;
                word-break: break-all;
                font-size: 28px;
                color: #333;

                &::before {
                    content: "";
                    width: 20px;
                    height: 20px;
                    position: absolute;
                    top: 24px;
                    border-top: 0.5px solid #c2d9ea;
                    border-right: 0.5px solid #c2d9ea;
                    background: #e0effb;
                }
            }
        }
    }
}

.chat-item.right {
    text-align: right;

    .chat-pao {
        margin-left: 0;
        margin-right: 30px;

        &::before {
            right: -12px;
            transform: rotate(45deg);
        }
    }
}

.chat-item.left {
    text-align: left;

    .chat-pao {
        margin-left: 30px;
        margin-right: 0;

        &::before {
            left: -10px;
            transform: rotate(-135deg);
        }
    }
}

.reply-container {
    position: fixed;
    left: 0;
    bottom: 0;
    height: 88px;
    width: 100%;
    background: #f5f5f5;
    z-index: 9999;
}
</style>