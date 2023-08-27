let str=require('./../../../lib/str.js');
let huyi=require('./../../../lib/ihuyi.js')
module.exports={
	async sendmsg(ctx , next){
		let postdata=ctx.request.body
		let nowserver=new Date().getTime()
		if (nowserver<=postdata.now) {
			ctx.body={code:0,msg:'失败',data:{}}
		}else {

			let code =str.randomString('1234567890',4)
			//保存在session中
			ctx.session.vcode=code
			// 发送验证码
			let i=new huyi();
			html= await i.sendmsg(postdata.mobile,"您的验证码是："+code+"。请不要把验证码泄露给其他人。")
			//返回客户端
	  		if (parseInt(html.code)=== 2) {
	  			ctx.body={code:parseInt(html.code),msg:html.msg,data:{}}	
	  		}else{
	  			ctx.body={code:parseInt(html.code),msg:"无法联系服务器，请稍后再试试",data:{}}	
	  		}
		}


	},
	async upload(ctx , next){
		ctx.body='upload'
	},
}

