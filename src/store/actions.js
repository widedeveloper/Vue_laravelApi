// export const ADD_TOKEN = 'ADD_TOKEN'

export const add_token = ({commit}, json) =>{
    if(json.token != '') {
        commit('add_token', json);
    }
}

export const add_tableInfo = ({commit}, value) => {
    commit('add_tableInfo', value)
}