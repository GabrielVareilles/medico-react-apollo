import React, { Component } from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import { withRouter } from 'react-router'

import { withStyles } from 'material-ui/styles';
import List, { ListItem, ListItemText } from 'material-ui/List';
import Divider from 'material-ui/Divider';

const styles = theme => ({
  container: {
    backgroundColor: theme.palette.background.paper,
  },
});

class MedicineList extends Component {

  renderMedicines() {
    return this.props.data.allMedicines.map(medicine => {
      return(
        <div key={medicine.codeCIS}>
          <ListItem button onClick={() => {this.props.history.push(`/medicine/${medicine.codeCIS}`)}}>
            <ListItemText inset primary={medicine.denomination.split(' ', 2).join(' ').replace(',','')} />
          </ListItem>
          <Divider />
        </div>
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
      <div className={classes.container}>
        <List component="nav">
          {this.renderMedicines()}
        </List>
      </div>
    )
  }
}

const allMedicinesQuery = gql`
  query allMedicinesQuery($term: String!) {
    allMedicines(term: $term) {
      codeCIS
      denomination
    }
  }
`;

const ListWithQuery = graphql(allMedicinesQuery, {
  options: (ownProps) => ({
    variables: {
      term: ownProps.value
    }
  })
})(MedicineList);

const ListWithStyle = withStyles(styles)(ListWithQuery)

export default withRouter(ListWithStyle);
