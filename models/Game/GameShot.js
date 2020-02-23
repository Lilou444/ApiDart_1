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


//Models route gameShot


