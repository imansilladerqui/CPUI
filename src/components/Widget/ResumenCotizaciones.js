import {CardGroup, Row, Col} from 'reactstrap';
import {ResumenWidget} from 'components/Widget';
import React from 'react';

const ResumenCotizaciones = (props) => {

    let dataCompraMayor;
    let resultadoCompraMayor = 0;
    for(let i=0; i < props.entidades.length; i++) {
      if(parseFloat(props.entidades[i].compra).toFixed(2) > resultadoCompraMayor) {
        resultadoCompraMayor = parseFloat(props.entidades[i].compra).toFixed(2);
        dataCompraMayor=props.entidades[i];
      }
    }

    let dataCompraMenor;
    let resultadoCompraMenor = (props.entidades[0]) ? parseFloat(props.entidades[0].compra).toFixed(2) : '';
    
    for(let i=0; i < props.entidades.length; i++) {
      if(parseFloat(props.entidades[i].compra).toFixed(2) <= resultadoCompraMenor) {
        resultadoCompraMenor = parseFloat(props.entidades[i].compra).toFixed(2)
        dataCompraMenor = props.entidades[i];
      }
    }

    let dataVentaMayor;
    let resultadoVentaMayor = 0;
    
    for(let i=0; i < props.entidades.length; i++) {
      if(parseFloat(props.entidades[i].venta).toFixed(2) > resultadoVentaMayor) {
        resultadoVentaMayor = parseFloat(props.entidades[i].venta).toFixed(2);
        dataVentaMayor=props.entidades[i];
      }
    }

    let dataVentaMenor;
    let resultadoVentaMenor = (props.entidades[0]) ? parseFloat(props.entidades[0].venta).toFixed(2) : '';

    for(let i=0; i < props.entidades.length; i++) {
      if(parseFloat(props.entidades[i].venta).toFixed(2) <= resultadoVentaMenor) {
        resultadoVentaMenor = parseFloat(props.entidades[i].venta).toFixed(2)
        dataVentaMenor = props.entidades[i];
      }
    }

    let dataSpreadMayor;
    let resultadoSpreadMayor = 0;
    
    for(let i=0; i < props.entidades.length; i++) {
      if(parseFloat(props.entidades[i].spread).toFixed(2) > resultadoSpreadMayor) {
        resultadoSpreadMayor = parseFloat(props.entidades[i].spread).toFixed(2);
        dataSpreadMayor=props.entidades[i];
      }
    }

    let dataSpreadMenor;
    let resultadoSpreadMenor = (props.entidades[0]) ? parseFloat(props.entidades[0].spread).toFixed(2) : '';

    for(let i=0; i < props.entidades.length; i++) {
      if(parseFloat(props.entidades[i].spread).toFixed(2) <= resultadoSpreadMenor) {
        resultadoSpreadMenor = parseFloat(props.entidades[i].spread).toFixed(2)
        dataSpreadMenor = props.entidades[i];
      }
    }

  return (
    <div>
      <Row className="MesaDeDineroDestacadosFirstRow">
        <div className="MesaDeDineroDestacadosTitle">
            <h1>Destacados</h1>
        </div>
      </Row>
      <Row className="MesaDeDineroDestacadosSecondRow">
        <div className="destacadosTitle">
            <p>Última Actualización</p>
            <p>{(props.entidades[0]) ? `${props.entidades[0].hora} ${props.entidades[0].dia}` : ''}</p>
        </div>
      </Row>
      <Col lg="12" md="12" sm="12" xs="12">
        <CardGroup style={{marginTop: '21px', marginLeft: '24px', marginRight: '24px', border: '1px solid rgba(216, 216, 216, 0.5)', borderRadius: '3px', boxShadow: '2px 3px 10px 0 rgba(82, 82, 82, 0.15)'}}
        lg={3} md={3} sm={12} xs={12}>
          <ResumenWidget
            inverse={false}
            tarjetaTitle={'Compra'}
            subtitleMayor={'Mayor precio de compra'}
            entidadMayor={(dataCompraMayor) ? dataCompraMayor.entidad : ''}
            valorMayor={`$ ${(dataCompraMayor) ?  dataCompraMayor.compra : ''}`}
            subtitleMenor={'Menor precio de compra'}
            entidadMenor={(dataCompraMenor) ? dataCompraMenor.entidad : ''}
            valorMenor={`$ ${(dataCompraMenor) ?  dataCompraMenor.compra : ''}`}
          />
        </CardGroup>
        <CardGroup style={{marginTop: '21px', marginLeft: '24px', marginRight: '24px', border: '1px solid rgba(216, 216, 216, 0.5)', borderRadius: '3px', boxShadow: '2px 3px 10px 0 rgba(82, 82, 82, 0.15)'}}
        lg={3} md={3} sm={12} xs={12}>
          <ResumenWidget
            inverse={false}
            tarjetaTitle={'Venta'}
            subtitleMayor={'Mayor precio de venta'}
            entidadMayor={(dataVentaMayor) ? dataVentaMayor.entidad : ''}
            valorMayor={`$ ${(dataVentaMayor) ?  dataVentaMayor.venta : ''}`}
            subtitleMenor={'Menor precio de venta'}
            entidadMenor={(dataVentaMenor) ? dataVentaMenor.entidad : ''}
            valorMenor={`$ ${(dataVentaMenor) ?  dataVentaMenor.venta : ''}`}
          />
        </CardGroup>
        <CardGroup style={{marginTop: '21px', marginLeft: '24px', marginRight: '24px', border: '1px solid rgba(216, 216, 216, 0.5)', borderRadius: '3px', boxShadow: '2px 3px 10px 0 rgba(82, 82, 82, 0.15)'}}
        lg={3} md={3} sm={12} xs={12}>
          <ResumenWidget
            inverse={false}
            tarjetaTitle={'Spread'}
            subtitleMayor={'Mayor spread entre precios'}
            entidadMayor={(dataSpreadMayor) ? dataSpreadMayor.entidad : ''}
            valorMayor={`$ ${(dataSpreadMayor) ?  dataSpreadMayor.spread : ''}`}
            subtitleMenor={'Menor spread entre precios'}
            entidadMenor={(dataSpreadMenor) ? dataSpreadMenor.entidad : ''}
            valorMenor={`$ ${(dataSpreadMenor) ?  dataSpreadMenor.spread : ''}`}
          />
        </CardGroup>
      </Col>
    </div>
    
  );
}

export default ResumenCotizaciones;
