const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: {type: String, unique: true},
    password: String,
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    birthday: Date,
    gender: String,
    position: {
      longitude: Number,
      latitude: Number
    },
    favouriteMusic: String,
    favouriteMovie: String,
    questions: [{ question : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Question"
      },
      answer: String
    }],
    interests: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Interest"
    }],
    gifLink: String,
    matches: [{ 
      type: mongoose.Schema.Types.ObjectId,
      ref: "Conversation"
    }],
    likes: [
      {
        userID: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User"
        },
        statelike: {
          type: String,
          enum: ['like', 'dislike'],
          default: 'dislike',
          trim: true
        },
        _id : false
      }
    ],
    likedBy: [ 
      {
        userID : {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        }, 
        statelike: { 
          type: String,
          enum: ['like', 'dislike'],
          default: 'dislike',
          trim: true
        },
        _id : false
      }
    ],
    blocked: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"}],
    preferences: {
      age : {
        min: Number,
        max: Number
      },
      searchRange : Number,
      sexual_orientation : String
    },
    biographie: String,
    isFake: { type: Boolean, default: false},
    isAdmin : { type: Boolean, default: false}
    
});
  
module.exports = mongoose.model('User', userSchema);