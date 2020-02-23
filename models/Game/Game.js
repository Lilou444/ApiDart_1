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

const modelGame = mongoose.model('Game', Game)

module.exports = {

    // fonction get 

  get: async (userId) => {
      console.log("get user")
      const user = await User.find({id:userId})
      console.log(user)
      return user
    },
  ​
    count: async() => {
     return await User.count({})
    },
  ​

  // fonction getAll
    getAll: async (limit, offset) => {
      const users = await User.find()
    //  console.log(users)
     return users
  ​
    },
  ​
    // fonction insert 
    insert: async (params) => {
      const userId = require('uuid').v4()
      let user = { id: userId,
                  pseudo: params.pseudo,
                  firstname: params.firstname,
                  lastname: params.lastname,
                  email: params.email,
                  password: params.password }
      let doc = await User.collection.insertMany([user], function(err) {
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
    update: async(userId, params) => {
      let user = { id: userId,
        pseudo: params.pseudo,
        firstname: params.firstname,
        lastname: params.lastname,
        email: params.email,
        password: params.password }
      const doc = await User.updateOne({id:userId},user, function(err) {
          console.log("update error")
      })
  ​
      return doc
   
    },
  ​
   // fonction delete
    remove: async(userId) => {
      console.log("delete")
      const doc = await User.deleteOne({id:userId})
      return doc
    }
   
}


//Models route game