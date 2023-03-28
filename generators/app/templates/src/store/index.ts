import { createStore, Store, useStore as useVuexStore } from 'vuex'
import { IRootState, IStoreType } from './type'
import app from './modules/app'
import main from './modules/main'

const store = createStore<IRootState>({
  state() {
    return {
      global: {
        author: 'zh'
      }
    }
  },
  mutations: {},
  actions: {},
  modules: {
    app,
    main
  }
})

// 初始化state.login
export function setupStore() {
  store.dispatch('login/loadLocalLogin')
  store.dispatch('getRoleListAction')
}

// 导出我们自己的useStore，以便以后做类型约束
export function useStore(): Store<IStoreType> {
  return useVuexStore()
}

export default store
