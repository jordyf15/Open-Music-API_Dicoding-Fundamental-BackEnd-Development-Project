require('dotenv').config();

const Hapi = require('@hapi/hapi');

const songs = require('./api/songs');
const SongsService = require('./services/songsService');
const SongsValidator = require('./validator/songs');

const users = require('./api/users');
const UsersService = require('./services/usersService');
const UsersValidator = require('./validator/users');

const init = async () => {
  const server = Hapi.server({
    port: process.env.PORT,
    host: process.env.HOST,
    routes: {
      cors: {
        origin: ['*'],
      },
    },
  });

  const songsService = new SongsService();
  const usersService = new UsersService();

  await server.register([
    {
      plugin: songs,
      options: {
        service: songsService,
        validator: SongsValidator,
      },
    },
    {
      plugin: users,
      options: {
        service: usersService,
        validator: UsersValidator,
      },
    },
  ]);
  await server.start();
  console.log(`Server berjalan pada ${server.info.uri}`);
};

init();
