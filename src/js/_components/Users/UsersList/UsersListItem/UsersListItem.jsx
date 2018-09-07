
import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import { withStyles } from '@material-ui/core/styles'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Avatar from '@material-ui/core/Avatar'
import IconButton from '@material-ui/core/IconButton'

import EditIcon from '@material-ui/icons/Edit'
import DeleteIcon from '@material-ui/icons/Delete'

import { Spinner } from 'Common'

import { history } from 'Helpers'
import { usersActions } from 'Actions'


const styles = theme => ({
  itemRoot: {
    width: `100%`,
    backgroundColor: theme.palette.background.paper,
    marginBottom: theme.spacing.unit,
    boxShadow: theme.shadows[3]
  },
  withCursor: {
    cursor: `pointer`
  },
  actions: {
    alignSelf: `flex-start`
  }
})

class UsersListItem extends Component {

  goToUser() {
    const { username } = this.props
    history.push(`/users/${username}`)
  }

  deleteUser() {
    const { dispatch, id } = this.props
    dispatch(usersActions.delete(id))
  }

  render() {
    const { classes, id, username, initials, deleting } = this.props
    return (
      <ListItem
        dense
        classes={{
          root: classes.itemRoot
        }}
      >
        <Avatar
          onClick={ () => this.goToUser() }
          className={ classes.withCursor }
          alt={ username }
        >
          { initials }
        </Avatar>

        <ListItemText
          className={ classes.withCursor }
          onClick={ () => this.goToUser() }
          primary={ username }
        />

        <div className={ classes.actions }>
          <IconButton
            onClick={ () => console.log('ssdsdds') }
            aria-label="Edit" color="primary"
          >
            <EditIcon />
          </IconButton>

          <IconButton
            onClick={ () => this.deleteUser() }
            aria-label="Delete"
            color="secondary"
          >
            <DeleteIcon />
          </IconButton>
        </div>

        {deleting &&
          <Spinner type="list-item" size={ 30 } />
        }

      </ListItem>
    )
  }
}

UsersListItem.propTypes = {
  dispatch: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  id: PropTypes.number.isRequired,
  username: PropTypes.string.isRequired,
  initials: PropTypes.string.isRequired,
  deleting: PropTypes.bool
}

UsersListItem.defaultProps = {
  deleting: false
}

export default connect()(withStyles(styles)(UsersListItem))
