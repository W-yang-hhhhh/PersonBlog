let dbutil = require("./DBUtil")

function inserEveryDay(content,ctime,success){
   
    var insertSql = "INSERT INTO everyday (content, ctime) values (?,?)";
    var params = [content,ctime];
    var connection = dbutil.createConnection();
    connection.connect();
    console.log("连接成功");
   
    connection.query(insertSql,params,function(error,result){
        if(error==null){
            console.log("语句插入成功")
            success(result)
            
        }else{
            console.log("语句插入失败")
            console.log(error);
        }
    })
    connection.end();
   

}

function findEveryDay(success){
    try{
        var findsql ="SELECT * from everyday order by id desc limit 1;";

     var connection = dbutil.createConnection();
    connection.connect();
    console.log("连接成功");
     
    connection.query(findsql,function(error,result){
        if(error==null){
            console.log("语句查询成功")

            success(result)
            
        }else{
            console.log("语句查询失败")
            console.log(error);
        }
    })
    connection.end();
    }catch(error){
console.log(error);
    }
}

function getRadomEveryday(success){
    try{
        var findsql ="SELECT * from everyday;";

    var connection = dbutil.createConnection();
    connection.connect();
    console.log("连接成功");
     
    connection.query(findsql,function(error,result){
        if(error==null){
            console.log("语句查询成功")

            success(result)
            
        }else{
            console.log("语句查询失败")
            console.log(error);
        }
    })
    connection.end();
    }catch(error){
console.log(error);
    }
}
 

module.exports.insertEveryDay = inserEveryDay;
module.exports.findEveryDay = findEveryDay;
module.exports.getRadomEveryday=getRadomEveryday;