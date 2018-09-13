
import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'

import { ui } from './ui.reducer'
import { auth } from './auth.reducer'
import { users } from './users.reducer'
import { projects } from './projects.reducer'

const rootReducer = combineReducers({
  ui,
  auth,
  users,
  projects,
  form: formReducer
})

export default rootReducer
