import { Message } from 'iview'
import axios from 'axios'
import { getToken } from '../utils/token'
let http = axios.create({
  baseURL: process.env.BASE_API
})
http.defaults.timeout = 5000

// Add a request interceptor
http.interceptors.request.use(function (config) {
  // Do something before request is sent
  if (getToken()) {
    config.headers['Authorization'] = getToken()
  }
  config.headers['Content-Type'] = 'application/json'
  return config
}, function (error) {
  // Do something with request error
  return Promise.reject(error)
})

// Add a response interceptor
http.interceptors.response.use(function (response) {
  // Do something with response data
  return response
}, function (error) {
  // console.log(JSON.stringify(error))
  if (error && error.response) {
    if (error.response.status === 401) {
      Message.error({
        content: ' 401 not auth',
        duration: 10
      })
    }
    if (error.response.status === 404) {
      Message.error({
        content: ' 404 not found',
        duration: 10
      })
    }

    if (error.response.status === 500) {
      Message.error({
        content: ' 500 system error ',
        duration: 10
      })
    }
  }

  // Do something with response error
  return Promise.reject(error)
})

export default http
