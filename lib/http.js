let spidex =require('spidex');
module.exports={
	requestUrl:function(url,opts=[]){
		return new Promise((resolve,reject)=>{
			spidex.get(url, opts, function(html){
				// console.log(html)
				resolve(html)
			}).on("error", function(err){
				reject(err)
			});
		})
	}
}
