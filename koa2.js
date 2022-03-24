const Koa = require("koa");
const app = new Koa();
app.use(async (ctx, next) => {
    await next();
    ctx.body = "hello koa2";
});
app.listen(8000);
console.log("server is listening at port 3000");
