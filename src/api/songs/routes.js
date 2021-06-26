const routes = (handler) => [
  {
    method: 'POST',
    path: 'songs',
    handler: handler.postSongHandler,
  },
];

module.export = routes;
