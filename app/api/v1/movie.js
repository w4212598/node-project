const Router = require("koa-router");
const { Auth } = require('../../../middlewares/auth');
const { Movie } = require("../../models/classsic");

const router = new Router({
    prefix: '/v1/movie'
});

router.get("/list", new Auth(2).m, async (ctx, next) => {
    const result = await Movie.findAll();
    ctx.body = result

});

module.exports = router;
