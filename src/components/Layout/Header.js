
import Avatar from 'components/Avatar';
import bn from 'utils/bemnames';
import {MdClearAll, MdExitToApp} from 'react-icons/lib/md';
import {Navbar, Nav, NavItem, NavLink, Popover, PopoverBody, ListGroup, ListGroupItem, Button} from 'reactstrap';
import React, {Component} from 'react';
import {UserCard} from 'components/Card';

const bem = bn.create('header');

class Header extends Component {
  state = {
    isOpenNotificationPopover: false,
    isNotificationConfirmed: false,
    isOpenUserCardPopover: false,
  };

  toggleNotificationPopover = () => {
    this.setState({
      isOpenNotificationPopover: !this.state.isOpenNotificationPopover,
    });

    if (!this.state.isNotificationConfirmed) {
      this.setState({ isNotificationConfirmed: true });
    }
  };

  toggleUserCardPopover = () => {
    this.setState({
      isOpenUserCardPopover: !this.state.isOpenUserCardPopover,
    });
  };

  handleSidebarControlButton = event => {
    event.preventDefault();
    event.stopPropagation();

    document.querySelector('.cr-sidebar').classList.toggle('cr-sidebar--open');
  };

  handleLogOut() {
    localStorage.removeItem('_token');
    window.location.reload();
  }

  render() {
    return (
      <Navbar light expand className={bem.b('bg-white')}>
        <Nav navbar className="mr-2">
          <Button outline onClick={this.handleSidebarControlButton}>
            <MdClearAll size={25} />
          </Button>
        </Nav>

        <Nav navbar className={bem.e('nav-right')}>
          <NavItem>
            <NavLink id="Popover2">
              <Avatar
                onClick={this.toggleUserCardPopover}
                className="can-click"
                src={this.props.user.avatar}
              />
            </NavLink>
            <Popover
              placement="bottom-end"
              isOpen={this.state.isOpenUserCardPopover}
              toggle={this.toggleUserCardPopover}
              target="Popover2"
              className="p-0 border-0"
              style={{ minWidth: 250 }}>
              <PopoverBody className="p-0 border-light shadow-lg">
                <UserCard
                  avatar={this.props.user.avatar}
                  title={`${this.props.user.nombre} ${this.props.user.apellido}`}
                  subtitle={this.props.user.email}
                  text={`Last updated: ${this.props.user.updated_at}`}
                  className="border-light">
                  <ListGroup flush>
                    {/* <ListGroupItem tag="a" action href={`/user/${this.props.user.id}`} className="border-light">
                        <MdPersonPin /> Perfil
                    </ListGroupItem> */}
                    <ListGroupItem tag="button" action onClick={this.handleLogOut} className="border-light">
                      <MdExitToApp /> Salir
                    </ListGroupItem>
                  </ListGroup>
                </UserCard>
              </PopoverBody>
            </Popover>
          </NavItem>
        </Nav>
      </Navbar>
    );
  }
}

export default Header;
