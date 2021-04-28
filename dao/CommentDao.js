var dbutil = require("./DBUtil")



function addComment(bid,name,email,parent,content,ctime,utime,parentname,success){
    let insertSql = `insert into comments (blog_id,parent,user_name,email,comments,ctime,utime,parent_name) values (?,?,?,?,?,?,?,?);`;
    let params = [bid,parent,name,email,content,ctime,utime,parentname];
    let connection = dbutil.createConnection();
    connection.connect();

   
    connection.query(insertSql,params,function(error,result){
        if(error==null){
            console.log("blog语句插入成功")
            success(result)
            
        }else{
            console.log("blog语句插入成功语句插入失败")
            console.log(error);
        }
    })
    connection.end();
}
function queryCommentsByBlogId(bid,success){
    let insertSql = `select * from comments where blog_id = ?;`;
    let params = [bid];
    let connection = dbutil.createConnection();
    connection.connect();

   
    connection.query(insertSql,params,function(error,result){
        if(error==null){
            console.log("blog语句插入成功")
            success(result)
            
        }else{
            console.log("blog语句插入成功语句插入失败")
            console.log(error);
        }
    })
    connection.end();
}


function queryNearlyComment(size,success){
    let insertSql = `select * from comments order by ctime desc limit  ?;`;
    let params = [size];
    let connection = dbutil.createConnection();
    connection.connect();

   
    connection.query(insertSql,params,function(error,result){
        if(error==null){
            console.log("blog语句插入成功")
            success(result)
            
        }else{
            console.log("blog语句插入成功语句插入失败")
            console.log(error);
        }
    })
    connection.end();
}

module.exports.addComment = addComment;
module.exports.queryCommentsByBlogId = queryCommentsByBlogId;
module.exports.queryNearlyComment = queryNearlyComment;