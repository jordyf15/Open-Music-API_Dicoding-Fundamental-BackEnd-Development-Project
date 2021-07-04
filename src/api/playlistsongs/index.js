const routes = require('./routes');
const PlaylistSongsHandler = require('./handler');

module.exports = {
  name: 'playlistsongs',
  version: '1.0.0',
  register: async (server, {
    validator,
    songsService,
    playlistsService,
    playlistSongsService,
  }) => {
    const playlistSongsHandler = new PlaylistSongsHandler(songsService,
      playlistsService, playlistSongsService, validator);

    server.route(routes(playlistSongsHandler));
  },
};
