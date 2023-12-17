const values = require("../utils/values");
const { objectId, videoLink } = require("./custom.validation");


const Joi = require("joi").extend((joi) =>
({
   base: joi.array(),
   coerce: (value, helpers) => ({
    value: value.split ? value.split(",") : value,
  }),
  type : "stringArray",
}))


const searchVideo = {
    query: Joi.object().keys({
        title: Joi.string(),
        genres: Joi.stringArray().items(Joi.string().valid(...values.genres, "All")),
        contentRating: Joi.string().valid(...values.contentRating, "All"),
        sortBy: Joi.string().valid(...values.sortBy)       
   }) 

}

const videoIdSchema = {
    params: Joi.object().keys({
        videoId: Joi.string().custom(objectId)
    })
}

const videoUrlSchema =
{
    body: Joi.object().keys({
      videoLink: Joi.string().custom(videoLink),
       title: Joi.string().required(),
        genre: Joi.string().required(),
        releaseDate: Joi.string().required(),
        previewImage: Joi.string().required(),
        contentRating:Joi.string().required(),
  })
}

const votingSchema = {
   params: Joi.object().keys({
        videoId: Joi.string().custom(objectId)
    }),
   body : Joi.object().keys({
    vote: Joi.string().valid(...values.updateVoteTypes).required(),
    change : Joi.string().valid(...values.changeVoteTypes, "increase"),
  })
}


module.exports = {videoIdSchema, searchVideo, videoUrlSchema, votingSchema}
