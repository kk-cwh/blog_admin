
export const TokenKey = 'auth_token'

export function getToken () {
  console.log(12222)
  return window.localStorage.getItem(TokenKey)
}

export function setToken (token) {
  return window.localStorage.setItem(TokenKey, token)
}

export function removeToken () {
  return window.localStorage.removeItem(TokenKey)
}
