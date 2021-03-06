
import React from 'react'
import PropTypes from 'prop-types'
import { Route, Redirect } from 'react-router-dom'

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={props => (
    localStorage.getItem('user')
      ? <Component {...props} />
      : <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
  )} />
)

PrivateRoute.propTypes = {
  component: PropTypes.any.isRequired,
  location: PropTypes.object
}

PrivateRoute.defaultProps = {
  location: {}
}

export default PrivateRoute
