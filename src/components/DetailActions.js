import React, { Component } from 'react';
import gql from 'graphql-tag';

import { withStyles } from 'material-ui/styles';

import { client } from '../index.js';

import Button from 'material-ui/Button';
import AddIcon from 'material-ui-icons/Add';
import Snackbar from 'material-ui/Snackbar';

const styles = theme => ({
  button: {
    margin: theme.spacing.unit * 2,
    position: 'absolute',
    right: theme.spacing.unit *2,
    bottom: theme.spacing.unit *2,
  },
});

class Actions extends Component {
  constructor(props) {
    super(props);
    this.state = { added: null, open: false, message: null }
  }

  onClick() {
    // TODO HACK read store before mutation
    client.mutate({
      mutation: createFavorite,
      variables: {
        codeCIS: this.props.medicine.codeCIS,
        denomination: this.props.medicine.denomination,
      },
      update: (proxy, { data: { createFavorite } }) => {
        const data = proxy.readQuery({ query: allFavorites });
        //
        const { id } = createFavorite;
        if (id == null) {
          this.setState({
            added: true,
            open: true,
            message: 'Déjà dans vos favoris !',
          })
        } else {
          data.allFavorites.push(createFavorite);
          proxy.writeQuery({ query: allFavorites, data });
          this.setState({
            added: true,
            open: true,
            message: 'Favoris ajouté !',
          });
        }
      },
    })
      .catch((error) => {
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
        <AddIcon />
        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          open={this.state.open}
          autoHideDuration={2000}
          onClose={this.handleClose}
          SnackbarContentProps={{
            'aria-describedby': 'message-id',
          }}
          message={<span id="message-id">{this.state.message}</span>}
        />
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
const createFavorite = gql`
  mutation createFavorite($codeCIS: String!, $denomination: String!) {
    createFavorite(codeCIS: $codeCIS, denomination: $denomination) {
      id
      codeCIS
      denomination
    }
  }
`;

const button = withStyles(styles)(Actions);

export default button;
