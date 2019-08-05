import {CardGroup, Row, Col} from 'reactstrap';
import {IconWidget} from 'components/Widget';
import PropTypes from 'utils/propTypes';
import React from 'react';
import {MdThumbUp} from 'react-icons/lib/md';

const IconsCotizaciones = ({
    entidades
  }) => {


    let dataCompraAlta;
    let resultadoCompraAlta = 0;
    for(let i=0; i < entidades.length; i++) {
      if(parseFloat(entidades[i].compra).toFixed(2) > resultadoCompraAlta) {
        resultadoCompraAlta = parseFloat(entidades[i].compra).toFixed(2);
        dataCompraAlta=entidades[i];
      }
    }


    let dataCompraBaja;
    let resultadoCompraBaja = parseFloat(entidades[0].compra).toFixed(2);
    
    for(let i=0; i < entidades.length; i++) {
      if(parseFloat(entidades[i].compra).toFixed(2) <= resultadoCompraBaja) {
        resultadoCompraBaja = parseFloat(entidades[i].compra).toFixed(2)
        dataCompraBaja = entidades[i];
      }
    }

    let dataVentaAlta;
    let resultadoVentaAlta = 0;
    
    for(let i=0; i < entidades.length; i++) {
      if(parseFloat(entidades[i].venta).toFixed(2) > resultadoVentaAlta) {
        resultadoVentaAlta = parseFloat(entidades[i].venta).toFixed(2);
        dataVentaAlta=entidades[i];
      }
    }

    let dataVentaBaja;
    let resultadoVentaBaja = parseFloat(entidades[0].venta).toFixed(2);

    for(let i=0; i < entidades.length; i++) {
      if(parseFloat(entidades[i].venta).toFixed(2) <= resultadoVentaBaja) {
        resultadoVentaBaja = parseFloat(entidades[i].venta).toFixed(2)
        dataVentaBaja = entidades[i];
      }
    }
    
    let dataMayorSpread;
    let resultadoCompraMayorSpread;
    let resultadoVentaMayorSpread;
    let resultadoMayorSpread = 0;
    let resultadoMayorSpreadTemp;

    
    for(let i=0; i < entidades.length; i++) {   
      resultadoCompraMayorSpread = parseFloat(entidades[i].compra);
      resultadoVentaMayorSpread = parseFloat(entidades[i].venta);
      resultadoMayorSpreadTemp = resultadoVentaMayorSpread - resultadoCompraMayorSpread;
      if(resultadoMayorSpreadTemp > resultadoMayorSpread) {
        resultadoMayorSpread = resultadoMayorSpreadTemp.toFixed(2);
        dataMayorSpread = entidades[i];
      }
    }


    let dataMenorSpread;
    let resultadoCompraMenorSpread;
    let resultadoVentaMenorSpread;
    let resultadoMenorSpread = parseFloat(entidades[0].venta).toFixed(2) - parseFloat(entidades[0].compra);

    for(let i=0; i < entidades.length; i++) {     
      resultadoCompraMenorSpread = parseFloat(entidades[i].compra);
      resultadoVentaMenorSpread = parseFloat(entidades[i].venta);
      let resultadoMenorSpreadTemp = resultadoVentaMenorSpread - resultadoCompraMenorSpread;

      if(resultadoMenorSpreadTemp <= resultadoMenorSpread) {
        resultadoMenorSpread = resultadoMenorSpreadTemp.toFixed(2);
        dataMenorSpread = entidades[i];
      }
    }



  return (

    <Row>
      <Col lg="12" md="12" sm="12" xs="12">
        <CardGroup style={ {marginTop: '2rem' }}
        lg={3} md={3} sm={12} xs={12}>
          <IconWidget
            bgColor="white"
            inverse={false}
            icon={MdThumbUp}
            subtitle="Mayor precio de compra"
            entidad={dataCompraAlta.entidad}
            valor={`$ ${dataCompraAlta.compra}`}
            logo={dataCompraAlta.entidad === 'Montevideo' ||  dataCompraAlta.entidad === 'Vaccaro' ? '' : dataCompraAlta.logo}
          />
          <IconWidget
            bgColor="white"
            inverse={false}
            icon={MdThumbUp}
            subtitle="Mayor precio de venta"
            entidad={dataVentaAlta.entidad}
            valor={`$ ${dataVentaAlta.venta}`}
            logo={dataVentaAlta.entidad === 'Montevideo' ||  dataVentaAlta.entidad === 'Vaccaro' ? '' : dataVentaAlta.logo}
          />
          <IconWidget
            bgColor="white"
            inverse={false}
            icon={MdThumbUp}
            subtitle="Mayor spread entre precios"
            entidad={dataMayorSpread.entidad}
            valor={`$ ${resultadoMayorSpread}`}
            logo={dataMayorSpread.entidad === 'Montevideo' ||  dataMayorSpread.entidad === 'Vaccaro' ? '' : dataMayorSpread.logo}
          />
        </CardGroup>
        <CardGroup style={ { marginBottom: '2rem'}}
          lg={3} md={3} sm={12} xs={12}>
          <IconWidget
            bgColor="white"
            inverse={false}
            icon={MdThumbUp}
            subtitle="Menor precio de compra"
            entidad={dataCompraBaja.entidad}
            valor={`$ ${dataCompraBaja.compra}`}
            logo={dataCompraBaja.entidad === 'Montevideo' ||  dataCompraBaja.entidad === 'Vaccaro' ? '' : dataCompraBaja.logo}
          />
          <IconWidget
            bgColor="white"
            inverse={false}
            icon={MdThumbUp}
            subtitle="Menor precio de venta"
            entidad={dataVentaBaja.entidad}
            valor={`$ ${dataVentaBaja.venta}`}
            logo={dataVentaBaja.entidad === 'Montevideo' ||  dataVentaBaja.entidad === 'Vaccaro' ? '' : dataVentaBaja.logo}
          />
          <IconWidget
            bgColor="white"
            inverse={false}
            icon={MdThumbUp}
            subtitle="Menor spread entre precios"
            entidad={dataMenorSpread.entidad}
            valor={`$ ${resultadoMenorSpread}`}
            logo={dataMenorSpread.entidad === 'Montevideo' ||  dataMenorSpread.entidad === 'Vaccaro' ? '' : dataMenorSpread.logo}
          />
        </CardGroup>
      </Col>
    </Row>
    
  );
}
IconsCotizaciones.propTypes = {
  entidades: PropTypes.array
};

export default IconsCotizaciones;
