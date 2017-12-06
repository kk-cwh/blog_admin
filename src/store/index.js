import Vue from 'vue'
import Vuex from 'vuex'
import http from '../utils/http'
import { setToken, removeToken } from '../utils/token'
Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    token_type: '',
    access_token: '',
    token: '',
    name: '',
    email: ''
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
    },
    CLEAR_STATE (state) {
      state.token_type = ''
      state.access_token = ''
      state.token = ''
      state.name = ''
      state.email = ''
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
    GetUserInfo ({ commit }) {
      return new Promise((resolve, reject) => {
        http({
          url: '/api/userinfo',
          method: 'get'
        }).then(response => {
          if (response.data) {
            let data = response.data.data
            let user = data.user
            this.state.name = user.name
            this.state.email = user.email
            resolve()
          }
        }).catch(error => {
          reject(error)
        })
      })
    },
    Logout ({ commit }) {
      return new Promise((resolve, reject) => {
        http({
          url: '/api/logout',
          method: 'post'
        }).then(response => {
          if (response.data) {
            // console.log(response.data)

            removeToken()
            commit('CLEAR_STATE')
            console.log(this.state)
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
          if (response.data) {
            resolve(response)
          }
        }).catch(error => {
          reject(error)
        })
      })
    },
    UpdateArticle ({ commit }, article) {
      return new Promise((resolve, reject) => {
        http({
          url: `/api/articles/${article.id}`,
          method: 'put',
          data: article
        }).then(response => {
          if (response.data) {
            resolve(response)
          }
        }).catch(error => {
          reject(error)
        })
      })
    },
    GetArticleDetail ({ commit }, data) {
      return new Promise((resolve, reject) => {
        http({
          url: `/api/articles/${data.id}`,
          method: 'get'
        }).then(response => {
          if (response.data) {
            const data = response.data
            resolve(data)
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
