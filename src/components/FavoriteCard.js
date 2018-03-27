import React, { Component} from 'react';
import { client } from '../index.js';

import { withStyles } from 'material-ui/styles';
import { withRouter } from 'react-router'
import Paper from 'material-ui/Paper';
import { FormControlLabel, FormGroup } from 'material-ui/Form';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import Switch from 'material-ui/Switch';

import Actions from './FavoriteActions';

import favoriteStatus from '../graphql/mutations/favoriteStatus';
import allFavorites from '../graphql/queries/allFavorites';

// import gql from 'graphql-tag';

const styles = theme => ({
  card: {
    borderRadius: theme.spacing.unit / 2,
    margin: theme.spacing.unit / 2,
    padding: theme.spacing.unit /2,
    width: '80%',
    display: 'flex',
    justifyContent: 'space-between'
  },
  flex: {
    width: '70%',
    display: 'flex',
    justifyContent: 'space-between'
  },
  flex2: {
    display: 'flex',
    justifyContent: 'flex-end'
  }
});


class FavoriteCard extends Component {

  handleChange = () => {
    // Call favoriteStatus mutation
    const { id, status } = this.props.favorite;

    client.mutate({
      mutation: favoriteStatus,
      variables: {
        id: id,
      },
      update: (proxy) => {
        // TODO de type pas compris le fragment matching
        // const favorite = client.writeFragment({
        //   id: `Favorite_${id}`,
        //   fragment: gql`
        //     fragment favorite on allFavorites {
        //       status
        //     }
        //   `,
        //   data: {
        //     status: (status === 'active') ? 'active' : 'archived',
        //     __typename: 'Favorite',
        //   }
        // });

        const data = proxy.readQuery({ query: allFavorites });
        const favIndex = data.allFavorites.findIndex((obj => obj.id === id));
        data.allFavorites[favIndex].status = (status === 'archived') ? 'active' : 'archived';
        proxy.writeQuery({ query: allFavorites, data });
      },
    })
  };

  render() {
    const { classes, favorite: { id, denomination, codeCIS, status } } = this.props;
    const shortName = denomination.split(' ', 2).join(' ').replace(',','')

    return(
      <div className={classes.flex}>
        <Paper className={classes.card} key={id}>
          <Button size="small" onClick={() => {this.props.history.push(`/medicine/${codeCIS}`)}}>
            {shortName}
          </Button>
          <div className={classes.flex2}>
            <FormGroup>
              <FormControlLabel
                control={
                  <Switch checked={status === 'active'} onChange={this.handleChange} aria-label="StatusSwitch" color="primary" />
                }
              />
            </FormGroup>
            <Actions id={id} />
          </div>
        </Paper>
      </div>
    )
  }
}

export default withRouter((withStyles(styles)(FavoriteCard)))
