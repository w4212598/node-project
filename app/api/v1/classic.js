const Router = require("koa-router");
const { Auth } = require("../../../middlewares/auth");
const { Flow } = require("../../models/flow");
const { Art } = require("../../models/art");

const router = new Router({
  prefix: "/v1/classic",
});

router.get("/latest", new Auth(2).m, async (ctx, next) => {
  const flow = await Flow.findOne({
    order: [
      ["index", "DESC"], //指明使用index字段排序
    ],
  });
  const art = (await Art.getData(flow.artId, flow.type)) || {};
  art.setDataValue("index", flow.index);
  ctx.body = art;
});

module.exports = router;
