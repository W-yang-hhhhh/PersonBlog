let dbutil = require("./DBUtil")

function insertTagBlogMapping(tagid,blogid,ctime,utime,success){
   
    var insertSql = "INSERT INTO tag_blog_mapping (tag_id,blog_id, ctime,utime) values (?,?,?,?)";
    var params = [tagid,blogid,ctime,utime];
    var connection = dbutil.createConnection();
    connection.connect();
    console.log("连接成功");
   
    connection.query(insertSql,params,function(error,result){
        if(error==null){
            console.log("映射语句插入成功")
            success(result)
            
        }else{
            console.log("映射语句插入失败")
            console.log(error);
        }
    })
    connection.end();
   

}


function querymappingByTagid(tagid,page,pageSize,success){
     
    let insertSql = `select * from tag_blog_mapping where tag_id = ? limit ?,?;`;
    let params = [tagid,page*pageSize,pageSize];
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


function queryBlogCountByTag(tagid,success){
    let insertSql = `select count(1) as count from tag_blog_mapping where tag_id = ?;`;
    let params = [tagid];
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
module.exports.queryBlogCountByTag =queryBlogCountByTag;
module.exports.querymappingByTagid =querymappingByTagid;
module.exports.insertTagBlogMapping = insertTagBlogMapping;
// module.exports.findEveryDay = findEveryDay;