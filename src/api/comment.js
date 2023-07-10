import request from "@/utils/requset";
//获取文章评论列表
export const comments = params => request({
    method:'GET',
    url:'/comments',
    params
})
//对评论或评论回复点赞
export const addLikings = target => request({
    method:'POST',
    url:'/comment/likings',
    data:{
        target
    }
})
//取消评论回复点赞
export const deleLik = target => request({
    method:'DELETE',
    url:`/comment/likings/${target}`,
    target
})
//对文章或者评论进行评论
export const addComments = data => request({
    method:'POST',
    url:'/comments',
    data
})