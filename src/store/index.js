import Vue from 'vue'
import Vuex from 'vuex'

import user from './moduleUser'
import post from './modulePost'

Vue.use(Vuex)

const store = new Vuex.Store({
    strict: process.env.NODE_ENV !== 'production',
    state: {
        isLoading: false
    },
    actions: {
        setLoading({ commit }, loading = false) {
            commit('SET_LOADING', loading);
        }
    },
    mutations: {
        SET_LOADING: (state, loading) => {
            state.isLoading = loading;
        }
    },
    modules: {
        user,
        post
    }
})

export default store;