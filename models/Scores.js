const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const ScoreSchema = new Schema({
  userId: {
    type: String,
    required: true
  },
  win: {
    type: Number,
    default: 0
  },
  lose: {
    type: Number,
    default: 0
  },
  draw: {
    type: Number,
    default: 0
  }
});

module.exports = Scores = mongoose.model("scores", ScoreSchema);
