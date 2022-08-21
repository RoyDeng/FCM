const originalFetch = require("isomorphic-fetch");
const fetch = require("fetch-retry")(originalFetch);
const queue = require("../queue/rabbitmq");
const models = require("../api/model");
const Job = models.Job;

const FetchRetries = 2;
const FetchRetryDelay = 800;
const FetchDefaults = {
    retries: FetchRetries,
    retryDelay: FetchRetryDelay
};

const saveFCMJob = async (job) => {
    const result = await Job.create(job);
    queue.sendToQueue("notification.done", result);
    console.log("[FCM] Save & Publish FCM Message", result);
}

const sendFCM = (content) => {
    const FCMMessage = JSON.parse(content);
    const identifier = FCMMessage.identifier;
    const deviceId = FCMMessage.deviceId;
    const body = FCMMessage.text;

    const job = {
        "identifier": identifier
    };

    fetch("https://fcm.googleapis.com/fcm/send", {
        ...FetchDefaults,
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `key=${process.env.FCM_KEY}`
        },
        body: JSON.stringify({
            "to": deviceId,
            "notification": {
                "title": "Incoming message",
                "body": body
            }
        })
    }).then(async (response) => {
        const body = await response.json();

        if (body.failure) {
            console.error("[FCM] There was an error sending the message.", body.results[0].error);
        } else {
            const job = {
                "identifier": identifier
            };

            saveFCMJob(job);
        }
    }).catch((error) => {
        console.error("[FCM] There was an error sending the message.", error);
    });
}

module.exports = {
    sendFCM: sendFCM
};