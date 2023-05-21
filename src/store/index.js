import Vue from 'vue'
import Vuex from 'vuex'
import { setItem,getItem } from '@/utils/storage'

Vue.use(Vuex)

const token_key = 'toutiao_user'

export default new Vuex.Store({
  state: {
    user: getItem(token_key)
  },
  getters: {
  },
  mutations: {
    SetUser(state,data){
      state.user = data
      //为了防止刷新丢失，我们需要吧数据备份到本地存储
     setItem(token_key,state.user)
    }
  },
  actions: {
  },
  modules: {
  }
})
