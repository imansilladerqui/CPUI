import {Row, Col} from 'reactstrap';
import {NumberWidget} from 'components/Widget';
import PropTypes from 'utils/propTypes';
import React from 'react';


const NumbersCotizaciones = ({
    ultimasDosRuedas
}) => {

    let cotizacionNumberWidget = ultimasDosRuedas.map((data, i)=>{
        let barColorCompra = data[0].compra >= data[1].compra ? 'success' : 'danger';
        let barColorVenta = data[0].venta >= data[1].venta ? 'success' : 'danger';
        let porcentajeCompra = (((data[0].compra/data[1].compra)*100)-100).toFixed(2);
        let porcentajeVenta = (((data[0].venta/data[1].venta)*100)-100).toFixed(2);
        let spread = data[0].venta - data[0].compra;

        return (<Col key={i} lg={6} md={6} sm={12} xs={12}>
            <NumberWidget
            title={data[0].entidad}
            subtitle={`${data[0].dia} ${data[0].hora}`}
            spread={spread}
            compra={data[0].compra}
            anteriorCompra = {data[1].compra}
            venta={data[0].venta}
            anteriorVenta = {data[1].venta}
            logo = {data[0].entidad === 'Montevideo' ||  data[0].entidad === 'Vaccaro' ? '' : data[0].logo}
            colorCompra = {barColorCompra}
            colorVenta = {barColorVenta}
            modificacionCompra = {porcentajeCompra}
            modificacionVenta = {porcentajeVenta}
            progress={{
                label: 'Porcentaje de variacion',
            }}
            />
        </Col>);
    })
    
  return (

    <Row>
        {cotizacionNumberWidget}
    </Row>
    
  );
}
NumbersCotizaciones.propTypes = {
    ultimasDosRuedas: PropTypes.array
};

export default NumbersCotizaciones;