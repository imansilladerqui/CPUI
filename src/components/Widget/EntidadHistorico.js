import {Card} from 'reactstrap';
import {getColor} from 'utils/colors';
import React, {Component} from 'react';
import {Line} from 'react-chartjs-2';
import random from 'faker/lib/random';

const randomNum = (min = 0, max = 1000) => {
  return random().number({ min, max });
};

class EntidadHistorico extends Component {

  genLineData = (dataCompra = {}, dataVenta = {}) => {
    console.log(this.props.historico);
    const MESES = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Julio'];
    return {
      labels: MESES,
      datasets: [
        {
          label: 'Compra',
          backgroundColor: getColor('primary'),
          borderColor: getColor('primary'),
          borderWidth: 1,
          data: [
            randomNum(),
            randomNum(),
            randomNum(),
            randomNum(),
            randomNum(),
            randomNum(),
            randomNum(),
          ],
          ...dataCompra,
        },
        {
          label: 'Venta',
          backgroundColor: getColor('secondary'),
          borderColor: getColor('secondary'),
          borderWidth: 1,
          data: [
            randomNum(),
            randomNum(),
            randomNum(),
            randomNum(),
            randomNum(),
            randomNum(),
            randomNum(),
          ],
          ...dataVenta,
        },
      ],
    };
  };

  render() {
    return (
      <Card className="card-side side-back">
        <Line data={this.genLineData({ fill: false }, { fill: false })} />
      </Card>
    );
  }

}

export default EntidadHistorico;