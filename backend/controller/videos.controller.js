const catchAsync = require("../utils/catchAsync");
const { videoService } = require("../services");



const getVideoById = catchAsync(async (req, res) => {
  const id = req.params.videoId;
  const video = await videoService.getVideoById(id);
  res.send(video);
});


const getVideos = catchAsync(async (req, res) => {
  const { title, contentRating, genres, sortBy } = req.query;
  const title1 = title ? title : "";
  const contentRating1 = contentRating ? contentRating : "All";
  const genres1 = genres ? genres : ["All"];
  const sortBy1 = sortBy ? sortBy : "releaseDate";
  const videos = await videoService.getVideos(
    title1,
    contentRating1,
    genres1,
    sortBy1
  );
  if (!videos.length) {
    res.status(404).json({ message: "No Videos Found" });
  } else {
    res.status(200).send({ videos: videos });
  }
});



const postVideos = catchAsync(async (req, res) => {
  const video = await videoService.postVideo(req.body);
  res.status(201).send(video);
});



const updateVotes = catchAsync(async (req, res) => {
  await videoService.updateVotes(
    req.params.videoId,
    req.body.vote,
    req.body.change
  );
  res.sendStatus(201);
});



const updateViews = catchAsync(async (req, res) => {
  const id = req.params.videoId;
 await videoService.updateViews(id);
  res.sendStatus(204);
});



module.exports = {
  getVideos,
  getVideoById,
  postVideos,
  updateVotes,
  updateViews,
};
