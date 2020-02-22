const Schema = mongoose.Schema
 
const Game = new Schema({
  mode: { 
      type: String, 
      required: true 
    },
  name: { 
      type: String, 
      required: true 
    },
  currentPlayerId: { 
      type: String, 
      required: false 
    },
  status: { 
      type: String, 
      required: true 
    },
  currentPlayerId: { 
      type: String,
      default: 'draft',
    },
  createdAt: { 
      type: Date, 
      required: true },
}, { versionKey: false })

const modelGame = mongoose.model('Game', Game)

module.exports = modelGame
