
import { projectsConstants } from 'Constants'

const initialState = {
  list: {
    loading: false,
    err: false,
    items: []
  },
  create_project: {
    loading: false,
    err: false
  },
  selected_project: {
    loading: false,
    err: false,
    user: {}
  }
}

export function projects(state = initialState, action) {

  switch (action.type) {

  /*
   * Projects list reducers
   * calls GETLIST_REQUEST, GETLIST_SUCCESS, GETLIST_FAILURE
   */

  case projectsConstants.GETLIST_REQUEST:
    return {
      ...state,
      list: {
        loading: true
      }
    }
  case projectsConstants.GETLIST_SUCCESS:
    return {
      ...state,
      list: {
        items: action.projects
      }
    }
  case projectsConstants.GETLIST_FAILURE:
    return {
      ...state,
      list: {
        err: action.err
      }
    }


  /*
   * Project create reducers
   * calls CREATE_REQUEST, CREATE_SUCCESS, CREATE_FAILURE
   */

  case projectsConstants.CREATE_REQUEST:
    return {
      ...state,
      create_project: {
        loading: true
      }
    }
  case projectsConstants.CREATE_SUCCESS:
    return {
      ...state,
      create_project: {
        loading: false,
        err: false,
      },
      list: {
        items: [...state.list.items, action.project]
      }
    }
  case projectsConstants.CREATE_FAILURE:
    return {
      ...state,
      create_project: {
        err: action.err
      }
    }


  /*
   * Project refresh reducers
   * calls REFRESH_REQUEST, REFRESH_SUCCESS, REFRESH_FAILURE
   */

  case projectsConstants.REFRESH_REQUEST:
    return {
      ...state,
      list: {
        items:
          state.list.items.map(item =>
            item.id === action.id
              ? { ...item, refreshing: true, refreshError: null }
              : item
          )
      }
    }
  case projectsConstants.REFRESH_SUCCESS:
    return {
      ...state,
      list: {
        items: state.list.items.filter(item => item.id !== action.id)
      },
      list: {
        items: state.list.items.map(item => {
          if (item.id === action.project.id) {
            return action.project
          }
          return item
        })
      }
    }
  case projectsConstants.REFRESH_FAILURE:
    return {
      ...state,
      list: {
        items: state.list.items.map(item => {
          if (item.id === action.id) {
            // make copy of item without 'refreshing:true' property
            const { refreshing, ...itemCopy } = item
            // return copy of item with 'refreshError:[error]' property
            return { ...itemCopy, refreshError: action.err }
          }

          return item
        })
      }
    }
  // case usersConstants.GETONE_REQUEST:
  //   return {
  //     ...state,
  //     selected_user: {
  //       loading: true
  //     }
  //   }
  // case usersConstants.GETONE_SUCCESS:
  //   return {
  //     ...state,
  //     selected_user: {
  //       user: action.user
  //     }
  //   }
  // case usersConstants.GETONE_FAILURE:
  //   return {
  //     selected_user: {
  //       err: action.err
  //     }
  //   }


  // case usersConstants.DELETE_REQUEST:
  //   // add 'deleting:true' property to user being deleted
  //   return {
  //     ...state,
  //     list: {
  //       items:
  //         state.list.items.map(user =>
  //           user.id === action.id
  //             ? { ...user, deleting: true }
  //             : user

  //         )
  //     }
  //   }
  // case usersConstants.DELETE_SUCCESS:
  //   // remove deleted user from state
  //   return {
  //     ...state,
  //     list: {
  //       items: state.list.items.filter(user => user.id !== action.id)
  //     }
  //   }
  // case usersConstants.DELETE_FAILURE:
  //   // remove 'deleting:true' property and add 'deleteError:[error]' property to user
  //   return {
  //     ...state,
  //     list: {
  //       items: state.list.items.map(user => {
  //         if (user.id === action.id) {
  //           // make copy of user without 'deleting:true' property
  //           const { deleting, ...userCopy } = user
  //           // return copy of user with 'deleteError:[error]' property
  //           return { ...userCopy, deleteError: action.error }
  //         }

  //         return user
  //       })
  //     }
  //   }
  default:
    return state
  }
}
