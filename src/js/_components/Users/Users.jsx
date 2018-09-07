
import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { Switch, Route } from 'react-router-dom'

import Header from '../Header'
import UsersList from './UsersList'
import UserView from './UserView'
import Error404 from '../404'

const Users = (props) => {

  const { match } = props

  return (
    <Fragment>

      <Header />

      <Switch>
        <Route exact path={ match.url } component={ UsersList } />
        <Route path={ `${match.url}/:username` } component={ UserView } />
        <Route component={ Error404 } />
      </Switch>

    </Fragment>
  )

}

Users.propTypes = {
  match: PropTypes.object.isRequired
}

export default Users
