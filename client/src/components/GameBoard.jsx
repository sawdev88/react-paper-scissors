import React, { useState, useEffect } from 'react';
import Rock from './Rock';
import Paper from './Paper';
import Scissors from './Scissors';
import Gusser from './Gusser';
import WinLogic from './WinLogic';
import Alerter from './Alerter';
import axios from 'axios'
import { updateScores, getAll } from '../actions/scoreActions';
import { useSelector, useDispatch } from "react-redux";

function GameBoard() {
  const [pageReady, setPageReady] = useState(false)
  const currentState = useSelector(state => state);
  const dispatch = useDispatch();
  const [ready, setGameAvailable] = useState(true);
  const [item, setRandom] = useState(0);
  const [userPlay, setUserPlay] = useState(0);
  const [scores, updateScore] = useState({
    userId: currentState.auth.user.id,
    win: 0,
    lose: 0,
    draw: 0
  })
  const [message, showMessage] = useState({});
  const gameItems = ['rock', 'paper', 'scissors'];

  useEffect(() => {
    const fetchData = async () => {

      axios
        .get('/api/scores/getAll?user=' + currentState.auth.user.id)
        .then(function(response) {
            updateScore(response.data[0])
            setPageReady(true)
          })
          .catch(err =>
            console.log(err)
          );
    };
    fetchData();
  }, []);

  const handleGamePlay = (params) => {
    if (ready) {
      handleGameReady(false);
      handleSetUser(params);
      // comps play
      const randomItem = gameItems[Math.floor(Math.random() * gameItems.length)];
      setRandom(randomItem)

      let gameResult = WinLogic(params, randomItem);
      if (gameResult === 1) {
        updateScore({
          ...scores,
          win: scores.win + 1
        })
        handleGameMessage(false, 'You Win!');
      } else if (gameResult === 2) {
        updateScore({
          ...scores,
          lose: scores.lose + 1
        })

        handleGameMessage(true, 'You Lose :(');
      } else {
        // draw
        updateScore({
          ...scores,
          draw: scores.draw + 1
        })

        handleGameMessage(false, 'DRAW!');
      }

      setTimeout( () => { handleGameReady(true) }, 2000)
    }
  }

  useEffect(() => {
    if (pageReady) dispatch( updateScores(scores) )
  }, [scores]);

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
      <div className="d-flex mt-3">
        <div className="flex-1 text-center"><h1>Rock, Paper, Scissors</h1></div>
        <div className="flex-1 text-center">
          <span className="score-callout wins">{ scores.win }</span> Wins <span className="score-callout losses ml-5">{ scores.lose }</span> Losses
        </div>
      </div>

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
