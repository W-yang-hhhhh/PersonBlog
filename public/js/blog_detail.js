

var blogDetail = new Vue({
    el:"#blog_detail",
    data:{
        title:"",
        content:"",
        ctime:"",
        tags:"",
        views:""
    },
    computed:{},
    created:function(){
        console.log( )
         var blogid = location.search.indexOf("?") >-1 ? location.search.split("?")[1] :"";
         if(blogid ==""){
             return ;
         }else{
             var bid ;
             blogid = blogid.split("&")
             for(var i = 0;i<blogid.length ;i ++){
                if(blogid[i].split("=")[0] =="bid"){
                    bid =blogid[i].split("=")[1]
                }
             }
         }


         $.ajax({
             url:"/queryBlogById?bid="+bid,
             method:"get",
             success:function(res){
                 var result = JSON.parse(res).data[0]
                 blogDetail.title = result.title;
                 blogDetail.content = result.content;
                 blogDetail.ctime = result.ctime;
                 blogDetail.tags = result.tags;
                 blogDetail.views = result.views
             },
             error:function(err){
                 console.log(err)
             }
         })
    }

})



var sendComment = new Vue({
    el:"#send_comment",
    data:{
        text:"",
        svg:""
    },
    computed:{
        sendComment:function(){
            return function(){
                var blogid = location.search.indexOf("?") >-1 ? location.search.split("?")[1].split("&") :"";
                if(blogid == ""){
                    return ;
                }else{
                    var bid;
                    for(var i = 0;i<blogid.length ;i ++){
                        if(blogid[i].split("=")[0] =="bid"){
                            bid =blogid[i].split("=")[1]
                        }
                     }
                }
              var replay = document.getElementById("comment_reply_id").value;
              var name = document.getElementById("comment_name").value;
              var email = document.getElementById("comment_eamil").value;
              var content = document.getElementById("comment_content").value;
              var svgtext = document.getElementById("comment_code").value;
              var parentname = document.getElementById("comment_reply_name").value;
             console.log(email,this.text,svgtext);
              if(svgtext==this.text){
                  alert("??????????????????")
                $.ajax({
                    methods:"get",
                    url:"/addComment?bid="+bid+"&parent="+replay + "&userName="+name +"&email="+email+"&content="+ content+"&parentname="+parentname,
                  success:function(res){
                      console.log(res)
                  },
                  error:function(err){
                      console.log(err);
                  }
                  })
              }else{
                  alert("?????????????????????????????????")
              }
            }
        },
        chagnesvg:function(){
            return  ()=>{
                this.requestsvg();
            }
        }
    },
    methods:{
        requestsvg:function(){
            $.ajax({
                url:"/queryRandomCode",
                method:"get",
                success:function(res){
                   
                   sendComment.text = JSON.parse(res).data.text
                   sendComment.svg = JSON.parse(res).data.data
                },
                error:function(err){
                    console.log(err);
                }
            })
        }
    },
    created:function(){
        // $.ajax({
        //     url:"/queryRandomCode",
        //     method:"get",
        //     success:function(res){
        //         console.log(JSON.parse(res));
        //        sendComment.text = JSON.parse(res).data.text
        //        sendComment.svg = JSON.parse(res).data.data
        //     },
        //     error:function(err){
        //         console.log(err);
        //     }
        // })
        this.requestsvg();
    }
}) 




var blogComments = new Vue({
    el:"#blog_comments",
    data:{
        comments_total:61,
        comments:[],
    },
    computed:{
        replay:function(){
            return function(commentid,commentname){
                document.getElementById("comment_reply_id").value=commentid;
                document.getElementById("comment_reply_name").value=commentname;
            }
        }
    },
    created:function(){
        var blogid = location.search.indexOf("?") >-1 ? location.search.split("?")[1].split("&") :"";
        if(blogid == ""){
            return ;
        }else{
            var bid;
            for(var i = 0;i<blogid.length ;i ++){
                if(blogid[i].split("=")[0] =="bid"){
                    bid =blogid[i].split("=")[1]
                }
             }
        }
        $.ajax({
            url:"/queryCommentsByBlogId?bid="+bid,
            method:"get",
            success:function(res){
              
                var result = JSON.parse(res).data
                for(var i = 0;i<result.length;i++){
                    if(result[i].parent>-1){
                        result[i].options = "??????@"+result[i].parent_name;
                    }
                }
                blogComments.comments = result
                blogComments.comments_total = JSON.parse(res).data.length;
                
            },
            error:function(err){
                console.log(err );
            }
        })
    }
})