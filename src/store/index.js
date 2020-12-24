import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isshow:true,
    activeName:0,
    city:{cityId: 110100,
      cityName: "北京",},
    jwt:""
  },
  mutations: {
    show:function(state,val){
      state.isshow = val
    },
    setac:function(state,val){
      state.activeName = val
    },
    setcity:function(state,val){
      state.city = val
    },
    setjwt:function(state,val){
      state.jwt = val
      window.localStorage.setItem("jwt",val)
    }
  },
  actions: {
  },
  modules: {
  }
})
