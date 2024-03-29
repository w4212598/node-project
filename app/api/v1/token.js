const Router = require("koa-router");
const { TokenValidator, NotEmptyValidator } = require("../../validators/validator");
const { User } = require("../../models/user");
const { LoginType } = require("../../lib/enum");
const { generateToken } = require("../../../core/util");
const { Auth } = require("../../../middlewares/auth");
const { WXManager } = require("../../services/wx");

const router = new Router({
    prefix: '/v1/token' // 路由前缀
});

router.post('/', async (ctx)=>{
    const v = await new TokenValidator().validate(ctx);
    let token;
    switch (v.get('body.type')){
        case LoginType.USER_EMAIL:
            token = await emailLogin(v.get('body.account'), v.get('body.secret'));
            break;
        case LoginType.USER_MINI_PROGRAM:
            token = await WXManager.codeToToken(v.get('body.account'));
            break;
        default:
            throw new global.errs.ParameterException('没有相应的处理函数')
    }
    ctx.body = {
        token
    }
});

router.post('/verify', async(ctx)=>{
    const v = await new NotEmptyValidator().validate(ctx);
    const result = Auth.verifyToken(v.get('body.token'));
    ctx.body = {
        result
    }
});

async function emailLogin(account, secret){
    const user = await User.verifyEmailPassword(account, secret);
    return generateToken(user.id, 8)
}

module.exports = router;
