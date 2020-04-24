const express = require("express");
const router = express.Router();

// // Load User model
const Scores = require("../../models/Scores");

// @route GET api/scores/getAll
// @desc Get user scores
// @access Public
router.route('/getAll').get((req, res) => {
  console.log('---- ID ----')
  console.log(req.query.user)
  Scores.find({ userId: req.query.user }, (err, result) => {
    if (err) res.send(err);
    res.send(result);
  })
});

// @route POST api/scores/update
// @desc Update user scores
// @access Public
router.route('/update').post((req, res) => {
  Scores.updateOne({ userId: req.body.userId }, req.body, (err, result) => {
    if (err) res.send(err);
    res.send(result);
  })
});

module.exports = router;
