var randomTags = new Vue({
 el:"#random_tages",
 data:{
     tags:[]
 },
 computed:{
    randomColor:function(){
        return function(){
            var red = Math.random()*255;
            var green = Math.random()*255;
            var blue = Math.random()*255;
            return `rgb(${red},${green},${blue})`
        }
        
    },
    randomSize:function(){
        return function(){
            var size =(Math.random()*20 +12)+"px";
            return size
        }
    },
    gettagblogs:function(){
        return function(tag){
           return "/?tag="+tag
        }
    }
 },
 methods:{
   
 },
 created:function(){
     $.ajax({
         url:"/queryRandomTags",
         method:'get',
         success:function(res){
            var data = JSON.parse(res).data
            // data.map((item,index)=>{
            //     console.log(item);
            //     item.link = "/queryBlogByTag?tag="+item.tag;
            // })
            randomTags.tags = data
           
         },
         error:function(err){
            console.log(err);
         }
     })
 },
})




var newHot = new Vue({
    el:"#new_hot",
    data:{
        titleList:[
            {title:"这是一个标题" ,link:"https://www.baidu.com"},
            {title:"这是一个标题" ,link:"https://www.baidu.com"},
            {title:"这是一个标题" ,link:"https://www.baidu.com"},
            {title:"这是一个标题" ,link:"https://www.baidu.com"},
            {title:"这是一个标题" ,link:"https://www.baidu.com"},
            {title:"这是一个标题" ,link:"https://www.baidu.com"},
            {title:"这是一个标题" ,link:"https://www.baidu.com"},
            {title:"这是一个标题" ,link:"https://www.baidu.com"},
            {title:"这是一个标题" ,link:"https://www.baidu.com"},
        ]
    },
    computed:{
         
    },
    created:function(){
        $.ajax({
            url:"/queryHostBlog",
            method:"get",
            success:function(result){
                var title = JSON.parse(result).data;
                title.map((item,index)=>{
                    item.link = "/blog_detail.html?bid="+item.id;
                })
                newHot.titleList = title
            },
            error:function(err){
                console.log(err);
            }
        })
    }
})


var newComments = new Vue({
    el:"#new_comments",
    data:{
        commentList:[ 
        ]
    },
    created:function(){
        $.ajax({
            url:"/queryNearlyComment",
            method:"get",
            success:function(res){
               
                newComments.commentList = JSON.parse(res).data
            },
            error:function(err){
                console.log(err);
            }
        })
    }
})




var search = new Vue({
    el:"#container",
    data:{
        id:"",
        showlist:true,
    },
    computed:{
        gethref:function(){
            return function(){
                console.log(123);
                return "/?searchWord="+this.id;
               
            };
        },
        
        
    },
    methods:{
        changeshowlist:function(){
             this.showlist=!this.showlist;
        }
    },
    created:function(){
        // this.showlist = true;
        console.log(this.showlist);
    }

})


