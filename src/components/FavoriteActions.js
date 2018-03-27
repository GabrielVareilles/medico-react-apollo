import React, { Component } from 'react';

import { client } from '../index.js';

import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';

import DeleteIcon from 'material-ui-icons/Delete';

import allFavorites from '../graphql/queries/allFavorites';
import destroyFavorite from '../graphql/mutations/destroyFavorite';

class Actions extends Component {
  onClick() {
    // Here we call mutation from the client object.
    client.mutate({
      mutation: destroyFavorite,
      variables: {
        id: this.props.id,
      },
      update: (proxy, { data: { destroyFavorite } }) => {
        const data = proxy.readQuery({ query: allFavorites });
        console.log(data);
        data.allFavorites = data.allFavorites.filter( elem => elem.id !== this.props.id );
        proxy.writeQuery({ query: allFavorites, data });
      },
    })
      .then((data) => {
        // TODO handle alerts
      })
      .catch((error) => {
        // TODO catch errors
      });
  }

  render() {
    return(
      <IconButton aria-label="Delete" onClick={this.onClick.bind(this)}>
        <DeleteIcon />
      </IconButton>
    )
  }
}

export default Actions;
