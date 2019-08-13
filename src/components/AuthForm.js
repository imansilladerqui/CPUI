import {Button, Form, FormGroup, Input, Label, UncontrolledAlert} from 'reactstrap';
import {connect} from 'react-redux';
import {loginUser, clearState, signUp} from '../store/actions/authActions';
import logocp from 'assets/img/logo/cplogo.svg';
import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';


class AuthForm extends Component {

  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      confirmarPassword: '',
      errors: {
        email: '',
        emailCambioPosadas: '',
        password: '',
        confirmarPassword: ''
      }
    }
  }

  get isLogin() {
    return this.props.authState === STATE_LOGIN;
  }

  get isSignup() {
    return this.props.authState === STATE_SIGNUP;
  }

  changeAuthState = authState => event => {
    event.preventDefault();
    this.props.clearState();
    this.props.onChangeAuthState(authState);
  };

  handleChange = (e)=> {
    const validEmailRegex = 
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    this.setState({
      [e.target.id]: e.target.value
    });

    let errors = this.state.errors;

    if(this.props.authState === STATE_SIGNUP) {
      switch (e.target.id) {
        case 'email':
          let emailCambioPosadas = e.target.value.split('@');
          errors.email = 
          validEmailRegex.test(e.target.value)
              ? ''
              : 'Email no es valido!';

          errors.emailCambioPosadas = 
          emailCambioPosadas[1] === 'cambioposadas.com.ar' 
              ? ''
              : 'Este no es un mail de Cambio Posadas';
          break;
        case 'password': 
          errors.password = 
            e.target.value.length < 8
              ? 'La contraseña debe tener al menos 8 caracteres'
              : '';
          break;
        case 'confirmarPassword':
          errors.confirmarPassword = 
            (e.target.value !== this.state.password)
              ? 'No coinciden las contraseñas'
              : '';
          break;
        default:
          break;
      }

      this.setState({errors, [e.target.id]: e.target.value});
    }
  }

  handleSubmit = event => {
    event.preventDefault();

    let errors = this.state.errors;

    if(this.props.authState === STATE_SIGNUP) {
      switch (event.target.id) {
        case 'email':
          errors.email = 
          event.target.value.length > 0
              ? ''
              : 'El campo email no puede quedar vacio!';
          break;
        case 'password': 
          errors.password = 
          event.target.value.length > 0
              ? ''
              : 'El campo contraseña no puede quedar vacio!';
          break;
        default:
          break;
      }
      this.props.signUp(this.state);
    };

    if(this.props.authState === STATE_LOGIN) {
      this.props.signIn(this.state);
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
    let loginError, showPreloader, tokenExpired;

    if(this.props.tokenExpired) {
      tokenExpired = (<UncontrolledAlert color="secondary"> 
        Tu sesión se venció, ingresa nuevamente.
      </UncontrolledAlert>)
    }

    if(this.props.successLogin && !this.props.tokenExpired) {
      return <Redirect to="/dashboard" />
    }

    if(this.props.authState === STATE_SIGNUP) {
      loginError = (<UncontrolledAlert color="secondary"> 
        Solo empleados de CAMBIO POSADAS pueden registrarse.
      </UncontrolledAlert>);
  }

    if(this.props.showError) {
        loginError = (<UncontrolledAlert color="secondary"> 
         Email y/o contraseña incorrecta! 
        </UncontrolledAlert>);
    }

    const {
      showLogo,
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
        {showPreloader}
        {loginError}
        {tokenExpired}
        <FormGroup>
          <Label>Email</Label>
          <Input
            className={(this.state.email && !this.state.errors.email && !this.state.errors.emailCambioPosadas &&this.props.authState === STATE_SIGNUP) ? "is-valid form-control" : ""}
            type="email"
            placeholder="email"
            id="email"
            onChange={this.handleChange}/>
          <div className='info'>
            <small className="text-danger">{this.state.errors.email}</small>
          </div>
          <div className='info'>
            <small className="text-danger">{this.state.errors.emailCambioPosadas}</small>
          </div>
        </FormGroup>
        <FormGroup>
          <Label>Contraseña</Label>
          <Input
            className={(this.state.password && !this.state.errors.password && this.props.authState === STATE_SIGNUP) ? "is-valid form-control" : ""} 
            type="password"
            placeholder="contraseña"
            id="password"
            onChange={this.handleChange}/>
          <div className='info'>
            <small className="text-danger">{this.state.errors.password}</small>
          </div>
        </FormGroup>
        {this.isSignup && (
          <FormGroup>
            <Label>Confirmar Contraseña</Label>
            <Input
              className={(!this.state.errors.confirmarPassword && this.state.confirmarPassword && this.props.authState === STATE_SIGNUP) ? "is-valid form-control" : ""}
              type="password"
              placeholder="Confirmar contraseña"
              id="confirmarPassword"
              onChange={this.handleChange}/>
            <div className='info'>
              <small className="text-danger">{this.state.errors.confirmarPassword}</small>
            </div>
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
  onLogoClick: PropTypes.func,
};

AuthForm.defaultProps = {
  authState: 'LOGIN',
  showLogo: true,
  onLogoClick: () => {},
};

const mapStateToProps = (state) => {
  return {
    showError: state.auth.showError,
    successLogin: state.auth.successLogin,
    showPreloader: state.auth.showPreloader,
    tokenExpired: state.dashboard.tokenExpired
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    signIn: (creds) => dispatch(loginUser(creds)),
    clearState: () => dispatch(clearState()),
    signUp: (creds) => dispatch(signUp(creds))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthForm);
