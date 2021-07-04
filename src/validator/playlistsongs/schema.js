const Joi = require('joi');

const PostPlaylistSongsPayloadSchema = Joi.object({
  songId: Joi.string().required(),
});

module.exports = { PostPlaylistSongsPayloadSchema };
