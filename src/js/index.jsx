
import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'

import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'

import { store } from 'Helpers'
import App from './App'

const theme = createMuiTheme({
  palette: {
    type: 'light'
  }
})

// console.log(theme)

const StatusMonitorApp = () => (
  <Provider store={ store }>
    <MuiThemeProvider theme={ theme }>
      <CssBaseline />
      <App />
    </MuiThemeProvider>
  </Provider>
)

render(<StatusMonitorApp />, document.getElementById('root'))
