import React from 'react';

function Alerter(props) {
  return (
    <div className={`alert-container ${ props.danger ? 'danger' : '' } ${props.show ? 'show' : ''}`}>{ props.message }</div>
  )
}

export default Alerter;
