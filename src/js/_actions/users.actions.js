
import { uiConstants, usersConstants } from 'Constants'
import { usersService } from 'Services'

export const usersActions = {
  create,
  getList,
  getOne,
  delete: _delete
}

function create(user) {
  return dispatch => {
    dispatch(request())

    usersService.create(user)
      .then(res => {
        console.log(res)
        if (res.ack == 'ok') {
          dispatch(success(res.user))
          dispatch(closeModal(uiConstants.MODAL_ID_USER_CREATE))
        } else {
          dispatch(failure(res.msg))
        }
      })
  }

  function request() { return { type: usersConstants.CREATE_REQUEST } }
  function success(user) { return { type: usersConstants.CREATE_SUCCESS, user } }
  function failure(err) { return { type: usersConstants.CREATE_FAILURE, err } }
  function closeModal(modal_id) { return { type: uiConstants.MODAL_CLOSE, modal_id } }
}

function getList() {
  return dispatch => {
    dispatch(request())

    usersService.getList()
      .then(res => {
        if (res.ack == 'ok')
          dispatch(success(res.list))
        else
          dispatch(failure(res.msg))
      })
  }

  function request() { return { type: usersConstants.GETLIST_REQUEST } }
  function success(users) { return { type: usersConstants.GETLIST_SUCCESS, users } }
  function failure(err) { return { type: usersConstants.GETLIST_FAILURE, err } }
}

function getOne(username) {
  return dispatch => {
    dispatch(request())

    usersService.getOne(username)
      .then(res => {
        if (res.ack == 'ok') {
          dispatch(success(res.data))
        } else {
          dispatch(failure(res.msg))
        }
      })
  }

  function request() { return { type: usersConstants.GETONE_REQUEST } }
  function success(user) { return { type: usersConstants.GETONE_SUCCESS, user } }
  function failure(err) { return { type: usersConstants.GETONE_FAILURE, err } }
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
  return dispatch => {
    dispatch(request(id))

    usersService.delete(id)
      .then(res => {
        if (res.ack == 'ok') {
          // dispatch(success(res.data))
          dispatch(success(id))
        } else {
          // dispatch(failure(res.msg))
          dispatch(failure(id, res.msg))
        }
      })
  }

  function request(id) { return { type: usersConstants.DELETE_REQUEST, id } }
  function success(id) { return { type: usersConstants.DELETE_SUCCESS, id } }
  function failure(id, err) { return { type: usersConstants.DELETE_FAILURE, id, err } }
}
