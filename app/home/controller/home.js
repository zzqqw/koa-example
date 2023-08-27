module.exports={
	async default(ctx , next){
 	  let title = 'hello kaoa'
	  await ctx.render('home/default', {
	    title,
	  })
	},
}

