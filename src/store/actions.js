// export const ADD_TOKEN = 'ADD_TOKEN'

export const add_token = ({commit}, token) =>{
    if(token != '') {
        commit('add_token', token);
    }
}