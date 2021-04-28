
const timeutil = require("../util/TimeUtil")
const resputil = require("../util/ResUtil")
var path = new Map();
var blogdao = require("../dao/BlogDao")
var tagdao = require("../dao/TagsDao")
var tagblogmapping = require("../dao/TagBlogMappingDao")
var url =require("url");
const { transcode } = require("buffer");
function  editBlog(req,res){
    var params = url.parse(req.url,true).query;
    
    var tags = params.tags.replace(/ /g,"").replace(/，/g,",")
    
   
   req.on("data",function(data){
   
      blogdao.insertBlog(params.title,data.toString(),tags,0,timeutil.getNow(),timeutil.getNow(),function(result){
          res.writeHead(200);
          res.write(resputil.writeResult("success","添加成功",null));
          res.end();
          var blogid = result.insertId;
          var tagList = tags.split(",");
        
          for(var i =0;i<tagList.length ;i++){
              if(tagList[i]==""){
                  continue;
              }
              queryTag(tagList[i],blogid)
          }
      })

   })
}
 
//查询标签
function queryTag(tag,blogid){
    tagdao.queryTag(tag,function(result){
      
        if(result == null || result.length ==0){
            insertTag(tag,blogid);

        }else{
           insertTagBlogMapping(result[0].id,blogid);
        }

    });
}

//添加标签
function insertTag(tag,blogid){
    tagdao.insertTag(tag,timeutil.getNow(),timeutil.getNow(),function(result){
       
        insertTagBlogMapping(result.insertId,blogid)
    })
}
//添加 标签与 博客 映射
function insertTagBlogMapping(tagid,blogid){
    tagblogmapping.insertTagBlogMapping(tagid,blogid,timeutil.getNow(),timeutil.getNow(),function(result){

    })
}
//删除博客

function deleteBlog(req,res){
    
    req.on("data",function(data){
        let id = data.toString().split('=')[1]
       
        blogdao.deleteBlog(parseInt(id),function(result){
            res.writeHead(200);
            res.write(resputil.writeResult("success","删除成功",null));
            res.end();
            
        })
  
     })
}

function queryBlogByPage(req,res){
 var params = url.parse(req.url,true).query;
 blogdao.queryBlogByPage(parseInt(params.page),parseInt(params.pageSize),function(result){
    result.map((item,index)=>{
         item.content = item.content.replace(/<img[\w\W]*">/g,"");

         item.content = item.content.replace(/<[\w\W]{1,50}>/g,"");
         return item.content = item.content.substring(0,300)
    })
    
     res.writeHead(200);
     res.write(resputil.writeResult("success","查询成功",result));
     res.end();
 })
}

function queryBlogCount(req,res){
    
  
    blogdao.queryBlogByCount(function(result){
     
         res.writeHead(200);
         res.write(resputil.writeResult("success","查询成功",result));
         res.end();
    
   })
   }

function queryBlogById(req,res){
    var params = url.parse(req.url,true).query;
     
        blogdao.queryBlogById(parseInt(params.bid),function(result){
            res.writeHead(200);
            res.write(resputil.writeResult("success","查询成功",result));
            res.end();
            blogdao.addviews(parseInt(params.bid),function(result){
                console.log("result:",result);
            })
        })
 
}

function queryAllBlog(req,res){
    blogdao.queryAllBlog(function(result){
        res.writeHead(200);
        res.write(resputil.writeResult("success","查询成功",result));
        res.end();
    })
}


function queryRandomTags(req,res){
    tagdao.queryRandomTags(function(result){
        res.writeHead(200);
        res.write(resputil.writeResult("success","查询成功",result));
        res.end();
    })
}


function queryHostBlog (req,res){
    blogdao.queryHostBlog(10,function(result){
        res.writeHead(200);
        res.write(resputil.writeResult("success","查询成功",result));
        res.end();
    })
}


function querySearchWord(req,res){
     var params = url.parse(req.url,true).query;
   
    console.log(params);
     blogdao.querySearchWord(params.searchWord,parseInt(params.page),parseInt(params.pageSize),function(result){
        result.map((item,index)=>{
            item.content = item.content.replace(/<img[\w\W]*">/g,"");
   
            item.content = item.content.replace(/<[\w\W]{1,50}>/g,"");
            return item.content = item.content.substring(0,300)
       })
            res.writeHead(200);
            res.write(resputil.writeResult("success","搜索语句查询成功",result));
            res.end();
     })
}
    
function querySearchWordCount(req,res){

    var params = url.parse(req.url,true).query;

    blogdao.querySearchWordCount(params.searchWord,function(result){
        res.writeHead(200);
        res.write(resputil.writeResult("success","搜索语句查询成功",result));
        res.end();
         
       
    })

}
path.set("/deleteBlog",deleteBlog)
path.set("/querySearchWordCount",querySearchWordCount)
path.set("/querySearchWord",querySearchWord)
path.set("/queryHostBlog",queryHostBlog)
path.set("/queryRandomTags",queryRandomTags)
path.set("/queryAllBlog",queryAllBlog)
path.set("/editBlog",editBlog);
path.set("/queryBlogByPage",queryBlogByPage);
path.set("/queryBlogCount",queryBlogCount);
path.set("/queryBlogById",queryBlogById)

module.exports.path =path