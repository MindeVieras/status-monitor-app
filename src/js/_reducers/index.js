
import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'

import { ui } from './ui.reducer'
import { auth } from './auth.reducer'
import { users } from './users.reducer'

const rootReducer = combineReducers({
  ui,
  auth,
  users,
  form: formReducer
})

export default rootReducer
