const { Pool } = require('pg');
 
class SongsOnPlaylistService {
  constructor() {
    this._pool = new Pool();
  }

  async getSongsOnPlaylistById(playlistId) {
     const playlistQuery = {
      text: "SELECT id, name FROM playlists WHERE id = $1",
      values: [playlistId],
    };

    const playlistResult = await this._pool.query(playlistQuery);
    const playlist = playlistResult.rows[0];

    const songsQuery = {
      text: `SELECT songs.id, songs.title, songs.performer 
             FROM playlist_songs
             LEFT JOIN songs ON playlist_songs.song_id = songs.id
             WHERE playlist_songs.playlist_id = $1`,
      values: [playlistId],
    };

    const songsResult = await this._pool.query(songsQuery);
    const songs = songsResult.rows;

    const result = {
      id: playlist.id,
      name: playlist.name,
      songs,
    };

    return result;
  }


}

module.exports = SongsOnPlaylistService;