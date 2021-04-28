

var blogList = new Vue({
    el:"#blog_list",
    data:{
        blogList:[]
    },
    computed:{
        gethref:function(){
            return function(id){
                return "/blog_detail.html?bid="+id
            }
        }
    },
    created:function(){
        $.ajax({
            url:"/queryAllBlog",
            method:"get",
            success:function(res){
                blogList.blogList = JSON.parse(res).data
                console.log(JSON.parse(res));
            },
            error:function(err){
                console.log(err);
            }
        })
    }
})