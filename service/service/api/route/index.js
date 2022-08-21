const Router = require("koa-router");
const router = new Router();
const FCMController = require("../controller/index");

router.post("/api/message/send", FCMController.send);

module.exports = router;