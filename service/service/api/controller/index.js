const Event = require("events");
const validator = require("validator");
const JobService = require("../service/job");

const send = async (ctx) => {
    const identifier = validator.trim(ctx.request.body.identifier);
    const type = validator.trim(ctx.request.body.type);
    const deviceId = validator.trim(ctx.request.body.deviceId);
    const text = validator.trim(ctx.request.body.deviceId);
    const event = new Event();

    event.on("error", msg => {
        ctx.status = 422
        ctx.body = {
            error: msg
        }
    });

    if ([identifier, type, deviceId, text].some(item => { return item === "" })) {
        event.emit("error", "訊息資料不可為空");
        return;
    }

    try {
        const job = await JobService.send({
            "identifier": identifier,
            "type": type,
            "deviceId": deviceId,
            "text": text
        });
        ctx.status = 200;
        ctx.body = {
            "identifier": job.identifier,
            "type": job.type,
            "deviceId": job.deviceId,
            "text": job.text
        };
    } catch (err) {
        console.error("[API] Add message task failed.", err);
        event.emit("error", "傳送訊息失敗");
    }
};

module.exports = {
    send
};