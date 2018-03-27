import React, { Component } from 'react';

import { client } from '../index';

import Button from 'material-ui/Button';
import AddIcon from 'material-ui-icons/Add';

import Alert from './Alert';

import createFavorite from '../graphql/mutations/createFavorite';
import allFavorites from '../graphql/queries/allFavorites';

class Actions extends Component {
  constructor(props) {
    super(props);
    this.state = { alert: false, message: null }
  }

  onClick() {
    // TODO HACK read store before mutation
    const medicine = this.props.medicine;
    client.mutate({
      mutation: createFavorite,
      variables: {
        codeCIS: medicine.codeCIS,
        denomination: medicine.denomination,
      },
      update: (proxy, { data: { createFavorite } }) => {
        const data = proxy.readQuery({ query: allFavorites });
        const { id } = createFavorite;
        if (id != null) {
          data.allFavorites.push(createFavorite);
          proxy.writeQuery({ query: allFavorites, data });
        };
      },
    })
      .then(({ data: { createFavorite }}) => {
        if (createFavorite.id == null) {
          this.setState({alert: true, message: 'Déjà dans vos favoris !'})
        } else {
          this.setState({alert: true, message: `${medicine.denomination.split(' ', 2).join(' ').replace(',','')} ajouté à vos favoris !`})
        }
      })
      .catch((error) => {
        // TODO catch errors

      });
  }

  render() {
    return(
      <div style={{position: 'absolute', bottom: 15, right: 15}}>
        <Button variant="fab" color="primary" aria-label="add" onClick={this.onClick.bind(this)}>
          <AddIcon />
        </Button>
        <Alert open={this.state.alert} message={this.state.message} handleClose={() => this.setState({alert: false})} />
      </div>
    )
  }

}

export default Actions;
