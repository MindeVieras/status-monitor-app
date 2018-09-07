
import { usersConstants } from 'Constants'

let user = JSON.parse(localStorage.getItem('user'))
const initialState = user ? { loggedIn: true, user } : {}

export function auth(state = initialState, action) {
  switch (action.type) {
  case usersConstants.LOGIN_REQUEST:
    return {
      loading: true
    }
  case usersConstants.LOGIN_SUCCESS:
    return {
      loggedIn: true,
      user: action.user
    }
  case usersConstants.LOGIN_FAILURE:
    return {
      error: true,
      msg: action.error
    }
  case usersConstants.LOGOUT:
    return {}
  default:
    return state
  }
}
