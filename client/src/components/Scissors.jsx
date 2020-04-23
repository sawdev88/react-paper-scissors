import React from 'react';
import scissors from './images/scissors.png';

export default(params) => {
  return(
    <div className={`game-item ${params.disabled ? 'disabled' : ''}`} onClick={ () => params.onClick('scissors') } >
      <img src={ scissors } className="game-item-img" alt="scissors" />
    </div>
  )
}
