import { IRootState } from '../../type'
import { Module } from 'vuex'
import { IAppStateType } from './type'

const login: Module<IAppStateType, IRootState> = {
  namespaced: true,
  state() {
    return {
      language: ''
    }
  },
  mutations: {
    setLanguage(state, language) {
      state.language = language
    }
  },
  actions: {
    // 处理login请求
    async setLanguage({ commit }, payload: any) {
      commit('setLanguage', payload)
    }
  },
  modules: {}
}

export default login
