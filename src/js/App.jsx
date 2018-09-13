
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Router, Switch, Route } from 'react-router-dom'

import { withStyles } from '@material-ui/core/styles'

import PrivateRoute from './_components/PrivateRoute'
import Front from './_components/Front'
import Projects from './_components/Projects'
import Users from './_components/Users'
import Login from './_components/Login'
import Error404 from './_components/404'

import { history } from 'Helpers'
import { uiActions } from 'Actions'

const styles = theme => ({
  appRoot: {
    display: `flex`,
    flexDirection: `column`,
    position: `absolute`,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  }
})

class App extends Component {

  constructor(props) {
    super(props)
  }

  componentDidMount() {
    // Add resize event listener
    this.updateDimensions()
    window.addEventListener('resize', this.updateDimensions.bind(this))
  }

  componentWillUnmount() {
    // Remove resize event listener
    window.removeEventListener('resize', this.updateDimensions.bind(this))
  }

  // Calculate & Update state of new dimensions
  updateDimensions() {
    const { dispatch } = this.props
    let width = window.innerWidth
    let height = window.innerHeight
    let orientation = (width < height) ? 'portrait' : 'landscape'
    dispatch(uiActions.setScreen({ width, height, orientation }))
  }

  render() {

    const { classes } = this.props

    return (
      <div className={ classes.appRoot }>
        <Router history={ history }>
          <Switch>
            <PrivateRoute exact path="/" component={ Front } />
            <PrivateRoute path="/projects" component={ Projects } />
            <PrivateRoute path="/users" component={ Users } />
            <Route path="/login" component={ Login } />
            <PrivateRoute component={ Error404 } />
          </Switch>
        </Router>
      </div>
    )
  }
}

App.propTypes = {
  dispatch: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired
}

export default connect()(withStyles(styles)(App))
