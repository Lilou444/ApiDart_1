
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
}, { versionKey: false })

const modelPlayer = mongoose.model('Player', Player)

module.exports = modelPlayer
