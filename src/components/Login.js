import React, { Component } from 'react'
import { AUTH_TOKEN, EMAIL } from '../constants'

import gql from 'graphql-tag';
import { graphql, compose } from 'react-apollo';

import { withStyles } from 'material-ui/styles';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';

import Typography from 'material-ui/Typography';

const styles = theme => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    height: '100vh',
  },
  textField2: {
    width: 300,
    margin: theme.spacing.unit,
    marginTop: theme.spacing.unit * 5,
  },
  textField: {
    width: 300,
    margin: theme.spacing.unit,
  },
  button: {
    width: 300,
    margin: theme.spacing.unit * 5,
  },
  link: {
    width: 300,
    margin: theme.spacing.unit,
  },
});

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      login: true, // switch between Login and SignUp
      email: '',
      password: '',
      password_confirmation: '',
      message: '',
      emailError: false,
      emailLabel: '',
      passwordsError: false,
      passwordsLabel: '',
    }
  }
  render() {
    const { classes } = this.props

    return(
      <form className={classes.container} >
        <TextField
          id="email"
          label={`Email ${this.state.emailLabel}`}
          className={classes.textField2}
          value={this.state.email.value}
          onChange={ event => {
            this.setState({ email: event.target.value });
          }}
          onFocus={() => this._clearValidations()}
          margin="normal"
          error={this.state.emailError}
        />
        <TextField
          id="password"
          label={`Password ${this.state.passwordsLabel}`}
          type="password"
          className={classes.textField}
          value={this.state.password.value}
          onChange={event => this.setState({ password: event.target.value })}
          margin="normal"
          error={this.state.passwordsError}
        />

        {!this.state.login && (
          <TextField
            id="password_confirmation"
            label="Password Confirmation"
            className={classes.textField}
            type="password"
            value={this.state.password_confirmation.value}
            onChange={event => this.setState({ password_confirmation: event.target.value })}
            onFocus={() => this._clearValidations()}
            margin="normal"
            error={this.state.passwordsError}
          />
        )}
        <Typography variant="caption" gutterBottom align="center">
          {this.state.message}
        </Typography>
        <Button size="medium" type='submit' variant="raised" color="primary" className={classes.button} onClick={(event) => this._confirm(event)}>
          {this.state.login ? 'login' : 'create account'}
        </Button>
        <Button size="small" className={classes.link} onClick={() => this._switch()}>
          {this.state.login
            ? 'need to create an account?'
            : 'already have an account?'}
        </Button>
      </form>
    )
  }

  _switch = () => {
    this.setState({ login: !this.state.login });
    this._clearValidations();
  }

  _clearValidations = () => {
    this.setState({
      emailError: false,
      emailLabel: '',
      passwordsError: false,
      message: '',
    })
  }

  _invalidEmail = (message) => {
    this.setState({ emailError: true, emailLabel: message});
  }

  _invalidPasswords = (message) => {
    this.setState({ passwordsError: true, passwordsLabel: message});
  }

  _validateEmail = (email) => {
    var re = /^([A-Za-z0-9_\-.])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,4})$/;
    return re.test(String(email).toLowerCase());
  }

  _confirm = async (event) => {
    event.preventDefault();
    const { email, password, password_confirmation } = this.state

    if (this.state.login) {

      // ******** Email and password validation *********
      if (email === '') {
        document.getElementById('email').focus();
        return
      }
      const valid = this._validateEmail(email);

      if (!valid) {
        this._invalidEmail("Must be valid format")
        return
      }

      if (password === '') {
        document.getElementById('password').focus();
        return
      }

      // ************************************************
      const result = await this.props.loginMutation({
        variables: {
          email,
          password,
        },
      })

      const { token, user } = result.data.signIn;

      if (token) {
        this._saveUserToken(token);
        this._saveUserEmail(user.email);
        this.props.history.goBack();
      } else {
        this.setState({
          emailError: true,
          passwordsError: true,
        });
      }

    } else {

      // ******** Email and password validation *********
      if (email === '') {
        document.getElementById('email').focus();
        return
      }
      const valid = this._validateEmail(email);

      if (!valid) {
        this._invalidEmail("Must be valid format");
        return
      }

      if (password === '') {
        document.getElementById('password').focus();
        return
      }

      if (password.length < 6) {
        this._invalidPasswords("Must be more than 6 characters");
        return
      }

      if (password_confirmation === '') {
        document.getElementById('password_confirmation').focus();
        return
      }

      if (password !== password_confirmation) {
        this._invalidPasswords("and Confirmation must be equal !");
        return
      }

      // ************************************************

      const result = await this.props.signupMutation({
        variables: {
          email,
          password,
          password_confirmation,
        },
      })

      const { token, message } = result.data.signup;
      if (token) {
        this._saveTokenData(token);
        this.props.history.push(`/`);
      } else {
        this.setState({
          message
        })
      }
    }
  }

  _saveUserEmail = email => {
    localStorage.setItem(EMAIL, email)
  }

  _saveUserToken = token => {
    localStorage.setItem(AUTH_TOKEN, token)
  }
}

const SIGN_UP_MUTATION = gql`
  mutation SignUpMutation($email: String!, $password: String!, $password_confirmation: String!) {
    signup(email: {
      email: $email
      password: $password
      password_confirmation: $password_confirmation
    }) {
      token
      message
    }
  }
`

const SIGN_IN_MUTATION = gql`
  mutation SignInMutation($email: String!, $password: String!) {
    signIn(input: {
      email: $email
      password: $password
    }) {
      token
      user {
        email
      }
    }
  }
`

export default compose(
  graphql(SIGN_UP_MUTATION, { name: 'signupMutation' }),
  graphql(SIGN_IN_MUTATION, { name: 'loginMutation' }),
)(withStyles(styles)(Login))
