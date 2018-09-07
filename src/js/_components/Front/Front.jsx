
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import Header from '../Header'

import { uiActions } from 'Actions'

class Front extends Component {

  componentDidMount() {
    const { dispatch } = this.props
    dispatch(uiActions.setTitle('Status monitor'))
  }

  render() {

    return (
      <div>
        <Header />
        Front page
      </div>
    )
  }
}

Front.propTypes = {
  dispatch: PropTypes.func.isRequired
}

export default connect()(Front)
