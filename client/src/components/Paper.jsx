import React from 'react';
import paper from './images/paper.png';

export default(params) => {
  return(
    <div className={`game-item ${params.disabled ? 'disabled' : ''}`}  onClick={ () => params.onClick('paper') } >
      <img src={ paper } className="game-item-img" alt="paper" />
    </div>
  )
}
