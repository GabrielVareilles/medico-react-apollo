import React, { Component } from 'react';
import { graphql } from 'react-apollo';

import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import Paper from 'material-ui/Paper';
import SyncProblemIcon from 'material-ui-icons/SyncProblem';

import interactions from '../graphql/queries/interactions'

const styles = theme => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  paper: {
    width: '70%',
    margin: theme.spacing.unit,
    padding: theme.spacing.unit,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  flex: {
    display: 'flex',
    justifyContent: 'center',
  },
  icon: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  }
});

class Interactions extends Component {
  renderInteractions() {
    const { classes} = this.props

    return this.props.data.interactions.map(int => {
      return(
        <Paper className={classes.paper}>
          <div className={classes.flex}>
            <Typography variant="subheading" gutterBottom>{int.nomMedicament1.split(' ', 2).join(' ').replace(',','')}</Typography>
            <SyncProblemIcon className={classes.icon}/>
            <Typography variant="subheading" gutterBottom>{int.nomMedicament2.split(' ', 2).join(' ').replace(',','')}</Typography>
          </div>
          <Typography variant="subheading" gutterBottom>{int.description}</Typography>
          <Typography variant="subheading" gutterBottom>{int.type}</Typography>
          <Typography variant="subheading" gutterBottom>{int.conseil}</Typography>
        </Paper>
      )
    })
  }

  render() {
    const { classes} = this.props

    if (this.props.data.loading) {
      return(
        <div>Loading..</div>
      )
    }
    return(
      <div className={classes.container}>
        {this.renderInteractions()}
      </div>
    )
  }
}

export default graphql(interactions)(withStyles(styles)(Interactions));
