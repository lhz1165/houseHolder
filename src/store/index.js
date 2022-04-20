import Vue from "vue";
import Vuex from "vuex"

Vue.use(Vuex)

const state=null!=window.localStorage.getItem('state')?JSON.parse(window.localStorage.getItem('state')): {
    user:{
        name:''
    }
}
const getters={
    getUser(state){
        return state.user;
    }
}
const mutations={
    updateUser(state,user){
       state.user=user
    }
}
const actions={
    asyncUpdateUser(context,user){
        context.commit('updateUser',user)
    }
}
export default new Vuex.Store({
    state,
    getters,
    mutations,
    actions
})