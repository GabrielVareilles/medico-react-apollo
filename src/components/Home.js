import React, { Component } from 'react';
import _ from 'lodash';

import { withStyles } from 'material-ui/styles';

import Search from './Search.js';
import List from './List.js';

const styles = theme => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  search: {
    marginTop: theme.spacing.unit * 6,
    marginBottom: theme.spacing.unit * 6,
  },
  results: {
    width: '70%',
  },
});

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
      <div className={classes.container}>
        <div className={classes.search}>
          <Search onSearchTermChange={medicineSearch}/>
        </div>
        <div className={classes.results}>
          <List value={this.state.term}/>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(Home);
