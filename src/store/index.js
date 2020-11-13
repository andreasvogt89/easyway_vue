import { createStore } from 'vuex'
import REST_interface from "@/REST_interface";



export default createStore({
  state: {
      login:{
        isLoggedIn: false,
        username: "",
      },
      data: [],
      error: "",
      backend: "",
  },
  mutations: {
    user (state, data){
      state.login.username = data.user[0].username;
      state.login.role = data.user[0].role;
      state.login.isLoggedIn = true;
    },
    error (state, error){
      state.error = error
    },
    backend(state, data){
      state.backend = data
    },
  },
  actions: {
    async login({commit}, user) {
      REST_interface.login(user)
          .then(res => {
            sessionStorage.setItem('EAtoken', res.data.accessToken)
            commit('user', res.data)

          }).catch(err => {
            commit('error', err)
          });
    },
    async backendState({commit}) {
      REST_interface.isBackendRunning()
          .then(res => {
            if(res.message instanceof String){
              commit('backend', true)
            } else {
              commit('backend', false)
            }
          }).catch(err => {
            commit('error', err)
          });
    },

  },
    getters: {
        loginState(state){
            return state.login.isLoggedIn;
        }
    },
});
