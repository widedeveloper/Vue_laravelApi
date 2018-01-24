
export const mutations = {
    add_token (state, json){
        state.user.api_token = json.token;
        state.user.name = json.name;
        state.user.email = json.email;
        state.user.userId = json.userId;
        state.user.loginStatus = json.isLoggedIn;
    },

    delete_token (state) {
        state.user.api_token = '';
        state.user.loginStatus = false;
        state.user.name ='';
        state.user.email = '';
        state.user.userId= '';
    },

    add_tableInfo (state, value) {
        state.tableInfo.category = value.category;
        state.tableInfo.columns = value.columns
    }
}