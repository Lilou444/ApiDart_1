const mongoose = require('mongoose');
const Schema = mongoose.Schema
 
const GamePlayer = new Schema({
  playerId: { 
      type: String, 
      required: true },
  gameId: { 
      type: String, 
      required: true },
  remainingShots: { 
      type: Number, 
      default: null },
  score: { 
      type: Number, 
      required: true, 
      default: 0 },
  rank: { 
      type: Number, 
      default: null },
  order: { 
      type: Number, 
      default: null },
  inGame: {
      type : Boolean,
      default: false,
    },
  createdAt: Date,
}, { versionKey: false })

const modelGamePlayer = mongoose.model('GamePlayer', GamePlayer)

module.exports = modelGamePlayer

//Models route gamePlayer