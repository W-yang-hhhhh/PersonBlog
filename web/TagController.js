const timeutil = require("../util/TimeUtil")
const resputil = require("../util/ResUtil")
var path = new Map();
var blogdao = require("../dao/BlogDao")
var tagdao = require("../dao/TagsDao")
var tagblogmapping = require("../dao/TagBlogMappingDao")
var url =require("url");

function queryByTag(req,res){
  
    var params = url.parse(req.url,true).query;
     console.log(params);
    tagdao.queryTag(params.tag,function(result){
        if(result ==null ||result.length==0){
            res.writeHead(200);
            res.write(resputil.writeResult("success","查询成功",result));
            res.end();
        }else{
            tagblogmapping.querymappingByTagid(result[0].id,parseInt(params.page),parseInt(params.pageSize),function(result){
                var blogList = [];
                for(let i = 0 ;i<result.length;i++){
                    // console.log(result[i].blog_id,123,i,result.length);
                    blogdao.queryBlogById(result[i].blog_id ,function(result){
                        result.map((item,index)=>{
                            item.content = item.content.replace(/<img[\w\W]*">/g,"");
                   
                            item.content = item.content.replace(/<[\w\W]{1,50}>/g,"");
                            return item.content = item.content.substring(0,300)
                       })
                        blogList.push(result[0])
                    })
                  
                }
                // setTimeout(()=>{
                //     console.log(blogList.length,123);
                // console.log(blogList,123);
                // },0)
                getResult(blogList,result.length,res);
           
            })
        }
    })
   
}



function queryBlogCountByTag(req,res){
    var params = url.parse(req.url,true).query;
   
    tagdao.queryTag(params.tag,function(result){
        tagblogmapping.queryBlogCountByTag(result[0].id,function(result){
            res.writeHead(200);
            res.write(resputil.writeResult("success","查询数量成功",result));
            res.end();
        })
    })
}



 //新知识***
function getResult(bloglist,len,res){
    if(bloglist.length<len){
        setTimeout(()=>{
            getResult(bloglist,len,res);
        },1000)
    }else{
        console.log(bloglist);
        res.writeHead(200);
        res.write(resputil.writeResult("success","查询成功",bloglist));
        res.end();
    }
}

path.set("/queryBlogCountByTag",queryBlogCountByTag)
path.set("/queryByTag",queryByTag)

module.exports.path =path;