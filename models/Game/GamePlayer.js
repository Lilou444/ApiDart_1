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

module.exports = {

    // fonction get 

  get: async (playerId) => {
      console.log("get user")
      const user = await modelGamePlayer.find({id:playerId})
      console.log(user)
      return user
    },
  ​
    count: async() => {
     return await modelGamePlayer.count({})
    },
  ​

  // fonction getAll
    getAll: async (limit, offset) => {
      const users = await modelGamePlayer.find()
    //  console.log(users)
     return users
  ​
    },
  ​
    // fonction insert 
    insert: async (params) => {
      const playerId = require('uuid').v4()
      let user = { id: playerId,
        gameId: params.gameId
     }
      let doc = await modelGamePlayer.collection.insertMany([user], function(err) {
            console.log("insert error")
        })
      console.log(user)
      console.log(doc)
  ​
      return doc
  ​
    },
  ​
  ​
   // fonction delete
    remove: async(playerId) => {
      console.log("delete")
      const doc = await modelGamePlayer.deleteOne({id:playerId})
      return doc
    }
   
}

//Models route gamePlayer