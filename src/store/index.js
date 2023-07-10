import Vue from 'vue'
import Vuex from 'vuex'
import { setItem, getItem } from '@/utils/storage'
import { profileAPI,channelsAPI,channelsListAPI,delechannelAPI } from '@/api/index'
Vue.use(Vuex)

const token_key = 'toutiao_user'

export default new Vuex.Store({
  state: {
    user: getItem(token_key),
    userInfo: getItem('userInfo'),
    userList: getItem('TOUTIAO_CHANNELS')
  },
  getters: {
  },
  mutations: {
    SetUser(state, data) {
      state.user = data
      //为了防止刷新丢失，我们需要吧数据备份到本地存储
      setItem(token_key, state.user)
      this.dispatch('fetchUserInfo');
    },
    deleUser(state) {
      state.user = null
      state.userInfo = null
      setItem(token_key, null)
      setItem('userInfo', null)
    },
    SetUserInfo(state, data) {
      state.userInfo = data
    },
    setUserList(state, data) {
      state.userList = data
    },
    async AddUserList(state,data){
      state.userList.push(data)
      if(state.user){
        try{
          await channelsListAPI({
            id:data.id,
            seq: state.userList.length
          })
        }catch(err){
          console.log(err)
        }
      }else{
        setItem('TOUTIAO_CHANNELS',state.userList)
      }
    },
    removeUserList(state,id){
      state.userList.splice(state.userList.findIndex(item => item.id === id), 1);
      if(state.user){
        delechannelAPI(id)
      }else{
        setItem('TOUTIAO_CHANNELS',state.userList)
      }
    }
  },
  actions: {
    async fetchUserInfo({ commit, state }) {
      try {
        const { data } = await profileAPI()
        const userInfo = data.data
        commit('SetUserInfo', userInfo)
        setItem('userInfo', state.userInfo)
      } catch (err) {
        console.log(err)
      }
    },
    async fetchUserList({ commit }) {
      try {
        const { data } = await channelsAPI()
        const userList = data.data.channels
        commit('setUserList',userList)
      }catch(err){
        console.log(err)
      }
    },
  },
  modules: {
  }
})
