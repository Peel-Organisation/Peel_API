const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: { type: String, unique: true },
  password: String,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  birthday: Date,
  gender: String,
  // position: {
  //   longitude: Number,
  //   latitude: Number,
  // },
  gif: {
    id: String,
    url: String,
    title: String,
    image: {
      height: Number,
      width: Number,
      url: String,
      webp: String,
      frames: Number,
      hash: String,
    },
  },
  movie: {
    id: String,
    title: String,
    images: {
      backdrop_path: String,
      poster_path: String,
    },
    genre_ids: [
      {
        id: Number,
        name: String,
      },
    ],
  },
  music: {
    id: String,
    title: String,
    image: String,
    artist: {
      id: String,
      name: String,
      image: String
    },
    album: {
      id: String,
      title: String,
      image: String
    },
  },
  questions: [
    {
      question: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Question",
      },
      answer: String,
    },
  ],
  interests: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Interest",
    },
  ],
  matches: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Conversation",
    },
  ],
  likes: [
    {
      userID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
      statelike: {
        type: String,
        enum: ["like", "dislike"],
        default: "dislike",
        trim: true,
      },
      _id: false,
    },
  ],
  likedBy: [
    {
      userID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
      statelike: {
        type: String,
        enum: ["like", "dislike"],
        default: "dislike",
        trim: true,
      },
      _id: false,
    },
  ],
  blocked: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  preferences: {
    age: {
      min: Number,
      max: Number,
    },
    searchRange: Number,
    sexual_orientation: String,
    searchLove: Boolean,
    searchFriend: Boolean
  },
  biographie: String,
  isFake: { type: Boolean, default: false },
  isAdmin: { type: Boolean, default: false },
  firebaseToken: [
    {
      token: { type: String, default: null },
      firstLogin: { type: Date, default: Date.now },
      lastLogin: { type: Date, default: Date.now },
      nb_connexion: { type: Number, default: 0 },
    },
  ],
  profileModules: {
    mainElement: {
      type: String,
      enum: ["gif", "movie", "music", "biographie", "interests", "questions"],
      default: "gif",
    },
    secondaryElement: {
      type: String,
      enum: ["gif", "movie", "music", "biographie", "interests", "questions"],
      default: "biographie",
    },
    tertiaryElement: {
      type: String,
      enum: ["gif", "movie", "music", "biographie", "interests", "questions"],
      default: "interests",
    },
    quaternaryElement: {
      type: String,
      enum: ["gif", "movie", "music", "biographie", "interests", "questions"],
      default: "questions",
    },
  },
  nbInstantConversationPossibilities: { type: Number, default: 1 },
});

module.exports = mongoose.model("User", userSchema);
