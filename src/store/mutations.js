export default {
    CHANGE_AUTH (state, auth) {
        state.auth = auth;
    },
    USER_INFO (state, useData) {
        state.userInfo = useData;
    },
    CHANGE_USER_INFO (state, myData) {
        state.userInfo.avatarUrl = myData.avatarUrl;
        state.userInfo.firstName = myData.firstName;
        state.userInfo.lastName = myData.lastName;
    },
    SOCKET_DATA (state, socketData) {
        state.socketData = socketData;
    },
    UPDATE_NUMBER (state, number) {
        state.updateNumber = number;
    },
    SAVE_LOG_LIST (state, logList) {
        let data = [...logList, ...state.logList];
        data.splice(10, data.length);
        state.logList = data;
    },
    CLEAR_LOG_LIST (state) {
        state.logList = [];
    },
    SAVE_LIST_MENU(state, data) {
        state.menus = data;
    },
    SAVE_STORE(state, data) {
        state.store = data;
    },
    CLOSE_GLOBAL_MODAL(state,data){
        state.showGlobalModal = data
    }
}
