import {connect} from 'react-redux';
import {getProfile, updateProfile} from '../store/actions/userActions';
import React, {Component} from 'react';
import {Button, Col, Card, CardHeader, CardBody, Form, Input, Label, Row} from 'reactstrap';

import Page from 'components/Page';

class UserPage extends Component {

  componentDidMount() {
    this.props.getProfile(this.props.match.params.id);
  }

  constructor(props) {
    super(props);

    console.log(this.props);

    this.state = {
      nombre: '',
      apellido: '',
      errors: {
        nombre: '',
        apellido: ''
      }
    }
    this.handleChange = this.handleChange.bind(this);
  }

  shouldComponentUpdate(nextProps) {
    if (this.props.selectedUser !== nextProps.selectedUser.nombre) {
      return true;
    }

    return false;

  }

  handleSubmit = event => {
    event.preventDefault();

    let errors = this.state.errors;

    switch (event.target.id) {
      case 'nombre':
        errors.nombre = 
        event.target.value.length > 0
            ? ''
            : 'El campo nombre no puede quedar vacio!';
        break;
      case 'apellido':
      errors.apellido = 
      event.target.value.length > 0
          ? ''
          : 'El campo apellido no puede quedar vacio!';
      break;
      default:
        break;
    }

    this.props.updateProfile(this.props.selectedUser);
  };

  handleChange(e) {
    this.setState({[e.target.id]: e.target.value});
  }

  render() {
    let cardTitle;
    if(this.props.selectedUser.nombre) {
      cardTitle = `# ${this.props.selectedUser.id} - ${this.props.selectedUser.nombre} ${this.props.selectedUser.apellido}`
    }
    return (
      <Page
        title='Editar Usuario'
        className="content-page"
      >
        <Row>
          <Col md={{size: 6, offset: 3}}>
            <Card>
              <CardHeader>{cardTitle}</CardHeader>
              <CardBody>
                <Form onSubmit={this.handleSubmit}>
                  <Row>
                    <Col md={6}>
                      <Label>Nombre</Label><span className='required'>*</span>
                      <Input
                        id="nombre"
                        value={this.state.nombre}
                        onChange={this.handleChange}
                      />
                    </Col>
                    <Col md={6}>
                      <Label>Apellido</Label><span className='required'>*</span>
                      <Input
                        id="apellido"
                        value={this.state.apellido}
                        onChange={this.handleChange}
                      />
                      <br />
                    </Col>
                  </Row>
                  <Label>Email</Label>
                  <Input
                    value={this.props.selectedUser.email}
                    disabled
                  />
                  <br />
                  <Label>Avatar</Label>
                  <Input type="file" name="avatar" id="exampleFile" />
                  <Row className='mt-5'>
                    <Col sm={12}>
                      <Button color="success">Guardar</Button>
                      <Button color="danger">Cancelar</Button>
                    </Col>
                  </Row>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Page>
    );
  }
}

const mapStatetoProps = (state) => {
  return {
    selectedUser: state.user.selectedUser
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getProfile: (id) => dispatch(getProfile(id)),
    updateProfile: (id) => dispatch(updateProfile(id))
  }
}

export default connect(mapStatetoProps, mapDispatchToProps)(UserPage);
