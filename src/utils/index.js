/* eslint-disable camelcase */
const mapDBToModel = ({
  id,
  title,
  year,
  performer,
  genre,
  duration,
  inserted_at,
  updated_at,
}) => ({
  id,
  title,
  year,
  performer,
  genre,
  duration,
  insertedAt: inserted_at,
  updatedAt: updated_at,
});

const formatSongList = ({
  id,
  title,
  performer,
}) => ({
  id,
  title,
  performer,
});

module.exports = { mapDBToModel, formatSongList };
