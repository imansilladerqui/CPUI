import logocp from 'assets/img/logo/cplogo.svg';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router';
import React, {Component} from 'react';
import { Button, Form, FormGroup, Input, Label } from 'reactstrap';

const Request = require('superagent');

class AuthForm extends Component {

  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      confirmarPassword: ''
    }

    this.login = this.login.bind(this);
    this.register = this.register.bind(this);
  }

  get isLogin() {
    return this.props.authState === STATE_LOGIN;
  }

  get isSignup() {
    return this.props.authState === STATE_SIGNUP;
  }

  changeAuthState = authState => event => {
    event.preventDefault();

    this.props.onChangeAuthState(authState);
  };

  login() {
    return Request
    .post('https://protected-mountain-77919.herokuapp.com/api/login')
    .set('Content-Type', 'application/x-www-form-urlencoded')
    .send({email: this.state.email, password: this.state.password })
    .then(res=>{
      this.props.history.push('/dashboard');
    })
    .catch(err=>{
    })
  }

  register() {
    return Request
    .post('https://protected-mountain-77919.herokuapp.com/api/signup')
    .set('Content-Type', 'application/x-www-form-urlencoded')
    .send({email: this.state.email, password: this.state.password })
    .then(res=>{
      this.login();
    })
    .catch(err=>{
    })
  }

  handleChange = (e)=> {
    this.setState({
      [e.target.id]: e.target.value
    }); 
  }

  handleSubmit = event => {
    event.preventDefault();



    if(this.props.authState === STATE_SIGNUP && this.state.password === this.state.confirmarPassword) {
      this.register();
    };

    if(this.props.authState === STATE_LOGIN) {
      this.login();
    };
  }; 

  renderButtonText() {
    const { buttonText } = this.props;

    if (!buttonText && this.isLogin) {
      return 'Iniciar sesión';
    }

    if (!buttonText && this.isSignup) {
      return 'Registrarse';
    }

    return buttonText;
  }

  render() {
    const {
      showLogo,
      emailLabel,
      passwordLabel,
      confirmPasswordLabel,
      children,
      onLogoClick,
    } = this.props;

    return (
      <Form onSubmit={this.handleSubmit} className="col-md-12">
        {showLogo && (
          <div className="text-center pb-4">
            <img
              src={logocp}
              className="rounded"
              style={{cursor: 'pointer' }}
              alt="logo"
              onClick={onLogoClick}
            />
          </div>
        )}
        <FormGroup>
          <Label for={emailLabel}>{emailLabel}</Label>
          <Input
            type="email"
            placeholder="email"
            id="email"
            onChange={this.handleChange}/>
        </FormGroup>
        <FormGroup>
          <Label for={passwordLabel}>{passwordLabel}</Label>
          <Input 
            type="password"
            placeholder="contraseña"
            id="password"
            onChange={this.handleChange}/>
        </FormGroup>
        {this.isSignup && (
          <FormGroup>
            <Label for={confirmPasswordLabel}>{confirmPasswordLabel}</Label>
            <Input
              type="password"
              placeholder="Confirmar contraseña"
              id="confirmarPassword"
              onChange={this.handleChange}/>
          </FormGroup>
        )}
        <Button
          size="lg"
          className="bg-gradient-theme-left border-0 mt-5"
          block
          onClick={this.handleSubmit}>
          {this.renderButtonText()}
        </Button>

        <div className="text-center pt-3">
          <h6>
            {this.isSignup ? (
              <a href="#login" onClick={this.changeAuthState(STATE_LOGIN)}>
                Iniciar sesión
              </a>
            ) : (
              <a href="#signup" onClick={this.changeAuthState(STATE_SIGNUP)}>
                Registrarse
              </a>
            )}
          </h6>
        </div>

        {children}
      </Form>
    );
  }
}

export const STATE_LOGIN = 'LOGIN';
export const STATE_SIGNUP = 'SIGNUP';

AuthForm.propTypes = {
  authState: PropTypes.oneOf([STATE_LOGIN, STATE_SIGNUP]).isRequired,
  showLogo: PropTypes.bool,
  emailLabel: PropTypes.string,
  passwordLabel: PropTypes.string,
  confirmPasswordLabel: PropTypes.string,
  onLogoClick: PropTypes.func,
};

AuthForm.defaultProps = {
  authState: 'LOGIN',
  showLogo: true,
  emailLabel: 'Email',
  passwordLabel: 'Contraseña',
  confirmPasswordLabel: 'Confirmar Contraseña',
  onLogoClick: () => {},
};

export default withRouter(AuthForm);
