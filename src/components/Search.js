import React, { Component } from "react";
import Input from 'material-ui/Input';
import { FormControl } from 'material-ui/Form';
import { withStyles } from 'material-ui/styles';

const styles = theme => ({
  input: {
    margin: theme.spacing.unit * 5,
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
      <FormControl fullWidth>
        <Input placeholder="Votre recherche..."
          className={classes.input}
          value={this.state.term}
          onChange={event => this.onInputChange(event.target.value)} />
      </FormControl>
    )
  }

  onInputChange(term) {
    this.setState({term});
    this.props.onSearchTermChange(term);
  }
}

export default withStyles(styles)(SearchBar);
