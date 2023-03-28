import { IRootState } from '../../type'
import { Module } from 'vuex'
import { IMainStateType } from './type'

const login: Module<IMainStateType, IRootState> = {
  namespaced: true,
  state() {
    return {
      userInfo: {
        username: '',
        age: 0
      }
    }
  },
  mutations: {
    setUserInfo(state, userInfo) {
      state.userInfo = userInfo
    }
  },
  actions: {
    // 处理login请求
    async setUserInfo({ commit }, payload: any) {
      commit('setUserInfo', payload)
    }
  },
  modules: {}
}

export default login
