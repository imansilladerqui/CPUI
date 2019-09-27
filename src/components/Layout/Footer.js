import React from 'react';

import { Navbar, Nav, NavItem } from 'reactstrap';

import SourceLink from 'components/SourceLink';

const Footer = () => {
  return (
    <Navbar className="content-footer">
      <Nav navbar>
        <NavItem>
          Hecho con ❤ para  <SourceLink>Cambio Posadas</SourceLink>. <br/>
          Realizado por Paisanos Creando
        </NavItem>
      </Nav>
    </Navbar>
  );
};

export default Footer;
