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
}, {
  versionKey: false
})

const modelGameShot = mongoose.model('GameShot', GameShot)

module.exports = modelGameShot
