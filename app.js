//加载配置文件
const config=require('./config/default.js');

const path = require('path')

//加载koa
const Koa = require('koa');

//实例化koa
const app = new Koa();

//seesion配置
app.keys = ['koa demo'];
const session = require('koa-session');
const CONFIG = {
  key: 'koa:sess',
};
app.use(session(CONFIG, app))


// 使用ctx.body解析中间件
const bodyParser = require('koa-bodyparser')
app.use(bodyParser())


// 加载模板引擎
const views = require('koa-views');
app.use(views(path.join(__dirname, 'views'), {
  extension: 'ejs'
}))




// 静态资源目录对于相对入口文件index.js的路径
const static = require('koa-static')
app.use(static(
  path.join( __dirname,  './')
))



// const routers=require('./routes/route');
// 初始化路由中间件
app.use(require('./routes/route').routes()).use(require('./routes/route').allowedMethods())

//监听端口
app.listen(config.port, () => {
  console.log('127.0.0.1:'+config.port)
})