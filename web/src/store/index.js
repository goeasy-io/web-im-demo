import {createStore} from 'vuex'

export default createStore({
    state: {
        currentUser: null
    },
    mutations: {
        updateCurrentUser(state, user) {
            state.currentUser = user;
        }
    },
    actions: {},
    getters: {},
    modules: {}
})
