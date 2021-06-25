const { Pool } = require('pg');
const { nanoid } = require('nanoid');
const InvariantError = require('../exceptions/InvariantError');

class MusicsService {
  constructor() {
    this._pool = new Pool();
  }

  async addMusic({
    title,
    year,
    performer,
    genre,
    duration,
  }) {
    const id = nanoid(16);
    const insertedAt = new Date().toISOString();
    const updatedAt = insertedAt;

    const query = {
      text: 'INSERT INTO musics VALUES($1, $2, $3, $4, $5, $6, $7, $8) RETURNING id',
      values: [id, title, year, performer, genre, duration, insertedAt, updatedAt],
    };

    const result = await this._pool.query(query);

    if (!result.rows[0].id) {
      throw new InvariantError('Musik gagal ditambahkan');
    }

    return result.rows[0].id;
  }
}

module.exports = MusicsService;
