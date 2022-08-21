const queue = require("../../queue/rabbitmq");
const models = require("../model");
const Job = models.Job;

module.exports = {
    async send(message) {
        queue.sendToQueue("notification.fcm", message);
        return {
            "msg": "The message will be processed."
        };
    }
};