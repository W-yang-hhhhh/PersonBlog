var fs = require("fs");
var globalConfig  = require("./config");
var controllerSet =[];
var path = require("path")
var pathMap = new  Map();
console.log(globalConfig["web_path"])
var webPath = path.resolve(__dirname,"./"+globalConfig["web_path"])
var files = fs.readdirSync(webPath);

 
for(var i =0;i<files.length ;i++){
    var temp = require("./" + globalConfig["web_path"]+"/" + files[i]);
    if(temp.path){
        for(var [key,value] of temp.path){
            if(pathMap.get(key)==null){
                pathMap.set(key,value);
            }else{
                throw new Error("url path 异常，url:"+key);
            }
            controllerSet.push(temp)
        }
    }
}


module.exports = pathMap