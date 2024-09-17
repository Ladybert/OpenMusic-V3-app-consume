class Listener {
    constructor(songsOnPlaylistService, mailSender) {
      this._songsOnPlaylistService = songsOnPlaylistService;
      this._mailSender = mailSender;

      this.listen = this.listen.bind(this);
    }

    async listen(message) {
      try {
        const { playlistId, targetEmail } = JSON.parse(message.content.toString());
        const playlist = await this._songsOnPlaylistService.getSongsOnPlaylistById(playlistId);
        const result = JSON.stringify({
          playlist,
        }, null, 2);
        await this._mailSender.sendEmail(targetEmail, result);
        } catch (error) {
          console.error(error);
        }
      }
  }


  module.exports = Listener;