
import React from 'react'
import PropTypes from 'prop-types'
import humanizeDuration from 'humanize-duration'

import TextField from '@material-ui/core/TextField'
import InputAdornment from '@material-ui/core/InputAdornment'

const renderInterval = ({input, label, meta: {touched, error, invalid}, ...otherProps}) => {

  const { name, value, onChange } = input

  let secVal = value * 1000
  const shortEnglishHumanizer = humanizeDuration.humanizer({
    language: 'shortEn',
    languages: {
      shortEn: {
        y: () => 'y',
        mo: () => 'mo',
        w: () => 'w',
        d: () => 'd',
        h: () => 'h',
        m: () => 'm',
        s: () => 's',
        ms: () => 'ms',
      }
    }
  })

  return (
    <TextField
      type="number"
      label={ label }
      error={ touched && invalid }
      helperText={ touched && error }
      InputProps={{
        startAdornment: <InputAdornment position="start">s</InputAdornment>,
        endAdornment: <InputAdornment position="end">{ shortEnglishHumanizer(secVal) }</InputAdornment>
      }}
      { ...input }
      { ...otherProps }
    />

  )
}

renderInterval.propTypes = {
  input: PropTypes.shape({
    name: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired
  }).isRequired,
  label: PropTypes.string.isRequired,
  meta: PropTypes.object
}

renderInterval.defaultProps = {
  meta: {},
  margin: 'normal',
  fullWidth: true
}

export default renderInterval
