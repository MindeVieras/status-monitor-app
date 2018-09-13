
import { usersConstants } from 'Constants'

const initialState = {
  list: {
    loading: false,
    err: false,
    items: []
  },
  create_user: {
    loading: false,
    err: false
  },
  selected_user: {
    loading: false,
    err: false,
    user: {}
  }
}

export function users(state = initialState, action) {

  switch (action.type) {

  /*
   * Users list reducers
   * calls GETLIST_REQUEST, GETLIST_SUCCESS, GETLIST_FAILURE
   */

  case usersConstants.GETLIST_REQUEST:
    return {
      ...state,
      list: {
        loading: true
      }
    }
  case usersConstants.GETLIST_SUCCESS:
    return {
      ...state,
      list: {
        items: action.users
      }
    }
  case usersConstants.GETLIST_FAILURE:
    return {
      ...state,
      list: {
        err: action.err
      }
    }


  /*
   * User create reducers
   * calls CREATE_REQUEST, CREATE_SUCCESS, CREATE_FAILURE
   */

  case usersConstants.CREATE_REQUEST:
    return {
      ...state,
      create_user: {
        loading: true
      }
    }
  case usersConstants.CREATE_SUCCESS:
    return {
      ...state,
      create_user: {
        loading: false,
        err: false,
      },
      list: {
        items: [...state.list.items, action.user]
      }
    }
  case usersConstants.CREATE_FAILURE:
    return {
      ...state,
      create_user: {
        err: action.err
      }
    }

  case usersConstants.GETONE_REQUEST:
    return {
      ...state,
      selected_user: {
        loading: true
      }
    }
  case usersConstants.GETONE_SUCCESS:
    return {
      ...state,
      selected_user: {
        user: action.user
      }
    }
  case usersConstants.GETONE_FAILURE:
    return {
      selected_user: {
        err: action.err
      }
    }


  case usersConstants.DELETE_REQUEST:
    // add 'deleting:true' property to user being deleted
    return {
      ...state,
      list: {
        items:
          state.list.items.map(user =>
            user.id === action.id
              ? { ...user, deleting: true }
              : user

          )
      }
    }
  case usersConstants.DELETE_SUCCESS:
    // remove deleted user from state
    return {
      ...state,
      list: {
        items: state.list.items.filter(user => user.id !== action.id)
      }
    }
  case usersConstants.DELETE_FAILURE:
    // remove 'deleting:true' property and add 'deleteError:[error]' property to user
    return {
      ...state,
      list: {
        items: state.list.items.map(user => {
          if (user.id === action.id) {
            // make copy of user without 'deleting:true' property
            const { deleting, ...userCopy } = user
            // return copy of user with 'deleteError:[error]' property
            return { ...userCopy, deleteError: action.error }
          }

          return user
        })
      }
    }
  default:
    return state
  }
}
