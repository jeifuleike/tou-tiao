<template>
    <div>
        <van-nav-bar title="登录" />
        <van-form ref="loginFrom" @submit="onSubmit">
            <van-field name="mobile" v-model="user.mobile" placeholder="请输入手机号" :rules="userFromRules.mobile">
                <i slot="left-icon" class="toutiao icon-shouji"></i>
            </van-field>
            <van-field v-model="user.code" name="code" placeholder="请输入验证码" :rules="userFromRules.code">
                <i slot="left-icon" class="toutiao icon-yanzhengma"></i>
                <template #button>
                    <van-button v-if="isShow" round size="small" type="default" class="send-sms-btn" @click="getCodes"
                        native-type="button">
                        获取验证码
                    </van-button>
                    <van-count-down v-else class="colon" :time="1000 * 60" @finish="CodesDown">
                        <template #default="timeData">
                            <span class="codes">{{ timeData.seconds }}秒后可重新获取</span>
                        </template>
                    </van-count-down>
                </template>
            </van-field>
            <div class="login-btn-wrap">
                <van-button class="login-btn" block type="info" native-type="submit">登录</van-button>
            </div>
        </van-form>
        <span class="key">默认登录验证码 <br>246810</span>
    </div>
</template>

<script>
import { loginAPI,codesAPI } from '@/api/index'
export default {
    name: 'LoginIndex',
    data() {
        return {
            user: {
                mobile: '',//手机号
                code: ''//验证码
            },
            //表单提交前的判断规则
            userFromRules: {
                mobile: [{
                    required: true,
                    message: '手机号不能为空'
                }, {
                    pattern: /^1[3|5|7|8]\d{9}$/,
                    message: '手机号格式错误'
                }],
                code: [{
                    required: true,
                    message: '输入验证码'
                }, {
                    pattern: /^\d{6}$/,
                    message: '验证码格式错误'
                }]
            },
            //验证码控制按钮显示隐藏
            isShow: true
        }
    },
    methods: {
        async onSubmit() {
            const user = this.user
            this.$toast.loading({ message: '加载中...', forbidClick: true })
            try {
                const res = await loginAPI(user)
                console.log('登录成功', res)
                this.$store.commit('SetUser',res.data.data)
                this.$toast.success('登录成功')
            } catch (err) {
                if (err.response.status === 400) {
                    console.log('手机号或者验证码错误')
                    this.$toast.fail('登录失败，手机号或者验证码错误')
                } else {
                    console.log('登录失败，请稍后再试')
                    this.$toast.fail('登录失败，请稍后再试')
                }
            }
        },
        async getCodes() {
            //1.先对手机号码进行验证
            //手动验证方法
            //this.$refs.表单对象名称.验证表单方法(自定义要验证的表单名)
            try {
                await this.$refs.loginFrom.validate('mobile')
            } catch (err) {
                return console.log(err)
            }
            try{
                const res = await codesAPI(this.user.mobile)
                this.isShow = false
                console.log(res)
                this.$notify({ type: 'success', message: '发送验证码成功' })
            } catch (err){
                console.log(err)
                this.isShow = true
                if(err.response.status === 429){
                    this.$notify({ type: 'danger', message: '验证码发送过于频繁，请稍后重试' })
                }else{
                    this.$notify({ type: 'danger', message: '发送验证码失败' })
                }
            }
        },
        //倒计时结束调用方法
        CodesDown() {
            this.isShow = true
        }
    }

}
</script>

<style lang="less" scoped>
.toutiao {
    font-size: 37px;
}

.send-sms-btn {
    background-color: #ededed;
    width: 152px;
    height: 46px;
    line-height: 46px;
    font-size: 22px;
    color: #666;
}

.login-btn-wrap {
    padding: 53px, 33px;

    .login-btn {
        background-color: #6db4fb;
        border: none;
    }
}
.key{
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    color: #888;
    font-size: 20px;
    text-align: center;
}
</style>