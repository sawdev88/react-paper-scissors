function WinLogic(user, comp) {
    if (user === comp) {
      return 0;
    } else if (user === 'scissors' && comp === 'paper') {
      return 1;
    } else if (user === 'paper' && comp === 'rock') {
      return 1
    } else if (user === 'rock' && comp === 'scissors') {
      return 1
    } else {
      return 2
    }
}

export default WinLogic;
