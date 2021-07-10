const ClientError = require('../../exceptions/ClientError');

class UploadsHandler {
  constructor(service, validator) {
    this._service = service;
    this._validator = validator;

    this.postUploadPictureHandler = this.postUploadPictureHandler.bind(this);
  }

  async postUploadPictureHandler(request, h) {
    try {
      const { data } = request.payload;
      this._validator.validatePictureHeaders(data.hapi.headers);

      const filename = await this._service.writeFile(data, data.hapi);

      const response = h.response({
        status: 'success',
        message: 'Gambar berhasil diunggah',
        data: {
          pictureUrl: `http://${process.env.HOST}:${process.env.PORT}/upload/pictures/${filename}`,
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
}

module.exports = UploadsHandler;
