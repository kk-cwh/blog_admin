
export const TokenKey = 'auth_token'

export function getToken () {
  // console.log('get token')
  return window.localStorage.getItem(TokenKey)
}

export function setToken (token) {
  // console.log('set token')
  return window.localStorage.setItem(TokenKey, token)
}

export function removeToken () {
  return window.localStorage.removeItem(TokenKey)
}
