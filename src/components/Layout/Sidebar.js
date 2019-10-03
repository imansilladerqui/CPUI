import cplogo from 'assets/img/logo/cplogo.svg';
import SourceLink from 'components/SourceLink';
import React from 'react';
import {MdDashboard, MdWeb} from 'react-icons/lib/md';
import { NavLink } from 'react-router-dom';
import {Nav, Navbar, NavItem, NavLink as BSNavLink} from 'reactstrap';
import bn from 'utils/bemnames';

const navItemsUser = [
  { to: '/', name: 'Panel de Control', exact: true, Icon: MdDashboard }
];

const navItemsAdmin = [
  { to: '/', name: 'Panel de Control', exact: true, Icon: MdDashboard },
  { to: '/users', name: 'Usuarios', exact: false, Icon: MdWeb }
];

const navItemsOwner = [
  { to: '/', name: 'Panel de Control', exact: true, Icon: MdDashboard },
  { to: '/users', name: 'Usuarios', exact: false, Icon: MdWeb }
];

const bem = bn.create('sidebar');

class Sidebar extends React.Component {
  state = {
    isOpenComponents: true,
    isOpenContents: true,
    isOpenPages: true,
  };

  handleClick = name => () => {
    this.setState(prevState => {
      const isOpen = prevState[`isOpen${name}`];

      return {
        [`isOpen${name}`]: !isOpen,
      };
    });
  };

  render() {
    let navItems = [];

    switch(this.props.user.roleName) {
      case 'user':
        navItems = navItemsUser;
        break
      case 'admin':
        // navItems = navItemsAdmin;
        navItems = navItemsUser;
        break
      case 'owner':
        // navItems = navItemsOwner;
        navItems = navItemsUser;
        break;
      default:
        navItems = navItemsUser;
        break;
    }

    return (
      <aside className={bem.b()} id="sidebar">
        <div className={bem.e('background')}/>
        <div className={bem.e('content')}>
          <Navbar>
            <SourceLink className="navbar-brand d-flex">
              <img
                src={cplogo}
                width="170"
                height="70"
                className="pr-2"
                alt=""
              />
            </SourceLink>
          </Navbar>

          <Nav vertical>
            {navItems.map(({ to, name, exact, Icon }, index) => (
              <NavItem key={index} className={bem.e('nav-item')}>
                <BSNavLink
                  id={`navItem-${name}-${index}`}
                  className="text-uppercase"
                  tag={NavLink}
                  to={to}
                  activeClassName="active"
                  exact={exact}>
                  <Icon className={bem.e('nav-item-icon')} />
                  <span className="">{name}</span>
                </BSNavLink>
              </NavItem>
            ))}
          </Nav>
        </div>
      </aside>
    );
  }
}

export default Sidebar;
