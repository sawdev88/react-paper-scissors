import React, { useState } from 'react';
import Rock from './Rock';
import Paper from './Paper';
import Scissors from './Scissors';
import Gusser from './Gusser';
import WinLogic from './WinLogic';
import Alerter from './Alerter';

function GameBoard() {
  const [ready, setGameAvailable] = useState(true);
  const [item, setRandom] = useState(0);
  const [userPlay, setUserPlay] = useState(0);
  const [wins, setWins] = useState(0);
  const [losses, setLosses] = useState(0);
  const [message, showMessage] = useState({});
  const gameItems = ['rock', 'paper', 'scissors'];

  const handleGamePlay = (params) => {
    if (ready) {
      handleGameReady(false);
      handleSetUser(params);
      // comps play
      const randomItem = gameItems[Math.floor(Math.random() * gameItems.length)];
      setRandom(randomItem)

      let gameResult = WinLogic(params, randomItem);
      if (gameResult === 1) {
        setWins(wins + 1)
        handleGameMessage(false, 'You Win!');
      } else if (gameResult === 2) {
        setLosses(losses + 1)
        handleGameMessage(true, 'You Lose :(');
      } else {
        // draw
        handleGameMessage(false, 'DRAW!');
      }

      setTimeout( () => { handleGameReady(true) }, 2000)
    }
  }

  const handleSetUser = (item) => {
    setUserPlay(item)
  }

  const handleGameReady = (bool) => {
    handleSetUser('')
    setGameAvailable(bool)
  }

  const handleGameMessage= (neg, mess) => {
   showMessage({
     negative: neg,
     message: mess,
   })
   setTimeout(() => { showMessage({}) }, 2000);
 }

  return (
    <div>
      <header className="d-flex mt-5">
        <div className="flex-1 text-center"><h1>Rock, Paper, Scissors</h1></div>
        <div className="flex-1 text-center">
          <span className="score-callout wins">{ wins }</span> Wins <span className="score-callout losses ml-5">{ losses }</span> Losses
        </div>
      </header>

      <div className="game-container">
        <div className="flex-1">
          <Rock onClick={ handleGamePlay } disabled={ !ready && userPlay !== 'rock' } />
          <Paper onClick={ handleGamePlay } disabled={ !ready && userPlay !== 'paper'  }  />
          <Scissors onClick={ handleGamePlay } disabled={ !ready && userPlay !== 'scissors'  }  />
        </div>

        <div className="flex-1 comp-play">
          { !item && <Gusser /> }
          { item === 'rock' && <Rock /> }
          { item === 'paper' && <Paper /> }
          { item === 'scissors' && <Scissors /> }
        </div>
      </div>

      <Alerter message={ message.message } danger={ message.negative } show={ message.message } />
    </div>
  )
}

export default GameBoard;
