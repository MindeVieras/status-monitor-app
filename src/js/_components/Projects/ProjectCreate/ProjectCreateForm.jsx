
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import validator from 'validator'

import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'

import { uiConstants } from 'Constants'
import { renderText, renderToggle, renderInterval, RenderButton } from 'Common'
import { uiActions, projectsActions } from 'Actions'

const styles = theme => ({
  actionsRoot: {
    display: `flex`,
    flexWrap: `wrap`,
    justifyContent: `space-between`,
    alignItems: `center`,
    marginTop: theme.spacing.unit * 2
  },
  statusField: {
    maxWidth: theme.spacing.unit * 12.5,
    marginLeft: theme.spacing.unit * 2
  },
  serverErrorText: {
    width: `100%`,
    marginBottom: theme.spacing.unit * 2
  }
})

class ProjectCreateForm extends Component {

  handleModalClose() {
    this.props.dispatch(uiActions.modalClose(uiConstants.MODAL_ID_USER_CREATE))
  }

  render() {

    const { classes, handleSubmit, serverLoading, serverError } = this.props

    return (
      <form onSubmit={ handleSubmit }>
        <Field
          name="name"
          component={ renderText }
          label="Name *"
          margin="dense"
        />
        <Field
          name="domain"
          component={ renderText }
          label="Domain *"
          margin="dense"
        />

        <Field
          name="interval"
          component={ renderInterval }
          label="Interval *"
          margin="dense"
        />

        <Field
          className={ classes.statusField }
          name="status"
          component={ renderToggle }
          margin="dense"
          onLabel="Enabled"
          offLabel="Disabled"
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

  const { name, domain } = values
  const errors = {}

  // vlaidate name
  if (!name || validator.isEmpty(name))
    errors['name'] = `Name is required`

  // vlaidate domain
  if (!domain || validator.isEmpty(domain))
    errors['domain'] = `Domain is required`
  else if (domain && !validator.isFQDN(domain))
    errors['domain'] =  `Domain must be valid`

  return errors
}

// dispatch submit handler
function submit(values, dispatch, form) {
  dispatch(projectsActions.create(values))
}

ProjectCreateForm.propTypes = {
  classes: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  serverLoading: PropTypes.bool,
  serverError: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool
  ])
}

ProjectCreateForm.defaultProps = {
  serverLoading: false,
  serverError: false,
}

function mapStateToProps(state) {
  const { loading, err } = state.projects.create_project
  return {
    serverLoading: loading,
    serverError: err
  }
}

ProjectCreateForm = connect(mapStateToProps)(ProjectCreateForm)

export default reduxForm({
  form: 'project_create_form',
  onSubmit: submit,
  initialValues: {
    name: '',
    domain: '',
    interval: '60',
    status: true
  },
  validate
})(withStyles(styles)(ProjectCreateForm))
