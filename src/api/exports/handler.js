const ClientError = require('../../exceptions/ClientError');

class ExportsHandler {
  constructor(producerService, playlistsService, validator) {
    this._producerService = producerService;
    this._playlistsService = playlistsService;
    this._validator = validator;

    this.postExportPlaylistByIdHandler = this.postExportPlaylistByIdHandler.bind(this);
  }

  async postExportPlaylistByIdHandler(request, h) {
    try {
      this._validator.validateExportPlaylistsPayload(request.payload);
      const { targetEmail } = request.payload;
      const { userId } = request.auth.credentials;
      const { playlistId } = request.params;

      await this._playlistsService.verifyPlaylistAccess(playlistId, userId);

      const message = {
        playlistId,
        targetEmail,
      };

      await this._producerService.sendMessage('export:playlist', JSON.stringify(message));

      const response = h.response({
        status: 'success',
        message: 'Permintaan Anda sedang kami proses',
      });
      response.code(201);
      return response;
    } catch (error) {
      if (error instanceof ClientError) {
        const response = h.response({
          status: 'fail',
          message: error.message,
        });
        response.code(error.statusCode);
        return response;
      }

      const response = h.response({
        status: 'error',
        message: 'Maaf, server kami mengalami kegagalan',
      });
      response.code(500);
      console.error(error);
      return response;
    }
  }
}

module.exports = ExportsHandler;
