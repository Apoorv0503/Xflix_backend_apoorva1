const express = require("express");
const videoController = require("../../controller/videos.controller");
const videoValidator = require("../../validations/video.validation");
const validate = require("../../middlewares/validate");
const router = express.Router(); 
router.get("/", validate(videoValidator.searchVideo), videoController.getVideos);
router.post("/", validate(videoValidator.videoUrlSchema), videoController.postVideos);
router.get("/:videoId", validate(videoValidator.videoIdSchema), videoController.getVideoById);
router.patch("/:videoId/votes", validate(videoValidator.votingSchema), videoController.updateVotes);
router.patch("/:videoId/views", validate(videoValidator.videoIdSchema), videoController.updateViews);

module.exports = router
