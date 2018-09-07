
import React, { PureComponent, Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'

import grey from '@material-ui/core/colors/grey'

import Header from './Header'

import { uiActions } from 'Actions'

const styles = theme => ({
  error_wrapper: {
    flex: 1,
    display: `flex`,
    justifyContent: `center`,
    alignItems: `center`
  },
  text: {
    color: grey[600]
  }
})

class Error404 extends PureComponent {

  componentDidMount() {
    const { dispatch } = this.props
    dispatch(uiActions.setTitle('404 Not Found'))
  }

  render() {

    const { classes } = this.props
    console.log('404 renderer')
    return (
      <Fragment>

        <Header />

        <div className={ classes.error_wrapper }>
          <Typography
            className={ classes.text }
            variant="display2"
          >
            404 Not found { location.pathname }
          </Typography>
        </div>

      </Fragment>
    )
  }
}

Error404.propTypes = {
  dispatch: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired
}

export default connect()(withStyles(styles)(Error404))
