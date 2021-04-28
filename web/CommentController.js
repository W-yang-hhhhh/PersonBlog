const timeutil = require("../util/TimeUtil")
const resputil = require("../util/ResUtil")
const path = new Map();
const commentDao = require("../dao/CommentDao")
const url = require("url");
//生成验证码 的库
const svgCaptcha = require("svg-captcha")
function addComment(req,res){

   var params = url.parse(req.url,true).query;
   commentDao.addComment(parseInt(params.bid),params.userName,params.email,parseInt(params.parent),params.content,timeutil.getNow(),timeutil.getNow(),params.parentname,function(result){
       res.writeHead(200);
       res.write(resputil.writeResult("success","评论成功",null));
       res.end();
   })
}


function queryRandomCode (req,res){
    var captcha = svgCaptcha.create({
        fontSize:50,
        width:100,
        height:34
    });
     
    // req.session.captcha = captcha.text;
   
    res.writeHead(200)
    res.write(resputil.writeResult("success","成功",captcha));
    // res.status(200).write(captcha)
    res.end();
    }
function queryCommentsByBlogId(req,res){
    var params = url.parse(req.url,true).query;
    commentDao.queryCommentsByBlogId(parseInt(params.bid),function(result){
        res.writeHead(200);
       res.write(resputil.writeResult("success","查询评论成功",result));
       res.end();
    })
}
function queryNearlyComment(req,res){
     commentDao.queryNearlyComment(6,function(result){
        res.writeHead(200);
        res.write(resputil.writeResult("success","查询最近评论成功",result));
        res.end();
     })
}
path.set("/queryNearlyComment",queryNearlyComment);
path.set("/addComment",addComment);
path.set("/queryRandomCode",queryRandomCode);
path.set("/queryCommentsByBlogId",queryCommentsByBlogId);

module.exports.path = path