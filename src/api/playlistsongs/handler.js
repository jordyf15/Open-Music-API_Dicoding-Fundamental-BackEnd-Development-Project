const ClientError = require('../../exceptions/ClientError');

class PlaylistSongsHandler {
  constructor(songsService, playlistsService, playlistSongsService, validator) {
    this._validator = validator;
    this._songsService = songsService;
    this._playlistsService = playlistsService;
    this._playlistSongsService = playlistSongsService;

    this.postPlaylistSongToPlaylistByIdHandler = this.postPlaylistSongToPlaylistByIdHandler
      .bind(this);
    this.getPlaylistSongsOfPlaylistByIdHandler = this.getPlaylistSongsOfPlaylistByIdHandler
      .bind(this);
    this.deletePlaylistSongOfPlaylistByIdHandler = this.deletePlaylistSongOfPlaylistByIdHandler
      .bind(this);
  }

  async postPlaylistSongToPlaylistByIdHandler(request, h) {
    try {
      this._validator.validatePostPlaylistSongsPayload(request.payload);
      const { songId } = request.payload;
      const { playlistId } = request.params;
      const { userId } = request.auth.credentials;

      await this._playlistsService.verifyPlaylistOwner(playlistId, userId);
      await this._songsService.verifyValidSong(songId);
      await this._playlistSongsService.addSongToPlaylist({ playlistId, songId });

      const response = h.response({
        status: 'success',
        message: 'Lagu berhasil ditambahkan ke playlist',
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
      return response;
    }
  }

  async getPlaylistSongsOfPlaylistByIdHandler(request, h) {
    try {
      const { userId } = request.auth.credentials;
      const { playlistId } = request.params;

      await this._playlistsService.verifyPlaylistOwner(playlistId, userId);
      const songs = await this._playlistSongsService.getSongsOfPlaylist(playlistId);

      return {
        status: 'success',
        data: {
          songs,
        },
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

  async deletePlaylistSongOfPlaylistByIdHandler(request, h) {
    try {
      this._validator.validateDeletePlaylistSongsPayload(request.payload);
      const { songId } = request.payload;
      const { userId } = request.auth.credentials;
      const { playlistId } = request.params;

      await this._playlistsService.verifyPlaylistOwner(playlistId, userId);
      await this._songsService.verifyValidSong(songId);
      await this._playlistSongsService.deleteSongOfPlaylist(playlistId, songId);

      return {
        status: 'success',
        message: 'Lagu berhasil dihapus dari playlist',
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

module.exports = PlaylistSongsHandler;
