import {CardGroup, Row, Col} from 'reactstrap';
import {ResumenWidget} from 'components/Widget';
import PropTypes from 'utils/propTypes';
import React from 'react';

const ResumenCotizaciones = ({
    entidades
  }) => {


    let dataCompraMayor;
    let resultadoCompraMayor = 0;
    for(let i=0; i < entidades.length; i++) {
      if(parseFloat(entidades[i].compra).toFixed(2) > resultadoCompraMayor) {
        resultadoCompraMayor = parseFloat(entidades[i].compra).toFixed(2);
        dataCompraMayor=entidades[i];
      }
    }

    let dataCompraMenor;
    let resultadoCompraMenor = parseFloat(entidades[0].compra).toFixed(2);
    
    for(let i=0; i < entidades.length; i++) {
      if(parseFloat(entidades[i].compra).toFixed(2) <= resultadoCompraMenor) {
        resultadoCompraMenor = parseFloat(entidades[i].compra).toFixed(2)
        dataCompraMenor = entidades[i];
      }
    }

    let dataVentaMayor;
    let resultadoVentaMayor = 0;
    
    for(let i=0; i < entidades.length; i++) {
      if(parseFloat(entidades[i].venta).toFixed(2) > resultadoVentaMayor) {
        resultadoVentaMayor = parseFloat(entidades[i].venta).toFixed(2);
        dataVentaMayor=entidades[i];
      }
    }

    let dataVentaMenor;
    let resultadoVentaMenor = parseFloat(entidades[0].venta).toFixed(2);

    for(let i=0; i < entidades.length; i++) {
      if(parseFloat(entidades[i].venta).toFixed(2) <= resultadoVentaMenor) {
        resultadoVentaMenor = parseFloat(entidades[i].venta).toFixed(2)
        dataVentaMenor = entidades[i];
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
          <ResumenWidget
            bgColor="white"
            inverse={false}
            subtitle="Mayor precio de compra"
            entidad={dataCompraMayor.entidad}
            valor={`$ ${dataCompraMayor.compra}`}
            logo={dataCompraMayor.entidad === 'Montevideo' ||  dataCompraMayor.entidad === 'Vaccaro' ? '' : dataCompraMayor.logo}
          />
          <ResumenWidget
            bgColor="white"
            inverse={false}
            subtitle="Mayor precio de venta"
            entidad={dataVentaMayor.entidad}
            valor={`$ ${dataVentaMayor.venta}`}
            logo={dataVentaMayor.entidad === 'Montevideo' ||  dataVentaMayor.entidad === 'Vaccaro' ? '' : dataVentaMayor.logo}
          />
          <ResumenWidget
            bgColor="white"
            inverse={false}
            subtitle="Mayor spread entre precios"
            entidad={dataMayorSpread.entidad}
            valor={`$ ${resultadoMayorSpread}`}
            logo={dataMayorSpread.entidad === 'Montevideo' ||  dataMayorSpread.entidad === 'Vaccaro' ? '' : dataMayorSpread.logo}
          />
        </CardGroup>
        <CardGroup style={ { marginBottom: '2rem'}}
          lg={3} md={3} sm={12} xs={12}>
          <ResumenWidget
            bgColor="white"
            inverse={false}
            subtitle="Menor precio de compra"
            entidad={dataCompraMenor.entidad}
            valor={`$ ${dataCompraMenor.compra}`}
            logo={dataCompraMenor.entidad === 'Montevideo' ||  dataCompraMenor.entidad === 'Vaccaro' ? '' : dataCompraMenor.logo}
          />
          <ResumenWidget
            bgColor="white"
            inverse={false}
            subtitle="Menor precio de venta"
            entidad={dataVentaMenor.entidad}
            valor={`$ ${dataVentaMenor.venta}`}
            logo={dataVentaMenor.entidad === 'Montevideo' ||  dataVentaMenor.entidad === 'Vaccaro' ? '' : dataVentaMenor.logo}
          />
          <ResumenWidget
            bgColor="white"
            inverse={false}
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
ResumenCotizaciones.propTypes = {
  entidades: PropTypes.array
};

export default ResumenCotizaciones;
