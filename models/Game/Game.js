const mongoose = require('mongoose');
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

const GameModel = mongoose.model('Game', Game)

module.exports = {

    // fonction get 

  get: async (gameId) => {
      console.log("get game")
      const user = await GameModel.find({id:gameId})
      console.log(user)
      return user
    },
  ​

  // fonction getAll
    getAll: async (limit, offset) => {
      const users = await GameModel.find()
    //  console.log(users)
     return users
  ​
    },
  ​
    // fonction insert 
    insert: async (params) => {
        const gameId = require('uuid').v4()
        let user = { id: gameId,
                    name: params.name,
                    mode: params.mode }
        let doc = await GameModel.collection.insertMany([user], function(err) {
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
   update: async(gameId, params) => {
    let user = { id: gameId,
      name: params.name,
      mode: params.mode}
    const doc = await GameModel.updateOne({id:gameId},user, function(err) {
        console.log("update error")
    })   ​
    return doc  
  },
  ​
   // fonction delete
    remove: async(gameId) => {
      console.log("delete")
      const doc = await GameModel.deleteOne({id:gameId})
      return doc
    }
   
}


//Models route game