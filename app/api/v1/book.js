const Router = require('koa-router');

const router = new Router();

router.post('/v1/:id/book/latest',(ctx, next)=>{
    ctx.body = { key: 'book'}
});

module.exports = router;
