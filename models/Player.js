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
}, { versionKey: false })

const PlayerModel = mongoose.model('Player', Player)

module.exports = {

      // fonction get 

    get: async (playerId) => {
        console.log("get player")
        const user = await PlayerModel.find({id:playerId})
        console.log(user)
        return user
      },
    ​

    // fonction getAll
      getAll: async (limit, offset) => {
        const user = await PlayerModel.find()
      //  console.log(users)
       return user
    ​
      },
    ​
      // fonction insert 
      insert: async (params) => {
        const playerId = require('uuid').v4()
        let user = { id: playerId,
                    name: params.name,
                    email: params.email }
        let doc = await PlayerModel.collection.insertMany([user], function(err) {
              console.log("insert error")
          })
        console.log(user)
        console.log(doc)
    ​
        return doc
    ​
      },
    ​
     // fonction update 
      update: async(playerId, params) => {
        let user = { id: playerId,
          name: params.name,
          email: params.email}
        const doc = await PlayerModel.updateOne({id:playerId},user, function(err) {
            console.log("update error")
        })   ​
        return doc  
      },
    ​
     // fonction delete
      remove: async(playerId) => {
        console.log("delete")
        const doc = await PlayerModel.deleteOne({id:playerId})
        return doc
      }
     
}

//Models route Player


