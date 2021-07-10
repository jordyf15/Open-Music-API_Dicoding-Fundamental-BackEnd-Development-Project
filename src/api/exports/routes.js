const routes = (handler) => [
  {
    method: 'POST',
    path: '/exports/playlists/{playlistId}',
    handler: handler.postExportPlaylistByIdHandler,
    options: {
      auth: 'openmusic_jwt',
    },
  },
];

module.exports = routes;
