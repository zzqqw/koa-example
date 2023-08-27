/**
 * 整合所有子路由
 */
const router = require('koa-router')();
const home = require('./home')
router.use('', home.routes(), home.allowedMethods())


const api = require('./api')
router.use('/api', api.routes(), api.allowedMethods())

module.exports = router
