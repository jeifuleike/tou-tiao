import axios from "axios";
import store from "@/store";
//JSONBig的作用就是突破js的安全整数限制，吧JSON对象转化为js对象
import JSONBig from 'json-bigint'

const request = axios.create({
    baseURL: 'http://toutiao.itheima.net/v1_0', //接口的基准路径
    //自定义后端返回的原始数据
    transformResponse:[function(data){
        try{
            //如果返回的数据是JSON格式则会进入这个返回，将JSON格式的数据转化为js格式
            return JSONBig.parse(data)
        }catch{
            //如果是普通格式则上面会报错进入catch直接返回数据
            return data
        }
    }]
})

//请求拦截器
request.interceptors.request.use(function(config){
    //请求发起会经过这里
    //config: 本次请求的请求配置对象
    const { user } = store.state
    if(user && user.token){
        config.headers.Authorization = `Bearer ${user.token}`
    }
    return config
}), function(error){
    //如果请求出错了，（还没有发出去）会进入这里
    return Promise.reject(error)
}
//响应拦截器

export default request