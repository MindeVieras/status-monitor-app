
import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import Header from '../Header'
import { ProjectCreate } from './ProjectCreate'
import ProjectsList from './ProjectsList'

import { uiActions } from 'Actions'

class Projects extends Component {

  componentDidMount(){
    const { dispatch } = this.props
    dispatch(uiActions.setTitle('Projects'))
  }

  render() {

    return (
      <Fragment>

        <Header />

        <ProjectsList />

        <ProjectCreate />

      </Fragment>
    )
  }
}

Projects.propTypes = {
  dispatch: PropTypes.func.isRequired,
  match: PropTypes.object.isRequired
}

export default connect()(Projects)
