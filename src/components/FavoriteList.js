import React, { Component} from 'react';

import { withStyles } from 'material-ui/styles';
import { withRouter } from 'react-router'

import Card, { CardActions, CardContent } from 'material-ui/Card';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import Actions from './FavoriteActions';

import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

const styles = theme => ({
  container: {
    flexWrap: 'wrap',
    display: 'flex',
    justifyContent: 'center',
    height: '100vh'
  },
  card: {
    width: 350,
    height: 160,
    margin: 5,
    borderRadius: theme.spacing.unit / 4,
    marginTop: theme.spacing.unit * 2,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    marginBottom: 16,
    fontSize: 14,
    color: theme.palette.text.secondary,
  },
  pos: {
    marginBottom: 12,
    color: theme.palette.text.secondary,
  },
});

class FavoriteList extends Component {
  renderFavorites() {
    const { classes } = this.props;

    return this.props.data.allFavorites.map(favorite => {
      return(
        <Card className={classes.card} key={favorite.id}>
          <CardContent>
            <Typography variant="headline" component="h3">
              {favorite.denomination.split(' ', 2).join(' ').replace(',','')}
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small" onClick={() => {this.props.history.push(`/medicine/${favorite.codeCIS}`)}}>Detail</Button>
            <Actions id={favorite.id} />
          </CardActions>
        </Card>
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


const allFavorites = gql`
  query allFavorites {
    allFavorites {
      id
      codeCIS
      denomination
    }
  }
`;

const ListWithQuery = graphql(allFavorites)(withRouter(withStyles(styles)(FavoriteList)));

export default ListWithQuery;
