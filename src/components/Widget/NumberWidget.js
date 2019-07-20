import React from 'react';
import PropTypes from 'utils/propTypes';

import {Card, CardText, CardTitle, Col, Progress, Row} from 'reactstrap';
import Typography from '../Typography';

const NumberWidget = ({
  anteriorCompra,
  anteriorVenta,
  colorCompra,
  colorVenta,
  compra,
  logo,
  modificacionCompra,
  modificacionVenta,
  spread,
  subtitle,
  title,
  venta,
  progress: { value, label },
  ...restProps
}) => {
  let entidadHeader;
  if (logo) {
    entidadHeader = (
      <div>
        <Row>
          <img src={logo} alt={title} id="logoEntidades"></img>
        </Row>
      </div>
    )
  } else {
    entidadHeader = (
      <div>
        <Typography className="mb-0 text-center">
          <strong>{title}</strong>
        </Typography>
      </div>
    )
  }

  let mensajeVariacionVenta = (anteriorVenta === venta) ? ' No hubo modificaciones' : `la modificacion fue de ${anteriorVenta === venta}`;
  let mensajeVariacionCompra = (anteriorCompra === compra) ? ' No hubo modificaciones' : `la modificacion fue de ${anteriorCompra === compra}`;

  return (
    <Card body {...restProps}>
      <div className="card-box">
        {entidadHeader}
      <Typography className="mt-0 mb-0 text-muted small text-center" style={{'marginBottom': '2rem'}}>
        <strong>Spread: ${spread.toFixed(2)}</strong>
      </Typography>
      <Typography className="mt-0 text-muted small text-center" style={{'marginBottom': '2rem'}}>
        Actualizado: <br/> 
        {subtitle}
      </Typography>
      <Row>
        <Col>
          <div className="d-flex justify-content-between">
            <CardText tag="div">
              <Typography className="mb-0">
                <strong>Compra</strong>
              </Typography>
              <Typography className="mb-0 text-muted small" style={{'marginBottom': '1rem', 'marginTop': '1rem' }}>{` La cotizacion anterior fue:  $${anteriorCompra}`}</Typography>
              <Typography className="mb-0 mt-0 text-muted small" style={{'marginBottom': '1rem', 'marginTop': '1rem' }}>{mensajeVariacionCompra}</Typography>
            </CardText>
            <CardTitle className={`text-${colorCompra}`}>$ {compra}</CardTitle>
          </div>
          <Progress value={value} color={colorCompra} style={{ height: '8px', 'marginBottom': '1rem', 'marginTop': '1rem' }} />
          <CardText tag="div" className="d-flex justify-content-between">
            <Typography tag="span" className="text-left text-muted small">
              {label}
            </Typography>
            <Typography tag="span" className="text-right text-muted small">
              {modificacionCompra}%
            </Typography>
          </CardText>
        </Col>

        <Col>
          <div className="d-flex justify-content-between">
            <CardText tag="div">
              <Typography className="mb-0">
                <strong>Venta</strong>
              </Typography>
              <Typography className="mb-0 text-muted small" style={{'marginBottom': '1rem', 'marginTop': '1rem' }}>{` La cotizacion anterior fue:  $${anteriorVenta}`}</Typography>
              <Typography className="mb-0 mt-0 text-muted small" style={{'marginBottom': '1rem', 'marginTop': '1rem' }}>{mensajeVariacionVenta}</Typography>
            </CardText>
            <CardTitle className={`text-${colorVenta}`}>$ {venta}</CardTitle>
          </div>
          <Progress value={value} color={colorVenta} style={{ height: '8px', 'marginBottom': '1rem', 'marginTop': '1rem' }} />
          <CardText tag="div" className="d-flex justify-content-between">
            <Typography tag="span" className="text-left text-muted small">
              {label}
            </Typography>
            <Typography tag="span" className="text-right text-muted small">
              {modificacionVenta}%
            </Typography>
          </CardText>
        </Col>
      </Row>
      </div>  
    </Card>
  );
};

NumberWidget.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  number: PropTypes.oneOfType([
    PropTypes.string.isRequired,
    PropTypes.number.isRequired,
  ]),
  progress: PropTypes.shape({
    label: PropTypes.string,
  }),
};

NumberWidget.defaultProps = {
  title: '',
  subtitle: '',
  number: 0,
  progress: {
    value: 0,
    label: '',
  },
};

export default NumberWidget;
