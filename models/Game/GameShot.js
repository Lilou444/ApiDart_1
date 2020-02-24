const mongoose = require('mongoose');
const Schema = mongoose.Schema

const GameShot = new Schema({
  id: {
    type: String,
    required: true
  },
  gameId: {
    type: String,
    required: true
  },
  playerId: {
    type: String,
    required: true
  },
  multiplicator: {
    type: Number,
    required: true
  },
  sector: {
    type: Number,
    default: null
  }, 
  createdAt: Date,
}, { collection: 'gameShot' });

module.exports = mongoose.model('GameShot', GameShot);
