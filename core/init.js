const requireDirectory = require("require-directory");
const Router = require("koa-router");

class InitManager {
  static initCore(app) {
    //入口方法
    InitManager.app = app;
    InitManager.initLoadRouters();
    InitManager.loadHttpException();
    InitManager.loadConfig();
  }

  static loadConfig(path = '') {
    //导入配置文件
    const configPath = path || process.cwd() + '/config/config.js';
    const config = require(configPath);
    global.config = config
  }

  static initLoadRouters() {
    //初始化路由注入
    const apiDirectory = `${process.cwd()}/app/api`;
    requireDirectory(module, apiDirectory, { visit: whenLoadModule });
    function whenLoadModule(obj) {
      if (obj instanceof Router) {
        InitManager.app.use(obj.routes());
      }
    }
  }

  static loadHttpException() {
    global.errs = require("./http-exception");
  }
}

module.exports = InitManager;
