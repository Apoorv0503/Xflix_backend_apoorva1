const httpStatus = require("http-status");
const { Data } = require("../models/videos.model");
const ApiError = require("../utils/ApiError");
const Values = require("../utils/values");


// Getting a video using ID

const getVideoById = async (id) => {
  const result = await Data.findById(id);
  return result;
};

//Getting all videos from database

const getVideos = async (title, contentRating, genres, sortBy) => {
  const titleMatch = { title: { $regex: title, $options: "i" } };
  const contentRatings = getPossibleContentRating(contentRating);
  const contentRatingMatch = { contentRating: { $in: contentRatings } };
  let genreMatch = { genre: { $in: genres } };
  if (genres.includes("All")) {
    genreMatch = null;
  }
  const videos = await Data.find({
    ...genreMatch,
    ...contentRatingMatch,
    ...titleMatch,
  });
  const sortedVideos = sortVideos(videos, sortBy);
  return sortedVideos;
};


// Fetch all the possible content rating based on given argument . For eg. if argument is 12+ then the possible content ratings
 // will be 12+, 16+, 18+ 

const getPossibleContentRating = (contentRating) => {
  let contentRatings = [...Values.contentRating];
  if (contentRating == "Anyone") {
    return contentRating;
  }
  if (contentRating == "All") {
    return contentRatings;
  }
  const contentRatingIndex = contentRatings.indexOf(contentRating);
  const possibleContentRating = contentRatings.splice(contentRatingIndex);
  console.log(possibleContentRating);

  return possibleContentRating;
};


// Sorting videos based on releaseDate or viewCounts

const sortVideos = (videos, sortBy) => {
  videos.sort((video1, video2) => {
    let field1 = video1[sortBy];
    let field2 = video2[sortBy];
    if (sortBy === "releaseDate") {
      field1 = new Date(field1).getTime();
      field2 = new Date(field2).getTime();
    }
    if (field1 > field2) {
      return -1;
    }
    return 1;
  });
  return videos;
};


// Post video to the server

const postVideo = async (videoBody) => {
  const video = await Data.create(videoBody).catch((error) => {
    if (mongoose.Error.ValidationError) {
      throw new ApiError(httpStatus.BAD_REQUEST, "Video Link already exist");
    }
  });
  return video;
};


// Increase upVote or downVote on the video

const updateVotes = async (videoId, typeofvote, change) => {
  const video = await Data.findById(videoId);
  if (!video) {
    throw new ApiError(
      httpStatus.NOT_FOUND,
      "Video not found with matching Id"
    );
  }

  if (change == "increase") {
    if (typeofvote == "downVote") {
      video.votes.downVotes += 1;
    } else if (typeofvote == "upVote") {
      video.votes.upVotes += 1;
    }
  } else {
    if (typeofvote == "downVote") {
      video.votes.downVotes -= 1;
    } else if (typeofvote == "upVote") {
      video.votes.upVotes -= 1;
    }
  }
  await video.save();
  return;
};



//Increase view count everytime a video is opened

const updateViews = async (id) => {
  const video = await Data.findById(id);
  if (!video) {
    throw new ApiError(
      httpStatus.NOT_FOUND,
      "Video not found with matching Id"
    );
  }
  video.viewCount += 1;
  await video.save();
  return;
};



module.exports = {
  getVideos,
  getVideoById,
  postVideo,
  updateVotes,
  updateViews,
};
