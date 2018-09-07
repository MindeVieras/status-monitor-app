
import  React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'

import AddIcon from '@material-ui/icons/Add'

import { uiConstants } from 'Constants'
import { Tip, SimpleModal } from 'Common'
import { uiActions } from 'Actions'

import UserCreateForm from './UserCreateForm'

const styles = theme => ({
  button: {
    position: `fixed`,
    right: 0,
    bottom: 0,
    margin: theme.spacing.unit,
    zIndex: theme.zIndex.appBar
  }
})

class UserCreateButton extends Component {

  handleModalOpen() {
    this.props.dispatch(uiActions.modalOpen(uiConstants.MODAL_ID_USER_CREATE))
  }

  render() {

    const { classes } = this.props

    return (
      <Fragment>
        <Button
          data-tip
          data-for="tip_create_new_user"
          onClick={ () => this.handleModalOpen() }
          variant="fab"
          color="primary"
          aria-label="add"
          className={ classes.button }
        >
          <AddIcon />
        </Button>
        <Tip id="tip_create_new_user">Create new user</Tip>

        <SimpleModal
          modal_id={ uiConstants.MODAL_ID_USER_CREATE }
          title="Create new user"
          closeButton={ true }
          disableEscapeKeyDown={ true }
        >
          <UserCreateForm />
        </SimpleModal>

      </Fragment>
    )
  }
}

UserCreateButton.propTypes = {
  dispatch: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired
}

export default connect()(withStyles(styles)(UserCreateButton))
