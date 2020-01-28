import React from 'react';
import logo from '../../assets/img/cp-footer.svg';
import {Navbar, Nav} from 'reactstrap';

const Footer = () => {
  return (
    <Navbar className="content-footer">
      <Nav navbar>
        <div className='footer-container'>
          <img className='footerLogo' src={logo} alt="Cambio Posadas"/>
          <p>La primera plataforma creada en Argentina que te permite acceder al mercado libre de cambios regulado por el Banco Central de la República Argentina, desde tu casa, negocio u oficina, las 24 horas y los 365 días de año.</p>
          <p>© 2019 CambioPosadas SA / Design by paisanos.io</p>
        </div>
      </Nav>
    </Navbar>
  );
};

export default Footer;
