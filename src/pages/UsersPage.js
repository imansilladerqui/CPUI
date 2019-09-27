import {connect} from 'react-redux';
import DatatablePage from '../pages/TablePage';
import {MDBBtn} from 'mdbreact';
import {deleteSelectedUser, getUsuarios, getProfile} from '../store/actions/userActions';
import Page from 'components/Page';
import React from 'react';
import {Redirect} from 'react-router-dom';
import {Button, Modal, ModalBody, ModalFooter, ModalHeader} from 'reactstrap';

class UsersPage extends React.Component {

constructor(props) {
  super(props);

  this.state = {
    editUserModal: false,
    deleteUserModal: false,
    userClicked: {}
  };

  this.deleteUser = this.deleteUser.bind(this);
  this.editUser = this.editUser.bind(this);
  this.toggle = this.toggle.bind(this);
}

componentDidMount() {
  this.props.getUsuarios();
}

shouldComponentUpdate(nextProps, nextState) {
  if (this.props.tokenExpired !== nextProps.tokenExpired ||
      this.props.allUsuarios !== nextProps.allUsuarios || 
      this.props.selectedUser !== nextProps.selectedUser) {
    return true;
  }

  if (this.state.editUserModal !== nextState.editUserModal ||
    this.state.deleteUserModal !== nextState.deleteUserModal) {
    return true;
  }

  return false
}

deleteUser() {
  this.props.deleteSelectedUser(this.state.userClicked.id)
  this.setState({
    deleteUserModal: false
  })
}

editUser(id) {
  console.log(id);
  // this.props.getProfile();
}

openDeleteUserModal(user) {
  this.setState({
    deleteUserModal: true,
    userClicked: user
  })
}

openEditUserModal(user) {
  this.setState({
    editUserModal: true,
    userClicked: user
  })
}

toggle = modalType => () => {
  this.setState({
    [`${modalType}`]: !this.state[`${modalType}`],
  });
};


render() {

  let editUserModal;
  let deleteUserModal;

  if(this.state.editUserModal) {
    editUserModal = (
      <Modal
        isOpen={this.state.editUserModal}
        className={this.props.className}>
        <ModalHeader toggle={this.toggle('editUserModal')}>Modal title</ModalHeader>
        <ModalBody>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit,
        sed do eiusmod tempor incididunt ut labore et dolore magna
        aliqua. Ut enim ad minim veniam, quis nostrud exercitation
        ullamco laboris nisi ut aliquip ex ea commodo consequat.
        Duis aute irure dolor in reprehenderit in voluptate velit
        esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
        occaecat cupidatat non proident, sunt in culpa qui officia
        deserunt mollit anim id est laborum.
        </ModalBody>
        <ModalFooter>
        <Button color="primary">
            Enviar
        </Button>{' '}
        <Button color="secondary" onClick={this.toggle('editUserModal')}>
            Cancelar
        </Button>
        </ModalFooter>
      </Modal>
    );
  }

  if(this.state.deleteUserModal) {

    deleteUserModal = (
      <Modal
        isOpen={this.state.deleteUserModal}
        className={this.props.className}>
        <ModalHeader toggle={this.toggle('deleteUserModal')}>Eliminar Usuario</ModalHeader>
        <ModalBody>
        ¿Estas seguro que deseas eliminar a {this.state.userClicked.email} ?
        </ModalBody>
        <ModalFooter>
        <Button color="primary" onClick={this.deleteUser}>
            Borrar
        </Button>{' '}
        <Button color="secondary" onClick={this.toggle('deleteUserModal')}>
            Cancelar
        </Button>
        </ModalFooter>
      </Modal>
    );
  }
  

  this.props.allUsuarios.forEach((data) => {
    data.delete = (
      <div>
        <MDBBtn color="light-green" rounded size="sm" onClick={()=>{this.openEditUserModal(data)}} >Editar</MDBBtn>
        <MDBBtn color="danger" size="sm" onClick={()=>{this.openDeleteUserModal(data)}}>Eliminar</MDBBtn>
      </div>);
  });

  if (this.props.tokenExpired) {
    return <Redirect to="/"/>
  }

  const dataTable = {
    columns: [
      {
        label: 'Id',
        field: 'id',
        sort: 'asc'
      },
      {
        label: 'email',
        field: 'email',
        sort: 'asc'
      },
      {
        label: 'Fecha de creación',
        field: 'created_at',
        sort: 'asc'
      },
      {
        label: 'Última actualización',
        field: 'updated_at',
        sort: 'asc'
      },
      {
        label: 'Rol',
        field: 'roleName',
        sort: 'asc'
      },
      {
        label: '',
        field: 'action',
        sort: 'disabled'
      }
    ],
    rows: this.props.allUsuarios
  };

  return (
    <Page
      className="DashboardPage"
      title="Usuarios"
      style={{ marginBottom: '2rem', marginTop: '2rem' }}>
      {editUserModal}
      {deleteUserModal}
      <DatatablePage dataTable={dataTable}/>
    </Page>
  );
}
}

const mapStatetoProps = (state) => {
  return {
    tokenExpired: state.dashboard.tokenExpired,
    allUsuarios: state.user.allUsuarios,
    selectedUser: state.user.selectedUser
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    deleteSelectedUser: (id) => dispatch(deleteSelectedUser(id)),
    getUsuarios: () => dispatch(getUsuarios()),
    getProfile: (id) => dispatch(getProfile(id)),
  }
}

export default connect(mapStatetoProps, mapDispatchToProps)(UsersPage);
