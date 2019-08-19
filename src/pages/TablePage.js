import React from 'react';
import {MDBDataTable} from 'mdbreact';

import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';

const DatatablePage = ({
  dataTable
}) => {

  return (
    <MDBDataTable
      id="tableId"
      data={dataTable}
    />
  );
}

export default DatatablePage;
