import Vue from 'vue'
import Vuex from 'vuex'
import { mutations } from './mutations'
import plugins from './plugins'
import * as actions from './actions'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        user: {
            loginStatus: false,
            api_token: '',
            name: '',
            email: '',
            userId: ''
        },
        tableInfo: {
            category: "",
            columns: []
        }
    },
    actions,
    mutations,
    plugins,
    getters: {
        getUser(state) {
            return state.user
        },
        getTableInfo(state) {
            return state.tableInfo
        }
    }
})