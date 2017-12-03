import Vue from 'vue'
import Vuex from 'vuex'
import http from '../utils/http'
import { getToken, setToken, TokenKey } from '../utils/token'
Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    token_type: '',
    access_token: '',
    token: '',
    name: '',
    email: ''
  },
  getters: {
    auth_token: () => {
      return getToken(TokenKey)
    }
  },
  mutations: {

    SET_TOKEN_TYPE (state, token) {
      state.token_type = token
    },
    SET_ACCESS_TOKEN (state, access) {
      state.access_token = access
    },
    SET_TOKEN (state, token) {
      state.token = token
      setToken(token)
    }
  },
  actions: {
    Login ({ commit }, userInfo) {
      return new Promise((resolve, reject) => {
        http({
          url: '/api/login',
          method: 'post',
          data: userInfo
        }).then(response => {
          if (response.data) {
            console.log(response.data)

            const data = response.data
            commit('SET_TOKEN_TYPE', data.token_type)
            commit('SET_ACCESS_TOKEN', data.access_token)
            commit('SET_TOKEN', data.token_type + ' ' + data.access_token)
            resolve()
          }
        }).catch(error => {
          reject(error)
        })
      })
    },
    UserList ({ commit }, data) {
      return new Promise((resolve, reject) => {
        http({
          url: `/api/users?page=${data.page}`,
          method: 'get'
        }).then(response => {
          if (response.data) {
            resolve(response.data)
          }
        }).catch(error => {
          reject(error)
        })
      })
    },
    AddUser ({ commit }, userInfo) {
      return new Promise((resolve, reject) => {
        http({
          url: '/api/users',
          method: 'post',
          data: userInfo
        }).then(response => {
          console.log(23222222)
          if (response.data) {
            resolve(response.data)
          }
        }).catch(error => {
          reject(error)
        })
      })
    },
    TypeList ({ commit }) {
      return new Promise((resolve, reject) => {
        http({
          url: '/api/types',
          method: 'get'
        }).then(response => {
          if (response.data) {
            resolve(response.data)
          }
        }).catch(error => {
          reject(error)
        })
      })
    },
    AddArticle ({ commit }, article) {
      return new Promise((resolve, reject) => {
        http({
          url: '/api/articles',
          method: 'post',
          data: article
        }).then(response => {
          console.log(response)
          if (response.data) {
            resolve(response)
          }
        }).catch(error => {
          reject(error)
        })
      })
    },
    ArticleList ({ commit }, data) {
      return new Promise((resolve, reject) => {
        http({
          url: `/api/articles?page=${data.page}`,
          method: 'get'
        }).then(response => {
          if (response.data) {
            resolve(response.data)
          }
        }).catch(error => {
          reject(error)
        })
      })
    }
  }
})
export default store
