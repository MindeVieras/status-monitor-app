
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import validator from 'validator'

import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'

import { uiConstants } from 'Constants'
import { renderText, RenderButton } from 'Common'
import { uiActions, usersActions } from 'Actions'

const styles = theme => ({
  actionsRoot: {
    display: `flex`,
    flexWrap: `wrap`,
    justifyContent: `space-between`,
    alignItems: `center`,
    marginTop: theme.spacing.unit * 2
  },
  serverErrorText: {
    width: `100%`,
    marginBottom: theme.spacing.unit * 2
  }
})

class UserCreateForm extends Component {

  handleModalClose() {
    this.props.dispatch(uiActions.modalClose(uiConstants.MODAL_ID_USER_CREATE))
  }

  render() {

    const { classes, handleSubmit, serverLoading, serverError } = this.props

    return (
      <form onSubmit={ handleSubmit }>
        <Field
          name="username"
          component={ renderText }
          label="Username *"
          margin="dense"
        />
        <Field
          name="password"
          component={ renderText }
          label="Password *"
          type="password"
          autoComplete="new-password"
          margin="dense"
        />
        <Field
          name="confirm_password"
          component={ renderText }
          label="Confirm password"
          type="password"
          autoComplete="confirm-new-password"
          margin="dense"
        />
        <Field
          name="email"
          component={ renderText }
          label="Email *"
          type="email"
          margin="dense"
        />

        <div className={ classes.actionsRoot }>

          {serverError &&
            <Typography
              color="error"
              className={ classes.serverErrorText }
            >
              { serverError }
            </Typography>
          }

          <Button variant="outlined" onClick={ () => this.handleModalClose() }>Cancel</Button>

          <RenderButton
            type="submit"
            loading={ serverLoading }
            text="Save"
            variant="outlined"
            color="primary"
          />

        </div>
      </form>
    )
  }
}

// Form validation
const validate = values => {

  const { username, password, confirm_password, email } = values
  const errors = {}

  // vlaidate username
  if (!username || validator.isEmpty(username))
    errors['username'] = `Username is required`
  else if (!validator.isAlphanumeric(username))
    errors['username'] = `Username must be alphanumeric only`
  else if (validator.isLength(username, {min:0, max:4}))
    errors['username'] = `Username must be at least 5 chars long`

  // vlaidate password
  if (!password || validator.isEmpty(password))
    errors['password'] = `Password is required`
  else if (validator.isLength(password, {min:0, max:4}))
    errors['password'] = `Password must be at least 5 chars long`

  // vlaidate confirm password
  if (password && confirm_password && !validator.equals(password, confirm_password))
    errors['confirm_password'] = `Passwords must match`

  // vlaidate email
  if (!email || validator.isEmpty(email))
    errors['email'] = `Email is required`
  else if (email && !validator.isEmail(email))
    errors['email'] =  `Email must be valid`

  return errors
}

// dispatch submit handler
function submit(values, dispatch, form) {
  dispatch(usersActions.create(values))
}

UserCreateForm.propTypes = {
  classes: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  serverLoading: PropTypes.bool,
  serverError: PropTypes.bool
}

UserCreateForm.defaultProps = {
  serverLoading: false,
  serverError: false,
}

function mapStateToProps(state) {
  const { loading, err } = state.users.create_user
  return {
    serverLoading: loading,
    serverError: err
  }
}

UserCreateForm = connect(mapStateToProps)(UserCreateForm)

export default reduxForm({
  form: 'user_create_form',
  onSubmit: submit,
  validate
})(withStyles(styles)(UserCreateForm))
