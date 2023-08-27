
const userServer=require('./../server/userServer');
const validator = require('validator');

module.exports = {
	async list(ctx,next){
		await ctx.render('home/')
	},
	async login(ctx,next){
		await ctx.render('home/login')
	},
	/**
     * 登录操作
     * @param  {obejct} ctx 上下文对象
     */
	async dologin(ctx){
		//获取值
		let formData = ctx.request.body
		// 返回值
	    let res = {
  		  code: ctx.response.status,
	      msg: '',
	      data: null,
	    }

	    // 验证数据是否合法
	    if (!validator.isMobilePhone(formData.mobile,'any')) {
	    	let res={
	    		code:0,
	    		msg:"输入的手机号有误"
	    	}
	    }
	    //验证数据库
		// let userResult = await userServer.signIn( formData )

		// cookies保存
		// ctx.cookies.set('user',  userResult);

		ctx.body = res; 
	},


	async register(ctx,next){
		await ctx.render('home/register')
	},

	async doregister(ctx,next){
		// 返回值
	    let res = {
  		  code: ctx.response.status,
	      msg: '',
	      data: null,
	    }

		let postData = ctx.request.body
		// 验证数据是否合法
	    if (!validator.isMobilePhone(formData.mobile,'any')) {
	    	ctx.body = {code:0,msg:"输入的手机号有误"} 
	    	return
	    }
	    let vcode = ctx.session.vcode
	    if (vcode!=formData.code) {
			ctx.body = {code:0,msg:"您输入的手机验证码有误"}
			return
	    }
	    let  existOne= await userServer.getExistOne( formData )
		if ( existOne ) {
			if (existOne===formData.mobile) {
				ctx.body = {code:0,msg:"您已经注册过了哦"}
				return
			}
		}
		
		let userResult = await userInfoService.create({
		      phone: formData.mobile,
		      password: formData.password,
		      create_time: new Date().getTime(),
	    })

	    if ( userResult && userResult.insertId * 1 > 0) {
	     	res = {code:0,msg:"注册成功"}
	    }
		ctx.body= res

	},


	async weixin(ctx,next){

		let appid="wx9cb4354d2467326c";
		let appsecret="d97e2ce5e057db054cf1e2fc0bada3cb";

		let code =ctx.request.query.code

		if (typeof code == 'undefined') {
			  let info = {
			    appid: appid,
			    redirect_uri: ctx.href,
			    response_type: 'code',
			    scope:  'snsapi_base',
			    state:  ''
			  };
           	 let AuthorizeURL='https://open.weixin.qq.com/connect/oauth2/authorize?' + require('querystring').stringify(info) + '#wechat_redirect';
             //重定向
 		     ctx.redirect(AuthorizeURL)
		}else{
				
                var info = {
                  appid: appid,
                  secret: appsecret,
                  code: code,
                  grant_type: 'authorization_code'
                };
				let access_token="https://api.weixin.qq.com/sns/oauth2/access_token?"+require('querystring').stringify(info)
				ctx.body=access_token
            
		}
			
	},

}

