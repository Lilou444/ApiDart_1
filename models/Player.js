const mongoose = require('mongoose');
const Schema = mongoose.Schema
 
const Player = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  gameWin: {
      type: Number,
  },
  gameLost: {
      type: Number,
  },
  createdAt: Date,
},  { collection: 'players' });

module.exports = mongoose.model('Player', Player);

