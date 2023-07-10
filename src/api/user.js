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
//获取用户信息
export const profile  = () => request({
    method: 'GET',
    url: '/user'
})
//获取用户频道列表
export const channels = () => request({
    method: 'GET',
    url:'user/channels'
})
//获取全部列表数据
export const AllChannels = () => request({
    method:'GET',
    url:'/channels'
})
//添加用户频道
export const channelsList = channel => request({
    method:'PATCH',
    url:'/user/channels',
    data: {
        channels: [channel]
    }
})
//删除用户频道
export const delechannel = channelid => request({
    method:'DELETE',
    url:`user/channels/${channelid}`,
})
//获取用户个人资料
export const getProfile = () => request({
    method:'GET',
    url:'/user/profile'
})
//修改个人信息
export const setProfile = data => request({
    method:'PATCH',
    url:'/user/profile',
    data
})
//编辑图片
export const setPhoto = data => request({
    method:'PATCH',
    url:'/user/photo',
    data
})
//用户浏览记录
export const history = data => request({
    method:'GET',
    url:'/user/histories',
    data
})