import {Card, CardText, CardTitle, Col, Row} from 'reactstrap';
import PropTypes from 'utils/propTypes';
import Typography from '../Typography';
import React from 'react';


const EntidadStatus = (
    props
) => {
    let entidadHeader;
    if (props.logo) {
        entidadHeader = (
        <div>
            <Row>
            <img src={props.logo} alt={props.title} id="logoEntidades"></img>
            </Row>
        </div>
        )
    } else {
        entidadHeader = (
        <div>
            <Typography className="mb-0 text-center">
            <strong>{props.title}</strong>
            </Typography>
        </div>
        )
    }
    
    return (
        <Card body {...props} className='card-side side-front'>
            <div className="card-box">
                {entidadHeader}
                <Typography className="mt-0 mb-0 text-muted small text-center" style={{'marginBottom': '2rem'}}>
                    <strong>Spread: ${props.spread.toFixed(2)}</strong>
                </Typography>
                <Typography className="mt-0 text-muted small text-center" style={{'marginBottom': '2rem'}}>
                    Actualizado: <br/> 
                    {props.subtitle}
                </Typography>
            <Col>
                <div className="d-flex justify-content-between">
                <CardText tag="div">
                    <Typography className="mb-0">
                    <strong>Compra</strong>
                    </Typography>
                    <Typography className="mb-0 text-muted small" style={{'marginBottom': '1rem', 'marginTop': '1rem' }}>{` Última cotizacion:  $${props.anteriorcompra}`}</Typography>
                </CardText>
                <CardTitle className={`text-${props.colorcompra} valor`}>{props.iconcompra} $ {props.compra}</CardTitle>
                </div>
            </Col>
            <Col>
                <div className="d-flex justify-content-between">
                <CardText tag="div">
                    <Typography className="mb-0">
                    <strong>Venta</strong>
                    </Typography>
                    <Typography className="mb-0 text-muted small" style={{'marginBottom': '1rem', 'marginTop': '1rem' }}>{` Última cotizacion:  $${props.anteriorventa}`}</Typography>
                </CardText>
                <CardTitle className={`text-${props.colorventa} valor`}>{props.iconventa} $ {props.venta}</CardTitle>
                </div>
            </Col>
            </div>  
        </Card>
    );
};

EntidadStatus.propTypes = {
    title: PropTypes.string.isRequired,
    subtitle: PropTypes.string,
    number: PropTypes.oneOfType([
      PropTypes.string.isRequired,
      PropTypes.number.isRequired,
    ])
  };
  
  EntidadStatus.defaultProps = {
    title: '',
    subtitle: '',
    number: 0
  };

export default EntidadStatus;