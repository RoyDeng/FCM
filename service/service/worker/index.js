const queue = require("../queue/rabbitmq");
const fcm = require("../message");

queue.consume("notification.fcm", (message) => {
    const content = message.content.toString();
    console.log("[Worker] Send FCM Message", content);
    fcm.sendFCM(content);
});

queue.consume("notification.done", (message) => {
    console.log("[Worker] Complete FCM Message", message.content.toString());
});