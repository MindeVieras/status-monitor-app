
import { usersConstants } from 'Constants'
import { loginService } from 'Services'
import { history } from 'Helpers'

export const loginActions = {
  login,
  logout
}

function login(username, password) {
  return dispatch => {
    dispatch(request())

    loginService.login(username, password)
      .then(res => {
        if (res.ack == 'ok') {
          const user = res.data
          dispatch(success(user))
          history.push('/')
        }
        else {
          dispatch(failure(res.msg))
        }
      })
  }

  function request() { return { type: usersConstants.LOGIN_REQUEST } }
  function success(user) { return { type: usersConstants.LOGIN_SUCCESS, user } }
  function failure(error) { return { type: usersConstants.LOGIN_FAILURE, error } }
}

function logout() {
  loginService.logout()
  return { type: usersConstants.LOGOUT }
}
