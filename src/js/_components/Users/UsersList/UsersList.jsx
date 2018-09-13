
import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { withStyles } from '@material-ui/core/styles'
import List from '@material-ui/core/List'

import { Spinner } from 'Common'

import UsersListItem from './UsersListItem'
import { UserCreate } from '../UserCreate'

import { uiActions, usersActions } from 'Actions'

const styles = theme => ({
  list: {
    width: `100%`,
    maxWidth: theme.spacing.unit * 75,
    margin: `0 auto`,
    padding: theme.spacing.unit * 2
  }
})

class UsersList extends Component {

  componentDidMount(){
    const { dispatch } = this.props

    dispatch(uiActions.setTitle('Users'))
    dispatch(usersActions.getList())
  }

  render() {
    const { classes, users } = this.props
    return (
      <Fragment>

        {users.loading &&
          <Spinner type="primary" size={ 70 } />
        }

        {users.err &&
          <div>{users.err}</div>
        }

        {users.items &&
          <List
            className={ classes.list }
            disablePadding={ true }
          >
            {users.items.map(user =>
              <UsersListItem key={ user.id } { ...user } />
            )}
          </List>
        }

        <UserCreate />

      </Fragment>
    )
  }
}

UsersList.propTypes = {
  dispatch: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  users: PropTypes.object.isRequired
}

function mapStateToProps(state) {
  const { users } = state
  return {
    users: users.list
  }
}

export default connect(mapStateToProps)(withStyles(styles)(UsersList))
