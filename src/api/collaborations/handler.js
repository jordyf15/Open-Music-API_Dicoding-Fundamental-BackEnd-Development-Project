const ClientError = require('../../exceptions/ClientError');

class CollaborationsHandler {
  constructor(collaborationsService, playlistsService, validator) {
    this._collaborationsService = collaborationsService;
    this._validator = validator;
    this._playlistsService = playlistsService;

    this.postCollaborationHandler = this.postCollaborationHandler.bind(this);
    this.deleteCollaborationHandler = this.deleteCollaborationHandler.bind(this);
  }

  async postCollaborationHandler(request, h) {
    try {
      this._validator.validatePostCollaborationsPayload(request.payload);
      const { playlistId, userId } = request.payload;
      const { userId: credentialId } = request.auth.credentials;

      await this._playlistsService.verifyPlaylistOwner(playlistId, credentialId);
      const collaborationId = await this._collaborationsService
        .addCollaboration(playlistId, userId);

      const response = h.response({
        status: 'success',
        message: 'Kolaborasi berhasil ditambahkan',
        data: {
          collaborationId,
        },
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

  async deleteCollaborationHandler(request, h) {
    try {
      await this._validator.validateDeleteCollaborationsPayload(request.payload);
      const { playlistId, userId } = request.payload;
      const { userId: credentialId } = request.auth.credentials;

      await this._playlistsService.verifyPlaylistOwner(playlistId, credentialId);

      await this._collaborationsService.deleteCollaboration(playlistId, userId);

      return {
        status: 'success',
        message: 'Kolaborasi berhasil dihapus',
      };
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

module.exports = CollaborationsHandler;
