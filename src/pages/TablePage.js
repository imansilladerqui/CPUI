import React from 'react';
import {MDBDataTable} from 'mdbreact';

import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';

const DatatablePage = ({
  rowData
}) => {
  console.log(rowData);

  const data = {
    columns: [
      {
        label: '# de cotizacion',
        field: '# de cotizacion',
        sort: 'asc'
      },
      {
        label: 'Entidad',
        field: 'entidad',
        sort: 'asc'
      },
      {
        label: 'Última actualizacion',
        field: 'last',
        sort: 'asc'
      },
      {
        label: 'Compra',
        field: 'compra',
        sort: 'asc'
      },
      {
        label: 'Venta',
        field: 'venta',
        sort: 'asc'
      }
    ],
    rows: rowData
  };

  return (
    <MDBDataTable
      striped
      bordered
      hover
      data={data}
    />
  );
}

export default DatatablePage;
