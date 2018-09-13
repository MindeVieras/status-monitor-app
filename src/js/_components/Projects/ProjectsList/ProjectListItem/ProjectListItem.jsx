
import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import { withStyles } from '@material-ui/core/styles'
import ExpansionPanel from '@material-ui/core/ExpansionPanel'
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary'
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails'
import ExpansionPanelActions from '@material-ui/core/ExpansionPanelActions'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'

import grey from '@material-ui/core/colors/grey'

import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import EditIcon from '@material-ui/icons/Edit'
import DeleteIcon from '@material-ui/icons/Delete'
import RefreshIcon from '@material-ui/icons/Refresh'

import { Spinner } from 'Common'

import { history } from 'Helpers'
import { projectsActions } from 'Actions'

const styles = theme => ({
  panelRoot: {
    marginBottom: theme.spacing.unit
  },
  panelExpanded: {
    marginTop: theme.spacing.unit * 2,
    marginBottom: theme.spacing.unit * 2
  },
  summaryRoot: {
    paddingLeft: theme.spacing.unit * 1.5,
    paddingRight: theme.spacing.unit * 1.5,
    cursor: `default!important`,
    '&$summaryFocused': {
      backgroundColor: grey[200]
    }
  },
  summaryFocused: {},
  summaryContent:{
    alignItems: `center`,
    marginTop: theme.spacing.unit,
    marginBottom: theme.spacing.unit,
    '& > :last-child': {
      paddingRight: 0
    }
  },
  summaryIcon: {
    marginRight: theme.spacing.unit
  },
  summaryTitle: {
    flex: 1,
    display: `flex`,
    alignItems: `center`,
    justifyContent: `space-between`
  },
  summaryTitleRight: {
    display: `flex`,
    alignItems: `center`
  },
  panelDetails: {
    alignItems: `flex-start`
  },
  actionsRoot: {
    borderTop: `1px solid ${grey[600]}`
  },
  metaTableRow: {
    height: theme.spacing.unit * 4.5
  },
  metaTableCell: {
    paddingLeft: theme.spacing.unit,
    paddingRight: theme.spacing.unit * 4
  }
})

class ProjectListItem extends Component {

  constructor() {
    super()

    this.state = {
      expanded: false
    }
  }

  refreshProject() {
    const { dispatch, id } = this.props
    dispatch(projectsActions.refresh(id))
  }

  deleteProject() {
    const { dispatch, id } = this.props
    dispatch(projectsActions.delete(id))
  }

  expandToggle(expanded) {
    this.setState({
      expanded: !expanded
    })
  }

  render() {

    const {
      classes,
      id, name,
      domain, ip,
      deleting,
      refreshing, refreshError } = this.props

    const { expanded } = this.state

    return (
      <ExpansionPanel
        expanded={ expanded }
        classes={{
          root: classes.panelRoot,
          expanded: classes.panelExpanded
        }}
      >

        <ExpansionPanelSummary
          classes={{
            root: classes.summaryRoot,
            focused: classes.summaryFocused,
            content: classes.summaryContent
          }}
        >
          <div className={ classes.summaryTitle }>
            <Typography variant="title">
              { name }
              <Typography variant="caption">{ ip }</Typography>
            </Typography>

            <div className={ classes.summaryTitleRight }>
              {refreshing &&
                <Typography variant="caption">refreshing...</Typography>
              }
              {refreshError &&
                <Typography variant="caption" color="secondary">{ refreshError }</Typography>
              }
              <Typography variant="subheading" onClick={ () => console.log('go') }>
                { domain }
              </Typography>
              <IconButton
                onClick={ () => this.refreshProject() }
                aria-label="Refresh"
              >
                <RefreshIcon />
              </IconButton>
              <IconButton onClick={ () => this.expandToggle(expanded) }>
                <ExpandMoreIcon />
              </IconButton>
            </div>
          </div>
        </ExpansionPanelSummary>

        <ExpansionPanelDetails
          className={ classes.panelDetails }
        >
          <Typography>IP: </Typography>
          <Typography>{ ip }</Typography>

        </ExpansionPanelDetails>

        <ExpansionPanelActions
          classes={{
            root: classes.actionsRoot,
            action: classes.actionsAction
          }}
        >
          <IconButton
            onClick={ () => console.log('ssdsdds') }
            aria-label="Edit" color="primary"
          >
            <EditIcon />
          </IconButton>

          <IconButton
            onClick={ () => this.deleteProject() }
            aria-label="Delete"
            color="secondary"
          >
            <DeleteIcon />
          </IconButton>
        </ExpansionPanelActions>

        {deleting &&
          <Spinner type="list-item" size={ 30 } />
        }

      </ExpansionPanel>
    )
  }
}

ProjectListItem.propTypes = {
  dispatch: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  domain: PropTypes.string.isRequired,
  ip: PropTypes.string.isRequired,
  deleting: PropTypes.bool,
  refreshing: PropTypes.bool,
  refreshError: PropTypes.string
}

ProjectListItem.defaultProps = {
  deleting: false,
  refreshing: false,
  refreshError: null
}

export default connect()(withStyles(styles)(ProjectListItem))
