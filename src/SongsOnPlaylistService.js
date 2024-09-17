const { Pool } = require('pg');
 
class SongsOnPlaylistService {
  constructor() {
    this._pool = new Pool();
  }

  async getSongsOnPlaylistById(playlistId) {
    const query = {
        text: `
            SELECT 
                playlists.id AS playlist_id, 
                playlists.name AS playlist_name, 
                songs.id AS song_id, 
                songs.title AS song_title, 
                songs.performer AS song_performer
            FROM playlists
            LEFT JOIN playlist_songs ON playlist_songs.playlist_id = playlists.id
            LEFT JOIN songs ON playlist_songs.song_id = songs.id
            WHERE playlists.id = $1
        `,
        values: [playlistId],
    };

    const result = await this._pool.query(query);

    if (!result.rowCount) {
        return "terdapat kesalahan saat mengeksekusi kueri";
    }

    return result.rows;
  }

}

module.exports = SongsOnPlaylistService;