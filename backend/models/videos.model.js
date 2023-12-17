const mongoose = require("mongoose");
const values = require("../utils/values");
const contentRatings = values.contentRating;
const genres = values.genres
const videoSchema = new mongoose.Schema({
  videoLink: {
    type: String,
    required: true,
    unique: true,
     trim : true
  },
  title: {
    type: String,
    required: true,
    trim : true
  },
  genre: {
    type: String,
    required: true,
    trim: true,
    validate(value) {
      if (!genres.includes(value))
      {
        throw new Error("Invalid Genre!")
        }
    }
  },
  contentRating: {
    type: String,
    required: true,
    trim: true,
    validate(value) {
      if (!contentRatings.includes(value))
      {
        throw new Error("Invalid content rating")
        }
    }
  },
  releaseDate: {
    type: String,
    required: true,
    trim : true
  },
  previewImage: {
    type: String,
    required: true,
    trim : true,
    default : "https://i.ibb.co/nbYsmJB/xflix.jpg"
  },
  votes: {
    upVotes: {
      type: Number,
      default: 0,
      required : true
    },
    downVotes: {
      type: Number,
      default: 0,
      required : true
    },
  },
  viewCount: {
    type: Number,
    default: 0,
    required : true
  },
});
const Data = mongoose.model("Data", videoSchema);
module.exports.Data = Data;
