
import { uiConstants, projectsConstants } from 'Constants'
import { projectsService } from 'Services'

export const projectsActions = {
  create,
  refresh,
  getList,
  // getOne,
  // delete: _delete
}

function create(project) {
  return dispatch => {
    dispatch(request())

    projectsService.create(project)
      .then(res => {
        if (res.ack == 'ok') {
          dispatch(success(res.project))
          dispatch(closeModal(uiConstants.MODAL_ID_PROJECT_CREATE))
        } else {
          dispatch(failure(res.msg))
        }
      })
  }

  function request() { return { type: projectsConstants.CREATE_REQUEST } }
  function success(project) { return { type: projectsConstants.CREATE_SUCCESS, project } }
  function failure(err) { return { type: projectsConstants.CREATE_FAILURE, err } }
  function closeModal(modal_id) { return { type: uiConstants.MODAL_CLOSE, modal_id } }
}


function refresh(id) {
  return dispatch => {
    dispatch(request(id))

    projectsService.refresh(id)
      .then(res => {
        if (res.ack == 'ok') {
          dispatch(success(res.project))
        } else {
          dispatch(failure(id, res.msg))
        }
      })
  }

  function request(id) { return { type: projectsConstants.REFRESH_REQUEST, id } }
  function success(project) { return { type: projectsConstants.REFRESH_SUCCESS, project } }
  function failure(id, err) { return { type: projectsConstants.REFRESH_FAILURE, id, err } }
}

function getList() {
  return dispatch => {
    dispatch(request())

    projectsService.getList()
      .then(res => {
        if (res.ack == 'ok')
          dispatch(success(res.list))
        else
          dispatch(failure(res.msg))
      })
  }

  function request() { return { type: projectsConstants.GETLIST_REQUEST } }
  function success(projects) { return { type: projectsConstants.GETLIST_SUCCESS, projects } }
  function failure(err) { return { type: projectsConstants.GETLIST_FAILURE, err } }
}

// function getOne(username) {
//   return dispatch => {
//     dispatch(request())

//     usersService.getOne(username)
//       .then(res => {
//         if (res.ack == 'ok') {
//           dispatch(success(res.data))
//         } else {
//           dispatch(failure(res.msg))
//         }
//       })
//   }

//   function request() { return { type: usersConstants.GETONE_REQUEST } }
//   function success(user) { return { type: usersConstants.GETONE_SUCCESS, user } }
//   function failure(err) { return { type: usersConstants.GETONE_FAILURE, err } }
// }

// // prefixed function name with underscore because delete is a reserved word in javascript
// function _delete(id) {
//   return dispatch => {
//     dispatch(request(id))

//     usersService.delete(id)
//       .then(res => {
//         if (res.ack == 'ok') {
//           // dispatch(success(res.data))
//           dispatch(success(id))
//         } else {
//           // dispatch(failure(res.msg))
//           dispatch(failure(id, res.msg))
//         }
//       })
//   }

//   function request(id) { return { type: usersConstants.DELETE_REQUEST, id } }
//   function success(id) { return { type: usersConstants.DELETE_SUCCESS, id } }
//   function failure(id, err) { return { type: usersConstants.DELETE_FAILURE, id, err } }
// }
