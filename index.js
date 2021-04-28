 
const globalConfig = require("./config")
const express = require("express");
const app =new express();
const path = require("path")
const loader = require("./loader.js")
const util = require("./util/TimeUtil")
const publicPath = path.resolve(__dirname,"./public")
app.use(express.static(publicPath))

app.post("/editEveryDay",loader.get("/editEveryDay"))
app.get("/queryEveryDay",loader.get("/queryEveryDay"))
app.post("/editBlog",loader.get("/editBlog"))
app.get("/queryBlogByPage",loader.get("/queryBlogByPage"))
app.get("/queryBlogCount",loader.get("/queryBlogCount"))
app.get("/queryBlogById",loader.get("/queryBlogById"))
app.get("/addComment",loader.get("/addComment"));
app.get("/queryRandomCode",loader.get("/queryRandomCode"))
app.get("/queryCommentsByBlogId",loader.get("/queryCommentsByBlogId"))
app.get("/queryAllBlog",loader.get("/queryAllBlog"))
app.get("/queryRandomTags",loader.get("/queryRandomTags"))
app.get("/queryHostBlog",loader.get("/queryHostBlog"))
app.get("/queryNearlyComment",loader.get("/queryNearlyComment"))
app.get("/queryByTag",loader.get("/queryByTag"))
app.get("/queryBlogCountByTag",loader.get("/queryBlogCountByTag"))
app.get("/querySearchWord",loader.get("/querySearchWord"))
app.get("/querySearchWordCount",loader.get("/querySearchWordCount"))
app.get("/queryRadomEveryday",loader.get("/queryRadomEveryday"))
app.post("/deleteBlog",loader.get("/deleteBlog"))
app.listen(5008,()=>{
    console.log("服务器开启成功")
})




