import axios from "axios";

export const updateScores = (scoreData) => dispatch => {
  axios
    .post("/api/scores/update", scoreData)
    .then(res => {
      console.log('scores updated')
    }) // re-direct to login on successful register
    .catch(err =>
      console.log(err)
    );
};
