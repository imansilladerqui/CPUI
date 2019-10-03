import React from 'react';
import {EntidadStatus, EntidadHistorico} from 'components/Widget';


const EntidadWidget = (props) => {
  return (
    <div className='card-container'>
      <div className='card-body'>
        <EntidadStatus 
          {...props}
        />
        <EntidadHistorico historico={props.historico}/>
      </div>
    </div>
    
  );
};

export default EntidadWidget;
