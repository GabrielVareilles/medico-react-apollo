import React, { Component } from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

import { withRouter } from 'react-router'

import { withStyles } from 'material-ui/styles';
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';

const styles = theme => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
});

class MedicineList extends Component {

  renderMedicines() {
    return this.props.data.allMedicines.map(medicine => {
      return(
        <ListItem button key={medicine.codeCIS} onClick={() => {this.props.history.push(`/${medicine.codeCIS}`)}}>
          <ListItemText inset primary={medicine.denomination.split(' ', 2).join(' ').replace(',','')} />
        </ListItem>
      )
    });
  }

  render() {
    const { classes } = this.props;
    if (this.props.data.loading) {
      return(
        <div>Loading...</div>
      )
    }

    return(
      <div className={classes.root}>
        <List component="nav">
          {this.renderMedicines()}
        </List>
      </div>
    )
  }
}

const allMedicinesQuery = gql`
  query allMedicinesQuery($name: String!) {
    allMedicines(name: $name) {
      codeCIS
      denomination
    }
  }
`;

const ListWithQuery = graphql(allMedicinesQuery, {
  options: (ownProps) => ({
    variables: {
      name: ownProps.value
    }
  })
})(MedicineList);

export default withRouter(withStyles(styles)(ListWithQuery));
