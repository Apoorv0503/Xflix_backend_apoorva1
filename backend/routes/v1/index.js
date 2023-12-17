const express = require("express");
const videoRoute = require("./videos.routes");
const router = express.Router();



router.use("/videos", videoRoute);
module.exports = router;
