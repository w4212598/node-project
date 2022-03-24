module.exports = {
    environment: 'dev', // prod or dev,
    database: {
        dbName: 'node_app',
        host: 'localhost',
        port: 3306,
        user: 'root',
        password: '940410'
    },
    security: {
        secretKey: "abcdefg",
        expiresIn: 60 * 60 * 24 * 30
    },
    wx: {
        appId: 'wx88b2f3642cf0c8b3',
        appSecret: '24e7bc107280f94754f3a100a11f1a82',
        loginUrl: 'https://api.weixin.qq.com/sns/jscode2session?appid=%s&secret=%s&js_code=%s&grant_type=authorization_code',
    }
};
