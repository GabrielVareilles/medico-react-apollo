import React, { Component } from 'react'

import { withRouter } from 'react-router';
import { withStyles } from 'material-ui/styles';

import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import StarIcon from 'material-ui-icons/Star';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui-icons/Menu';
import Drawer from 'material-ui/Drawer';

import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import ReportProblemIcon from 'material-ui-icons/ReportProblem';
import SearchIcon from 'material-ui-icons/Search';

import { AUTH_TOKEN, EMAIL } from '../constants'
const styles = theme => ({
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
  margin: {
    marginRight: theme.spacing.unit * 3,
    cursor: 'pointer',
  },
});

class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      left: false,
    };
  }
  toggleDrawer = (side, open) => () => {
    this.setState({
      [side]: open,
    });
  };

  render() {
    const { classes } = this.props;
    const token = localStorage.getItem(AUTH_TOKEN);

    return (
      <div className={classes.root}>
        <AppBar position="sticky">
          <Toolbar>
            {token &&
              <IconButton className={classes.menuButton} onClick={this.toggleDrawer('left', true)} color="inherit" aria-label="Menu">
                <MenuIcon />
              </IconButton>
            }
            <Typography
              className={classes.flex}
              color="inherit"
              onClick={() => {
                this.props.history.push('/');
              }}
            >
              MEDICO
            </Typography>
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
          <Drawer open={this.state.left} onClose={this.toggleDrawer('left', false)}>
            <div
              tabIndex={0}
              role="button"
              onClick={this.toggleDrawer('left', false)}
              onKeyDown={this.toggleDrawer('left', false)}
            >
              <List component="nav">
                <ListItem button onClick={() => this.props.history.push('/')}>
                  <ListItemIcon>
                    <SearchIcon />
                  </ListItemIcon>
                  <ListItemText primary="Search" />
                </ListItem>
              </List>
              <Divider />
              <List component="nav">
                <ListItem button onClick={() => this.props.history.push(`/favorites`)}>
                  <ListItemIcon>
                    <StarIcon />
                  </ListItemIcon>
                  <ListItemText primary="Favorites" />
                </ListItem>
                <ListItem button onClick={() => this.props.history.push(`/interactions`)}>
                  <ListItemIcon>
                    <ReportProblemIcon />
                  </ListItemIcon>
                  <ListItemText primary="Interactions" />
                </ListItem>
              </List>
            </div>
          </Drawer>
        </AppBar>
      </div>
    );
  }
}

export default withRouter(withStyles(styles)(NavBar));
