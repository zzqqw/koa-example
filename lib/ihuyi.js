// 您的验证码是："+code+"。请不要把验证码泄露给其他人。

// let spidex = require("spidex");
let config=require('../config/default.js');
let xmldom=require("xmldom")
var ihuyi =function (account, password){
    this.account = account    || config.ihuyi.account,
    this.password = password  || config.ihuyi.password,
    this.sendurl = "http://106.ihuyi.cn/webservice/sms.php?method=Submit"
}


ihuyi.prototype.sendmsg=function(mobile, content){
     return new Promise(( resolve, reject )=>{
        require("spidex").post(this.sendurl, {
            data:{
                account:  this.account,
                password: this.password,
                mobile :  mobile,
                content : content
            }
        }, function(html) {
            //将xml转json
            xml = html.replace(/(\r|\n|( xmlns="http:\/\/106.ihuyi.com\/"))/g, "");
            const DOMParser = xmldom.DOMParser;
            const doc = new DOMParser().parseFromString(xml);
            const result = doc.lastChild;
            const json = {};
            for(let node = result.firstChild; node !== null; node = node.nextSibling) {
                json[node.tagName] = node.firstChild.data;
            }
            resolve(json);

        }).on("error", function(err) {
            reject(err);
        });
     })

}
module.exports = ihuyi;
