import React, { Component } from 'react';
import gql from 'graphql-tag';

import { withStyles } from 'material-ui/styles';

import { client } from '../index.js';

import Button from 'material-ui/Button';
import DeleteIcon from 'material-ui-icons/Delete';

const styles = theme => ({
  button: {
    margin: theme.spacing.unit * 2,
  },
});

class Actions extends Component {
  onClick() {
    client.mutate({
      mutation: destroyFavorite,
      variables: {
        id: this.props.id,
      },
      update: (proxy, { data: { destroyFavorite } }) => {
        const data = proxy.readQuery({ query: allFavorites });
        data.allFavorites = data.allFavorites.filter( elem => elem.id !== this.props.id );
        proxy.writeQuery({ query: allFavorites, data });
      },
    })
      .then(({ data }) => {
        const { id } = data.destroyFavorite
        if (id == null) { // This is true for null or undefined !

        } else {

        }

      }).catch((error) => {
        // TODO catch errors
      });
  }

  handleClose = (event, reason) => {
    this.setState({ open: false });
  };

  render() {
    const { classes } = this.props;
    return(
      <Button variant="fab" color="primary" aria-label="add" className={classes.button} onClick={this.onClick.bind(this)}>
        <DeleteIcon />
      </Button>
    )
  }

}
const allFavorites = gql`
  query allFavorites {
    allFavorites {
      id
      codeCIS
      denomination
    }
  }
`;
const destroyFavorite = gql`
  mutation destroyFavorite($id: ID!) {
    destroyFavorite(id: $id) {
      id
      codeCIS
      denomination
    }
  }
`;

const button = withStyles(styles)(Actions);

export default button;
