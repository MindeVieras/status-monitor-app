
import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { withStyles } from '@material-ui/core/styles'

import Typography from '@material-ui/core/Typography'
import List from '@material-ui/core/List'

import { Spinner } from 'Common'

import ProjectListItem from './ProjectListItem'

import { projectsActions } from 'Actions'

const styles = theme => ({
  list: {
    width: `100%`,
    padding: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 9
  }
})

class ProjectsList extends Component {

  componentDidMount(){
    const { dispatch } = this.props
    dispatch(projectsActions.getList())
  }

  render() {
    const { classes, projects } = this.props

    return (
      <Fragment>

        {projects.loading &&
          <Spinner type="primary" size={ 70 } />
        }

        {projects.err &&
          <div>{projects.err}</div>
        }

        {projects.items &&
          <List
            className={ classes.list }
            disablePadding={ true }
          >
            {projects.items.map((project, i) =>
              <ProjectListItem key={ project.id } { ...project } />
            )}

            {projects.items.length === 0 &&
              <Typography variant="headline" align="center">No projects found, create one!</Typography>
            }
          </List>
        }

      </Fragment>
    )
  }
}

ProjectsList.propTypes = {
  dispatch: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  projects: PropTypes.object.isRequired
}

function mapStateToProps(state) {
  const { projects } = state
  return {
    projects: projects.list
  }
}

export default connect(mapStateToProps)(withStyles(styles)(ProjectsList))
