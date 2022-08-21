const Koa = require("koa");
const bodyParser = require("koa-bodyparser");
const router = require("../api/route");

const app = new Koa();

app.use(bodyParser())
app.use(router.routes()).use(router.allowedMethods())

app.listen(process.env.API_PORT);
console.info("API is listening on port.", process.env.API_PORT);