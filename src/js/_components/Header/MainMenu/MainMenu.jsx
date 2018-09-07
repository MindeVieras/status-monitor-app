
import React, { PureComponent, Fragment } from 'react'
import PropTypes from 'prop-types'

import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import Divider from '@material-ui/core/Divider'

import MoreVertIcon from '@material-ui/icons/MoreVert'
import AccountCircle from '@material-ui/icons/AccountCircle'
import Dashboard from '@material-ui/icons/Dashboard'
import People from '@material-ui/icons/People'
import Home from '@material-ui/icons/Home'
import PowerSettingsNew from '@material-ui/icons/PowerSettingsNew'

import { Tip } from 'Common'
import { history } from 'Helpers'

const styles = theme => ({
  accountMenuItem: {
    paddingLeft: theme.spacing.unit * 2,
    paddingRight: theme.spacing.unit * 2
  }
})

class MainMenu extends PureComponent {

  constructor(props) {
    super(props)

    this.state = {
      anchorEl: null
    }

    this.handleClick = this.handleClick.bind(this)
    this.handleMenuClick = this.handleMenuClick.bind(this)
  }

  handleClick(event) {
    this.setState({ anchorEl: event.currentTarget })
  }

  handleMenuClick(href) {
    this.setState({ anchorEl: null })
    history.push(href)
  }

  render() {

    const { classes, user } = this.props
    const { anchorEl } = this.state

    return (
      <Fragment>
        <IconButton
          data-tip
          data-for="tip_main_menu"
          aria-label="Menu"
          aria-owns={ anchorEl ? 'main-menu' : null }
          aria-haspopup="true"
          onClick={ this.handleClick }
          color="inherit"
        >
          <MoreVertIcon />
        </IconButton>

        <Tip id="tip_main_menu">Main menu</Tip>

        <Menu
          id="main-menu"
          anchorEl={ anchorEl }
          open={ Boolean(anchorEl) }
          onClose={ () => this.setState({ anchorEl: null }) }
        >
          <MenuItem onClick={ () => this.handleMenuClick(`/users/${user.username}`) }>
            <ListItemIcon>
              <AccountCircle />
            </ListItemIcon>
            <div className={ classes.accountMenuItem }>
              <Typography>{ user.username }</Typography>
              <Typography variant="caption">{ user.email }</Typography>
            </div>
          </MenuItem>
          <Divider />
          <MenuItem onClick={ () => this.handleMenuClick('/admin') }>
            <ListItemIcon>
              <Dashboard />
            </ListItemIcon>
            <ListItemText inset primary="Albums" />
          </MenuItem>
          <MenuItem onClick={ () => this.handleMenuClick('/users') }>
            <ListItemIcon>
              <People />
            </ListItemIcon>
            <ListItemText inset primary="Users" />
          </MenuItem>
          <MenuItem onClick={ () => this.handleMenuClick('/') }>
            <ListItemIcon>
              <Home />
            </ListItemIcon>
            <ListItemText inset primary="Front" />
          </MenuItem>
          <MenuItem onClick={ () => this.handleMenuClick('/login') }>
            <ListItemIcon>
              <PowerSettingsNew />
            </ListItemIcon>
            <ListItemText inset primary="Logout" />
          </MenuItem>
        </Menu>
      </Fragment>
    )
  }
}

MainMenu.propTypes = {
  classes: PropTypes.object.isRequired,
  user: PropTypes.shape({
    username: PropTypes.string
  }).isRequired
}

export default withStyles(styles)(MainMenu)
