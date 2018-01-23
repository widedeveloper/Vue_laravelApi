import Vue from 'vue'
import Vuex from 'vuex'
import { mutations } from './mutations'
import plugins from './plugins'
import * as actions from './actions'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        loginStatus:false,
        api_token : ''
    },    
    actions,
    mutations,
    plugins,
    // actions

    getters: {
        accessToken(state) {
            return state
        }
    }
})