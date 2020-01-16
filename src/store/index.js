import Vue from 'vue'
import Vuex from 'vuex'
import Cookies from 'js-cookie'
import storage from '@/utils/storage'
Vue.use(Vuex);

const state={
    SystemName:'运维管理系统',
    version: 'V1.1.0',
    sidebar: {
        sliderState: storage.get('sliderState')
    },
    old_token: '000000',
    language:Cookies.get('language') || 'zh',
    roles: [],
}
const mutations={
    ['SET_SLIDERSTATE']: (state, newSliderState) => {
        state.sidebar.sliderState = newSliderState
        storage.set('sliderState', newSliderState)
    },
    ['SET_LANGUAGE']: (state, language) => {
        state.language = language
        Cookies.set('language', language)
    },
    ['SET_ROLES']: (state, roles) => {
        state.roles = roles
    },

}
const getters={
    getSliderStateWidth: state => {
        return state.sidebar.sliderState === 'full' ? '210px' : '64px'
    },
    roles: state => state.roles,

}
const actions={
    setSliderState({ commit }, newSliderState) {
        commit('SET_SLIDERSTATE', newSliderState)
    },
    toggleSideBar({ commit }) {
        let state = ''
        storage.get('sliderState') === 'full'
            ? (state = 'collapse')
            : (state = 'full')
        commit('SET_SLIDERSTATE', state)
    },
    setLanguage({ commit }, language) {
        commit('SET_LANGUAGE', language)
    },
    loginByUser({ commit }, role){
        commit('SET_ROLES', role)
    },
}

export default new Vuex.Store({
  state,
  mutations,
  getters,
  actions
});