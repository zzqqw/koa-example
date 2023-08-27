let xmldom=require("xmldom")


module.exports={
	randomString:function( charSet , len = 6){
		  charSet = charSet || 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
		  var str = '';
		  for (var i = 0; i < len; i++) {
		   var randomPoz = Math.floor(Math.random() * charSet.length);
		   str += charSet.substring(randomPoz,randomPoz+1);
		  }
		  return str;
	},
	xml2json:function( xml ){
		const DOMParser = xmldom.DOMParser;
		const doc = new DOMParser().parseFromString(xml);
		const result = doc.lastChild;
        const json = {};
        for(let node = result.firstChild; node !== null; node = node.nextSibling) {
            json[node.tagName] = node.firstChild.data;
        }
        return json;
	}


}
