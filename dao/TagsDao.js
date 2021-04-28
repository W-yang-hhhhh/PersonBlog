var dbutil = require("./DBUtil")



 
function insertTag(tags,ctime,utime,success){
    var insertSql = "insert into tags (tag,ctime,utime) values (?, ?, ?)";
    var params = [tags,ctime,utime];
    var connection = dbutil.createConnection();
    connection.connect();
    


 try{
    connection.query(insertSql,params,function(error,result){
        if(error==null){
            console.log("tag语句插入成功")
            success(result)
            
        }else{
            console.log("tag语句插入失败")
            console.log(error);
        }
    });
 }catch(error){console.log(123,error);}
    connection.end();
}


function queryTag(tag,success){
    let insertSql = `select * from tags where tag =?;`;
    let params = [tag];
   var connection = dbutil.createConnection();
    connection.connect();
    console.log("tags连接成功");
   
    connection.query(insertSql,params,function(error,result){
        if(error==null){
            console.log("tag语句查询成功")
            success(result)
            
        }else{
            console.log("tag语句查询失败")
            console.log(error);
        }
    })
    connection.end();
    
}
function queryRandomTags (success){
    let insertSql = `select * from tags;`;
    let params = [];
   var connection = dbutil.createConnection();
    connection.connect();
    console.log("tags连接成功");
   
    connection.query(insertSql,params,function(error,result){
        if(error==null){
            console.log("tag语句查询成功")
            success(result)
            
        }else{
            console.log("tag语句查询失败")
            console.log(error);
        }
    })
    connection.end();
}




 


module.exports.queryRandomTags =queryRandomTags;
module.exports.insertTag =insertTag;
module.exports.queryTag = queryTag;