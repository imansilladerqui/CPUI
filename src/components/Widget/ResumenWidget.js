import {Card, CardBody, CardTitle, CardSubtitle} from 'reactstrap';
import React from 'react';

const ResumenWidget = ({tarjetaTitle, subtitleMayor, entidadMayor, valorMayor, subtitleMenor, entidadMenor, valorMenor, ...restProps}) => {
  return (
    <Card inverse {...restProps} className='destacadoCard'>
      <h1>{tarjetaTitle}</h1>
      <CardBody className="text-center">
        <CardSubtitle className="mt-0">{subtitleMayor}</CardSubtitle>
        <CardTitle style={{ marginBottom: '0.5rem', marginTop: '0.5rem' }}>
          <img className='card-image-widget' alt={entidadMayor} src={`../entidades/${entidadMayor}.png`}/>
        </CardTitle>
        <CardSubtitle className="mt-0">{valorMayor}</CardSubtitle>
      </CardBody>
      <div className='border-divisor'></div>
      <CardBody className="text-center">
        <CardSubtitle className="mt-0">{subtitleMenor}</CardSubtitle>
        <CardTitle style={{ marginBottom: '0.5rem', marginTop: '0.5rem' }}>
          <img className='card-image-widget' alt={entidadMenor} src={`../entidades/${entidadMenor}.png`}/>
        </CardTitle>
        <CardSubtitle className="mt-0">{valorMenor}</CardSubtitle>
      </CardBody>
    </Card>
  );
};

export default ResumenWidget;
