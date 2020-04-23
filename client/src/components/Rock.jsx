import React from 'react';
import rock from './images/rock.png';

export default(params) => {
  console.log(params)
  return(
    <div className={`game-item ${params.disabled ? 'disabled' : ''}`} onClick={ () => params.onClick('rock') }>
      <img src={ rock } className="game-item-img" alt="rock" />
    </div>
  )
}
