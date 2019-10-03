import {Card} from 'reactstrap';
import {getColor} from 'utils/colors';
import React, {Component} from 'react';
import {Line} from 'react-chartjs-2';

class EntidadHistorico extends Component {

  genLineData = () => {
    let datasetCompra = [], datasetVenta = [], datasetFechas = [];

    this.props.historico.map((data)=>{
        datasetFechas.push(data.dia);
        datasetCompra.push(data.compra);
        datasetVenta.push(data.venta);
    });

    return {
      labels: datasetFechas.reverse(),
      datasets: [
        {
          label: 'Compra',
          backgroundColor: getColor('primary'),
          borderColor: getColor('primary'),
          borderWidth: 1,
          data: datasetCompra.reverse(),
          fill: false,
        },
        {
          label: 'Venta',
          backgroundColor: getColor('secondary'),
          borderColor: getColor('secondary'),
          borderWidth: 1,
          data: datasetVenta.reverse(),
          fill: false,
        },
      ]
    };
  };

  render() {
    return (
      <Card className="card-side side-back">
        <Line data={this.genLineData()} />
      </Card>
    );
  }

}

export default EntidadHistorico;