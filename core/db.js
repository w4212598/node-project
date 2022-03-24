const Sequelize = require('sequelize');
const { dbName, host, port, user, password } = require('../config/config').database;

const sequelize = new Sequelize(dbName, user, password, {
    dialect: 'mysql', //数据库类型
    host,
    port,
    // logging: true, //是否在数据库显示数据库操作
    timezone: '+08:00', //时区
    define: {
        timestamps: true, //是否自动创建 createAt, updatedAt字段
        paranoid: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        deleteAt: 'delete_at',
        underscored: true, //是否开启驼峰转下划线，只对外键、timestamps、以及设置了field的字段有效
    }
});

sequelize.sync({
    force: false
}); // 同步在数据库中的模型(刷新数据库)

module.exports = {
    sequelize
};
