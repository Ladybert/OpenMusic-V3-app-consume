require('dotenv').config();

const amqp = require('amqplib');
const MailSender = require('./MailSender');
const Listener = require('./listener');
const SongsOnPlaylistService = require('./SongsOnPlaylistService');

const init = async () => {
    const songsOnPlaylistService = new SongsOnPlaylistService();
    const mailSender = new MailSender();
    const listener = new Listener(songsOnPlaylistService, mailSender);

    const connection = await amqp.connect(process.env.RABBITMQ_SERVER);
    const channel = await connection.createChannel();

    await channel.assertQueue('export:songsOnplaylist', {
        durable: true,
      });

      channel.consume('export:songsOnplaylist', listener.listen, { noAck: true });
};
init();
