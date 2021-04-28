var sendComment = new Vue({
    el:"#send_comment",
    data:{
        text:"",
        svg:""
    },
    computed:{
        sendComment:function(){
            return function(){
                // var blogid = location.search.indexOf("?") >-1 ? location.search.split("?")[1].split("&") :"";
                // if(blogid == ""){
                //     return ;
                // }else{
                //     var bid;
                //     for(var i = 0;i<blogid.length ;i ++){
                //         if(blogid[i].split("=")[0] =="bid"){
                //             bid =blogid[i].split("=")[1]
                //         }
                //      }
                // }
              var replay = document.getElementById("comment_reply_id").value;
              var name = document.getElementById("comment_name").value;
              var email = document.getElementById("comment_eamil").value;
              var content = document.getElementById("comment_content").value;
              var svgtext = document.getElementById("comment_code").value;
              var parentname = document.getElementById("comment_reply_name").value;
             console.log(email,this.text,svgtext);
              if(svgtext==this.text){
                  alert("评论发送成功")
                $.ajax({
                    methods:"get",
                    url:"/addComment?bid=-3&parent="+replay + "&userName="+name +"&email="+email+"&content="+ content+"&parentname="+parentname,
                  success:function(res){
                      console.log(res)
                  },
                  error:function(err){
                      console.log(err);
                  }
                  })
              }else{
                  alert("验证码错误清重新输入！")
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
        // var blogid = location.search.indexOf("?") >-1 ? location.search.split("?")[1].split("&") :"";
        // if(blogid == ""){
        //     return ;
        // }else{
        //     var bid;
        //     for(var i = 0;i<blogid.length ;i ++){
        //         if(blogid[i].split("=")[0] =="bid"){
        //             bid =blogid[i].split("=")[1]
        //         }
        //      }
        // }
        $.ajax({
            url:"/queryCommentsByBlogId?bid=-3",
            method:"get",
            success:function(res){
                console.log(JSON.parse(res));
                var result = JSON.parse(res).data
             
                result.map((item,index)=>{
                    if(item.parent>-1){
                        item.options = "回复@"+item.parent_name
                    }
                })
                blogComments.comments = result
                blogComments.comments_total = JSON.parse(res).data.length;
                console.log(blogComments.comments);
            },
            error:function(err){
                console.log(err );
            }
        })
    }
})