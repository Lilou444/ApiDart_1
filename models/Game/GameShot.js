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
}, {
  versionKey: false
})

const modelGameShot = mongoose.model('GameShot', GameShot)

module.exports = {

  ​
    // fonction insert 
    insert: async (params) => {
      const id = require('uuid').v4()
      let user = { id: id,
                  gameId: params.gameId,
                  playerId: params.playerId,
                  multiplicator: params.multiplicator,
                  sector: params.sector
                 }
      let doc = await modelGameShot.collection.insertMany([user], function(err) {
            console.log("insert error")
        })
      console.log(user)
      console.log(doc)
  ​
      return doc
  ​
    },
  ​
}


//Models route gameShot


