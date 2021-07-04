const Joi = require('joi');

const PostCollaborationsPayloadSchema = Joi.object({
  playlistId: Joi.string().required(),
  userId: Joi.string().required(),
});

module.exports = { PostCollaborationsPayloadSchema };
