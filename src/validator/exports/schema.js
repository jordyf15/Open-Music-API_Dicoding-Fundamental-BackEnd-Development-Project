const Joi = require('joi');

const ExportPlaylistsPayloadScema = Joi.object({
  targetEmail: Joi.string().email({ tlds: true }).required(),
});

module.exports = ExportPlaylistsPayloadScema;
