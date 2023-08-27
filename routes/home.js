/**
 * restful api 子路由
 */
const Router = require('koa-router')();

// get路由
Router.get('/', async (ctx , next)=>{
     // let n = ctx.session.visit || 0;
     // ctx.body = ctx.session.get(visit)
	 // ctx.session.visit = ++n;
     // ctx.body = "你访问本网站已经"+n + '次';
	 
	 if (!ctx.session.isnew) {
	 	ctx.session.isnew=10
	 }else {
	 	ctx.body=ctx.session.isnew
	 }

})


//用户模块
let users=require('../app/home/controller/users')
Router.get('/user/list', users.list)
      .get('/user/login', users.login)
      .post('/user/dologin', users.dologin)
      
	  .get('/user/register', users.register)
	  .get('/user/doregister', users.doregister)
      .get('/user/weixin',users.weixin)



Router.get('/default', require('../app/home/controller/home').default)

//common模块
let common= require('../app/home/controller/common')
Router.post('/sendmsg',common.sendmsg)
	  .get('/upload', common.upload)

module.exports = Router;

