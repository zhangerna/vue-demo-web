import httpclient from '@/utils/httpclient'

export default {
    change_auth ({commit}, auth) {
        commit('CHANGE_AUTH', auth);
    },
    user_info ({commit}, userData) {
        commit('USER_INFO', userData);
    },
    user_Personal_Info ({commit}, myData) {
        commit('CHANGE_USER_INFO', myData);
    },
    save_socket_data ({commit}, socketData) {
        commit('SOCKET_DATA', socketData);
    },
    save_log_list ({commit}, logList) {
        commit('SAVE_LOG_LIST', logList);
    },
    clear_log_list({commit}) {
        commit('CLEAR_LOG_LIST');
    },
    update_number({commit}, number) {
        commit('UPDATE_NUMBER', number)
    },
    save_list_menu({commit}) {
        return new Promise((resolve, reject) => {
            httpclient.get("/api/v1/listmenus").then((response) => {
                commit('SAVE_LIST_MENU', response.data.data);
                resolve();
            }).catch((e) => {
                reject(e)
            });
        })
    },
    change_store ({commit}, id, name) {
        if (id) {
            commit('SAVE_STORE', {
                id: [id],
                name: name
            })
        }
    },
    show_global_modal({commit},data){
        commit('CLOSE_GLOBAL_MODAL',data)
    }
}
