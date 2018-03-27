import React, { Component} from 'react';
import { graphql } from 'react-apollo';

import { withStyles } from 'material-ui/styles';
import Card from './FavoriteCard'

import allFavorites from '../graphql/queries/allFavorites'

const styles = theme => ({
  container: {
    flexWrap: 'wrap',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    height: '100vh'
  },
});

class FavoriteList extends Component {
  renderFavorites() {
    return this.props.data.allFavorites.map(favorite => {
      return(
        <Card key={favorite.id} favorite={favorite} />
      )
    });
  }

  render() {
    const { classes } = this.props;

    if (this.props.data.loading) {
      return <div></div>
    }
    return(
      <div className={classes.container}>
        {this.renderFavorites()}
      </div>
    )
  }
}

const ListWithQuery = graphql(allFavorites)(FavoriteList);
const ListWithStyles = withStyles(styles)(ListWithQuery)

export default ListWithStyles;
