
import { uiConstants } from 'Constants'

const initialState = {
  title: '',
  full_screen: false,
  modals: {}
}

export function ui(state = initialState, action) {

  switch (action.type) {

  case uiConstants.SET_TITLE:
    return {
      ...state,
      title: action.title
    }
  case uiConstants.SET_SCREEN:
    return {
      ...state,
      screen: action.screen
    }
  case uiConstants.SET_FULLSCREEN:
    return {
      ...state,
      full_screen: action.full_screen
    }
  case uiConstants.MODAL_OPEN:
    return {
      ...state,
      modals: {
        ...state.modals,
        [action.modal_id]: true
      }
    }
  case uiConstants.MODAL_CLOSE:
    return {
      ...state,
      modals: {
        ...state.modals,
        [action.modal_id]: false
      }
    }
  default:
    return state
  }
}
