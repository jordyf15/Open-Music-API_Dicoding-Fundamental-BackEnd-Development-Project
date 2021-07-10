const ExportPlaylistsPayloadScema = require('./schema');
const InvariantError = require('../../exceptions/InvariantError');

const ExportsValidator = {
  validateExportPlaylistsPayload: (payload) => {
    const validationResult = ExportPlaylistsPayloadScema.validate(payload);

    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  },
};

module.exports = ExportsValidator;
