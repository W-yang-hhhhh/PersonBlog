var dbutil = require("./DBUtil")


function insertBlog(title,content,tags,views,ctime,utime,success){
    let insertSql = `insert into blog (title,content,tags,views,ctime,utime) values (?,?,?,?,?,?);`;
    let params = [title,content,tags,views,ctime,utime];
    let connection = dbutil.createConnection();
    connection.connect();

   
    connection.query(insertSql,params,function(error,result){
        if(error==null){
            console.log("blog语句插入成功")
            success(result)
            
        }else{
            console.log("blog语句插入成功语句插入失败")
            console.log(error.code);
            console.log(error);
        }
    })
    connection.end();
}

function queryBlogByPage(page,pageSize,success){
    let insertSql = `select * from blog order by id desc limit ?,?`;
    let params = [page*pageSize,pageSize];
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


function queryBlogByCount(success){
    let insertSql = `select count(1) as count from blog `;
    let params = [];
    let connection = dbutil.createConnection();
    connection.connect();

   
    connection.query(insertSql,params,function(error,result){
        if(error==null){
            console.log("blogcount语句插入成功")
            success(result)
            
        }else{
            console.log("blogcount语句插入成功语句插入失败")
            console.log(error);
        }
    })
    connection.end();
}


function queryBlogById(id,success){
    let insertSql = `select *   from blog where id=? `;
    let params = [id];
    let connection = dbutil.createConnection();
    connection.connect();

   
    connection.query(insertSql,params,function(error,result){
        if(error==null){
            console.log("blogcount语句插入成功")
            success(result)
            
        }else{
            console.log("blogcount语句插入成功语句插入失败")
            console.log(error);
        }
    })
    connection.end();
}


function queryAllBlog(success){
    let insertSql = `select * from blog  `;
    let params = [];
    let connection = dbutil.createConnection();
    connection.connect();

   
    connection.query(insertSql,params,function(error,result){
        if(error==null){
            console.log("blogcount语句插入成功")
            success(result)
            
        }else{
            console.log("blogcount语句插入成功语句插入失败")
            console.log(error);
        }
    })
    connection.end();
}

function addviews (id,success){
    let insertSql = `update blog set views = views + 1 where id = ?`;
    let params = [id];
    let connection = dbutil.createConnection();
    connection.connect();

   
    connection.query(insertSql,params,function(error,result){
        if(error==null){
            console.log("blogcount语句插入成功")
            success(result)
            
        }else{
            console.log("blogcount语句插入成功语句插入失败")
            console.log(error);
        }
    })
    connection.end();
}

function queryHostBlog (size,success){
    let insertSql = `select * from blog order by views desc limit ?`;
    let params = [size];
    let connection = dbutil.createConnection();
    connection.connect();

   
    connection.query(insertSql,params,function(error,result){
        if(error==null){
            console.log("blogcount语句插入成功")
            success(result)
            
        }else{
            console.log("blogcount语句插入成功语句插入失败")
            console.log(error);
        }
    })
    connection.end();
}

/*搜索接口 */
   function querySearchWord(title,page,pageSize,success){
    let insertSql = `select * from blog where title like ? order by views desc limit ?,?`;
    let params = ["%"+title+"%",page*pageSize,pageSize];
    let connection = dbutil.createConnection();
    connection.connect();

   
    connection.query(insertSql,params,function(error,result){
        if(error==null){
            console.log("searchWord语句插入成功",result)
            success(result)

            
        }else{
            console.log("searchWord语句插入成功语句插入失败")
            console.log(error);
        }
    })
    connection.end();
   }


  
/* 搜索结果得总数*/
   function querySearchWordCount(title,success){
    let insertSql = ` select count(1) as count from blog where title like ?`;
    let params = ["%"+title+"%"];
    let connection = dbutil.createConnection();
    connection.connect();

   
    connection.query(insertSql,params,function(error,result){
        if(error==null){
            console.log("searchWord语句插入成功")
            success(result)

            
        }else{
            console.log("searchWord语句插入成功语句插入失败")
            console.log(error);
        }
    })
    connection.end();
   }




   function deleteBlog (id,success){
    let insertSql = ` delete from blog where id = ?`;
    let params = [id];
    let connection = dbutil.createConnection();
    connection.connect();

   
    connection.query(insertSql,params,function(error,result){
        if(error==null){
            console.log("blog语句删除成功")
            success(result)

            
        }else{
            console.log("blog删除成功语句插入失败")
            console.log(error);
        }
    })
    connection.end();
   }

   module.exports.deleteBlog = deleteBlog
   module.exports.querySearchWordCount = querySearchWordCount;
   module.exports.querySearchWord = querySearchWord; //模糊查询接口
module.exports.queryHostBlog = queryHostBlog; //热门博客接口
module.exports.insertBlog = insertBlog; //添加博客
module.exports.queryBlogByPage = queryBlogByPage; 
module.exports.queryBlogByCount = queryBlogByCount;
module.exports.queryBlogById = queryBlogById;
module.exports.queryAllBlog = queryAllBlog;
module.exports.addviews = addviews;