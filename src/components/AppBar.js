import React, { Component } from 'react'

import { Link } from 'react-router-dom'
import { withRouter } from 'react-router'

import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';

import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui-icons/Menu';

import { AUTH_TOKEN } from '../constants'

const styles = {
  root: {
    flexGrow: 1,
  },
  flex: {
    flex: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
};

class ButtonAppBar extends Component {
  render() {
    const { classes } = this.props;
    const authToken = localStorage.getItem(AUTH_TOKEN)
    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
              <MenuIcon />
            </IconButton>
            <Typography variant="title" color="inherit" className={classes.flex} onClick={() => {this.props.history.push(`/`)}}>
              Medico
            </Typography>
            {authToken ? (
              <Button
                color="inherit"
                onClick={() => {
                  localStorage.removeItem(AUTH_TOKEN)
                  this.props.history.push(`/`)
                }}
              >
                Logout
              </Button>
            ) : (
              <Button color="inherit" href='/login' component='a'>Login</Button>
            )}
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}


export default withRouter(withStyles(styles)(ButtonAppBar));
