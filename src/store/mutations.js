
export const mutations = {
    add_token (state, token){
        state.api_token = token;
        state.loginStatus = true;
    },

    delete_token (state) {
        state.api_token = '';
        state.loginStatus = false;
    }
}