const amqplib = require("amqplib");

const connect = () =>
  amqplib.connect(process.env.AMQP_URL).then((conn) => conn.createChannel());

const createQueue = (channel, queue) => {
  channel.assertQueue(queue, { durable: true });
  return channel;
};

const sendToQueue = (queue, message) =>
  connect()
    .then((channel) => createQueue(channel, queue))
    .then((channel) =>
      channel.sendToQueue(queue, Buffer.from(JSON.stringify(message)))
    )
    .catch((err) => console.log(err));

const consume = (queue, callback) =>
  connect()
    .then((channel) => createQueue(channel, queue))
    // .then((channel) => channel.prefetch(parseInt(process.env.AMQP_CONSUMER_PREFETCH, 10) ? parseInt(process.env.AMQP_CONSUMER_PREFETCH, 10) : 10))
    .then((channel) => channel.consume(queue, callback, { noAck: true }))
    .catch((err) => console.log(err));

module.exports = {
  consume,
  sendToQueue,
};