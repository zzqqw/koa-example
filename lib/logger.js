/*
    const log=require('./common/logger.js');
    const logger = log4js.getLogger()//根据需要获取logger
    const errlogger = log4js.getLogger('err')
    const othlogger = log4js.getLogger('oth')
    //结合koa使用，记录请求日志
    const Koa = require('koa')
    const app = new Koa();
    const Router = require('koa-router')();
    app.use(Router.routes());
    //路由
    Router.get('/', async ( ctx )=>{logger.resLogger(ctx);})

    //手动记录，可以代替console.log
    logger.info('test info 1')
    errlogger.err('test error 1')

 */
const log4js = require('log4js')
log4js.configure({
    replaceConsole: true,
    appenders: {
        stdout: {//控制台输出
            type: 'stdout'
        },
        response: {//请求日志
            type: 'dateFile',
            filename: 'cache/logs/',
            pattern: 'response-yyyyMMdd.log',
            alwaysIncludePattern: true
        },
        error: {//错误日志
            type: 'dateFile',
            filename: 'cache/logs/',
            pattern: 'error-yyyyMMdd.log',
            alwaysIncludePattern: true
        },
        other: {//其他日志
            type: 'dateFile',
            filename: 'cache/logs/',
            pattern: 'other-yyyyMMdd.log',
            alwaysIncludePattern: true
        }
    },
    categories: {
        default: { appenders: ['response'], level: 'debug' },
        error:   { appenders: ['error'], level: 'error' },
        other:   { appenders: ['other'], level: 'info' },

        // default: { appenders: ['stdout', 'response'], level: 'debug' },
        // error: { appenders: ['stdout', 'error'], level: 'error' },
        // other: { appenders: ['stdout', 'other'], level: 'info' },
    }
});

const resLogger = log4js.getLogger('response');
const errLogger = log4js.getLogger('error');
const othLogger = log4js.getLogger('other');


// 封装响应日志
exports.resLogger = (ctx, resTime) => {
    if(ctx) {
        resLogger.info(JSON.stringify(ctx,resTime));
    }
};

 //name取categories项
exports.getLogger = function (name) {
    return log4js.getLogger(name || 'default')
};

