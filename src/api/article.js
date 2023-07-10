import request from "@/utils/requset";
//获取新闻列表
export const articles = params => request({
    method:'GET',
    url:'/articles',
    params
})
//获取具体新闻信息
export const article = articleId => request({
    method:'GET',
    url:`/articles/${articleId}`
}) 
//关注用户
export const followings = target => request({
    method:'POST',
    url:'/user/followings',
    data:{
        target
    } 
})
//取消关注用户
export const deleFollowings = target => request({
    method:'DELETE',
    url:`/user/followings/${target}`
})
//收藏文章
export const collections = target => request({
    method:'POST',
    url:'/article/collections',
    data:{
        target
    }
})
//取消收藏文章
export const deleCollections = target => request({
    method:'DELETE',
    url:`/article/collections/${target}`
})
//点赞文章
export const likings = target => request({
    method:'POST',
    url:'/article/likings',
    data:{
        target
    }
})
//取消收藏文章
export const deleLikings = target => request({
    method:'DELETE',
    url:`/article/likings/${target}`
})