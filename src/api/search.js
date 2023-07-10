import request from "@/utils/requset";
export const suggestion = q => request({
    method:'GET',
    url:"/suggestion",
    params:{
        q
    }
})
export const search = params => request({
    method:'GET',
    url:'/search',
    params
})