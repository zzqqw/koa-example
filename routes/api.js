/**
 * restful api 子路由
 */
const Router = require('koa-router')();

// get路由
Router.get('/', async (ctx , next)=>{
  ctx.body = 'this is api'
  
})



module.exports = Router;