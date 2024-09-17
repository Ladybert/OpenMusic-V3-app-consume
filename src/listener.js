class Listener {
    constructor(songsOnPlaylistService, mailSender) {
      this._songsOnPlaylistService = songsOnPlaylistService;
      this._mailSender = mailSender;

      this.listen = this.listen.bind(this);
    }

    async listen(message) {
      try {
          const { playlistId, targetEmail } = JSON.parse(message.content.toString());
          const songsOnPlaylist = await this._songsOnPlaylistService.getSongsOnPlaylistById(playlistId);
          const prettyJson = JSON.stringify(songsOnPlaylist, null, 2);
          const result = await this._mailSender.sendEmail(targetEmail, prettyJson);
          
          console.log('Email sent result:', result);
        } catch (error) {
          console.error(error);
        }
      }
  }


  module.exports = Listener;