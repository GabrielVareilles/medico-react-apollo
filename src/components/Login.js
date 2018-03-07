import React, { Component } from 'react'
import { AUTH_TOKEN } from '../constants'

import gql from 'graphql-tag';
import { graphql, compose } from 'react-apollo';

import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import MenuItem from 'material-ui/Menu/MenuItem';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';

import Paper from 'material-ui/Paper';
import Grid from 'material-ui/Grid';

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },
  button: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },
  paper: {
    padding: theme.spacing.unit * 4,
    textAlign: 'center',
    color: theme.palette.text.secondary,
    marginTop: theme.spacing.unit,
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    height: '77vh',
  },
  menu: {
    width: 200,
  },
});

class Login extends Component {
  state = {
    login: true, // switch between Login and SignUp
    email: '',
    password: '',
    password_confirmation: '',
  }
  render() {
    const { classes } = this.props
    return(
      <Paper className={classes.paper}>
        <form className={classes.container} noValidate autoComplete="off">
          <TextField
            id="email"
            label="Email"
            className={classes.textField}
            value={this.state.email}
            onChange={e => this.setState({ email: e.target.value })}
            margin="normal"
          />
          <TextField
            id="password"
            label="Password"
            // type="password"
            className={classes.textField}
            value={this.state.password}
            onChange={e => this.setState({ password: e.target.value })}
            margin="normal"
          />
          {!this.state.login && (
            <TextField
              id="password_confirmation"
              label="Password confirmation"
              className={classes.textField}
              // type="password"
              value={this.state.password_confirmation}
              onChange={e => this.setState({ password_confirmation: e.target.value })}
              margin="normal"
            />
          )}
          <Button size="small" color="primary" className={classes.button} onClick={() => this._confirm()}>
            {this.state.login ? 'login' : 'create account'}
          </Button>
        </form>
        <Button size="small" className={classes.button} onClick={() => this.setState({ login: !this.state.login })}>
          {this.state.login
            ? 'need to create an account?'
            : 'already have an account?'}
        </Button>
      </Paper>
    )
  }

  _confirm = async () => {
    const { email, password, password_confirmation } = this.state
    if (this.state.login) {
      const result = await this.props.loginMutation({
        variables: {
          email,
          password,
        },
      })

      const { token } = result.data.login
      this._saveUserData(token)

    } else {
      const result = await this.props.signupMutation({
        variables: {
          email,
          password,
          password_confirmation,
        },
      })

      const { token } = result.data.signup
      this._saveUserData(token)

    }
    this.props.history.push(`/`)
  }

  _saveUserData = token => {
    localStorage.setItem(AUTH_TOKEN, token)
  }
}

const SIGNUP_MUTATION = gql`
  mutation SignUpMutation($email: String!, $password: String!, $password_confirmation: String!) {
    signup(email: {
      email: $email
      password: $password
      password_confirmation: $password_confirmation
    }) {
      token
    }
  }
`

const LOGIN_MUTATION = gql`
  mutation LoginMutation($email: String!, $password: String!) {
    login(email: {
      email: $email
      password: $password
    }) {
      token
    }
  }
`

export default compose(
  graphql(SIGNUP_MUTATION, { name: 'signupMutation' }),
  graphql(LOGIN_MUTATION, { name: 'loginMutation' }),
)(withStyles(styles)(Login))
