import Vue from "vue";
import Vuex from "vuex";
 
Vue.use(Vuex);
 
export default new Vuex.Store({
    state: {
        loggedin : false
    },
    getters: {},
    mutations: {
        login(state) {
            state.loggedin = true
        },
        logout(state) {
            state.loggedin = false
        }
    },
    actions: {}
});