const path = new Map();
const everyDayDao = require("../dao/EveryDayDao")
const timeutil = require("../util/TimeUtil")
const resputil = require("../util/ResUtil")




function editEveryDay(req,res){
    req.on("data",function(data){
       
        everyDayDao.insertEveryDay(data.toString().trim(),timeutil.getNow(),function(result){
            res.writeHead(200);
            res.write(resputil.writeResult("success","添加成功",result));
            res.end();
        })
    })
}


function queryEveryDay(req,res){
   

        
        everyDayDao.findEveryDay(function(result){
       
            res.writeHead(200);
            res.write(resputil.writeResult("success","查询成功",result));
            res.end();
        })
   
}

function queryRadomEveryday(req,res){
    everyDayDao.getRadomEveryday(function(result){
        var radomNum = parseInt(Math.random()*result.length);
      
        res.writeHead(200);
        res.write(resputil.writeResult("success","查询成功",result[radomNum]));
        res.end();
    })
}
 
path.set("/editEveryDay",editEveryDay)
path.set("/queryEveryDay",queryEveryDay)
path.set("/queryRadomEveryday",queryRadomEveryday)
module.exports.path =path