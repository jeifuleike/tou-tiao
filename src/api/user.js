//用户相关请求模块
import request from "@/utils/requset";
//登录功能
export const login = data => request({
    method: 'POST',
    url: '/authorizations',
    data
})
//发送验证码功能
//每手机号一分钟内只能发送一次
export const codes = mobile => request({
    method: 'GET',
    url: `/sms/codes/${mobile}`,
})