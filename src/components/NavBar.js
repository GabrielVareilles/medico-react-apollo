import React, { Component } from 'react'

import { withRouter } from 'react-router';
import { withStyles } from 'material-ui/styles';

import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import StarIcon from 'material-ui-icons/Star';

import { AUTH_TOKEN, EMAIL } from '../constants'

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  flex: {
    flex: 1,
    cursor: 'pointer',
  },
  margin: {
    marginRight: theme.spacing.unit * 3,
    cursor: 'pointer',
  },
});

class NavBar extends Component {

  render() {
    const { classes } = this.props;
    const token = localStorage.getItem(AUTH_TOKEN);

    return (
      <AppBar position="sticky">
        <Toolbar>
          <Typography variant="title" color="inherit" className={classes.flex} onClick={() => {this.props.history.push(`/`)}}>
            RAD
          </Typography>
          {token &&
            <StarIcon color="inherit" onClick={() => this.props.history.push(`/favorites`)} />
          }
          {token ? (
            <Button
              color="inherit"
              onClick={() => {
                localStorage.removeItem(AUTH_TOKEN);
                localStorage.removeItem(EMAIL);
                this.props.history.push(`/`);
              }}
            >
              Logout
            </Button>
          ) : (
            <Button color="inherit" href='/login' component='a'>Login</Button>
          )}
        </Toolbar>
      </AppBar>
    );
  }
}

export default withRouter(withStyles(styles)(NavBar));
