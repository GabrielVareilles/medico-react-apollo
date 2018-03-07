import React, { Component } from 'react';
import '../styles/App.css';

import Search from './Search.js';
import AppBar from './AppBar.js';
import List from './List.js';
import Detail from './Detail';
import Login from './Login';

import _ from 'lodash';

import { withStyles } from 'material-ui/styles';
import Paper from 'material-ui/Paper';
import Grid from 'material-ui/Grid';

import { Switch, Route } from 'react-router-dom'

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
    marginLeft: theme.spacing.unit * 2,
    marginRight: theme.spacing.unit * 2,
    marginTop:  theme.spacing.unit,
  },
});

class App extends Component {
  render() {
    return(
      <div>
        <AppBar />
        <Switch>
          <Route exact path="/login" component={Login} />
          <Route exact path="/" component={withStyles(styles)(Home)} />
          <Route exact path="/:codeCIS" component={Detail} />
        </Switch>
      </div>
    )
  }
}

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      term: '',
      selectedMedicine: null,
    };
  }

  medicineSearch(term) {
    this.setState({term});
  }

  render() {
    const { classes } = this.props
    const medicineSearch = _.debounce((term) => { this.medicineSearch(term) }, 300);

    return (
      <div className={classes.root}>
        <Grid container spacing={24}>
          <Grid item xs={12}>
            <Paper className={classes.paper}>
              <Search onSearchTermChange={medicineSearch}/>
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <Paper className={classes.paper}>
              <List
                value={this.state.term}
              />
            </Paper>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default App;
