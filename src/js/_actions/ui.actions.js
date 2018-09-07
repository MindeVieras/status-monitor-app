
import { uiConstants } from 'Constants'

export const uiActions = {
  setTitle,
  setScreen, setFullScreen,
  modalOpen, modalClose
}

function setTitle(title) {
  return { type: uiConstants.SET_TITLE, title }
}

function setScreen(screen) {

  return dispatch => {
    dispatch(set(screen))
  }

  function set(screen) { return { type: uiConstants.SET_SCREEN, screen } }
}

function setFullScreen(full_screen) {

  return dispatch => {
    dispatch(set(full_screen))
  }

  function set(full_screen) { return { type: uiConstants.SET_FULLSCREEN, full_screen } }
}

/*
 * Modals Open/Close
 * calls modalOpen, modalClose
 */

function modalOpen(modal_id) {
  return dispatch => {
    dispatch(open(modal_id))
  }

  function open(modal_id) { return { type: uiConstants.MODAL_OPEN, modal_id } }
}

function modalClose(modal_id) {
  return dispatch => {
    dispatch(close(modal_id))
  }

  function close(modal_id) { return { type: uiConstants.MODAL_CLOSE, modal_id } }
}
