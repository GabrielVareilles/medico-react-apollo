import React, { Component } from 'react';

import NavBar from './NavBar.js';
import Detail from './Detail';
import Login from './Login';
import Home from './Home';
import FavoriteList from './FavoriteList';

// import { AUTH_TOKEN } from '../constants'

import '../styles/styles.css'

import { Switch, Route } from 'react-router-dom'
import { withStyles } from 'material-ui/styles';


const styles = theme => ({
  root: {
    backgroundColor: '#F5F5F5',
  }
});


class App extends Component {

  render() {
    const { classes } = this.props;
    return(
      <div>
        <NavBar />
        <div className={classes.root}>
          <Switch>
            <Route exact path='/login' component={Login} />
            <Route exact path="/" component={Home} />
            <Route exact path="/medicine/:codeCIS" component={Detail} />
            <Route exact path="/favorites" component={FavoriteList}/>
          </Switch>
        </div>
      </div>
    )
  }
}

export default withStyles(styles)(App);
