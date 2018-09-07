
import React from 'react'
import PropTypes from 'prop-types'

import Typography from '@material-ui/core/Typography'

import { history } from 'Helpers'

const Title = ({ title }) => {

  return (
    <Typography
      variant="title"
      color="inherit"
      style={{ cursor: `pointer` }}
      onClick={ () => history.goBack() }
    >
      { title }
    </Typography>
  )
}

Title.propTypes = {
  title: PropTypes.string.isRequired
}

export default Title
