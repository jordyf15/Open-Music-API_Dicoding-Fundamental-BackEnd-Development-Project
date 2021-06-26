class SongsHandler {
  constructor(service) {
    this._service = service;
  }

  async postSongHandler(request, h) {
    try {
      const {
        title,
        year,
        performer,
        genre,
        duration,
      } = request.payload;
      const songId = await this._service.addSong({
        title,
        year,
        performer,
        genre,
        duration,
      });
      const response = h.response({
        status: 'success',
        message: 'Lagu berhasil ditambahkan',
        data: {
          songId,
        },
      });
      response.code(201);
      return response;
    } catch (error) {
      console.error(error);
      return 'asd';
    }
  }
}

module.exports = SongsHandler;
