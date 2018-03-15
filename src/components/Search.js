import React, { Component } from "react";
import TextField from 'material-ui/TextField';
import { withStyles } from 'material-ui/styles';

const styles = theme => ({
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 300,
  },
});

class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = { term: ''};
  }

  render() {
    const { classes } = this.props
    return (
       <TextField
          id="search"
          label="Search for Medicine"
          type="search"
          className={classes.textField}
          value={this.state.term}
          onChange={event => this.onInputChange(event.target.value)}
          margin="normal"
        />
    )
  }

  onInputChange(term) {
    this.setState({term});
    this.props.onSearchTermChange(term);
  }
}

export default withStyles(styles)(SearchBar);
