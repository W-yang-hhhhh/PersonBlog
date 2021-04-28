  
//  import {getmarkTime} from "../../util/TimeUtil.js"

var everyDay = new Vue({
    el: '#every_day',
    data: {
        everyday:"",
        role:false
    },
    computed:{
        getContent:function(){
            return this.everyday
        }
    },
    methods:{
        rolefun:function(){
            this.role=!this.role
        },
        getradom:function(){
            $.ajax({
                method:'get',
                url:'/queryRadomEveryday',
                success:function(res){
                     
                    everyDay.everyday=JSON.parse(res).data.content;
                }
            })
        }
        
    },
    created:function(){
        //请求数据给content赋值
    //    try{
    //     var xhr = new XMLHttpRequest();  //这里没有考虑IE浏览器，如果需要择if判断加
    //     xhr.open('GET', "/queryEveryDay",true);
    //     xhr.send();
    //     xhr.onreadystatechange = function (json) {    
    //         if (xhr.status === 200 && xhr.readyState === 4) {        
    //                 console.log(json)
    //             }
    //             console.log("request fail!!!!!!!!!!");
    //         }
 
    //    }catch(error){
    //     console.log(error)
    //    }
    //  this.$axios({
    //     method:"get",
    //     url:"/queryEveryDay"
    // }).then((res)=>{
    //     console.log(res)
    // })
    $.ajax({
        url:"/queryEveryDay",
        method:"get",
        
        dataType:'text',
     success:function(data){
         data = JSON.parse(data)
       
        everyDay.everyday=data.data[0].content;
        

     },
     error:function(error){
        console.log(error)
     }
    })
    
    }
    
})



var articleList = new Vue({
    el:"#article_list",
    data:{
        page:1,
        pageSize:5,
        pagercontent:5,
        lastpagenum:10,
        showpage:[],
        tag:'!',
        searchWord:"",
        articleList:[
             
        ]
    },
    computed:{
        getPage:function(){
            if(this.searchWord!=""){
                return function(page,pageSize){
                    $.ajax({
                        url:`/querySearchWord?searchWord=${this.searchWord}&page=${page-1}&pageSize=${pageSize}`,
                        method:"get",
                        dataType:'text',
                        success:function(res){
                            var result = JSON.parse(res);
                         
                            var result =   result.data.map((item,index)=>{
                                return {title:item.title,content:item.content,date: getmarkTime(item.ctime),views:item.views,tags:item.tags,id:item.id,link:"/blog_detail.html?bid="+item.id}
                                
                            })
                            articleList.articleList = result;
                        },
                        error:function(err){
                            console.log(err);
                        }
                    })
                }


            }else if(this.tag =="!"){
                console.log(1);
                return function(page,pageSize){
                    $.ajax({
                        url:`/queryBlogByPage?page=${page-1}&pageSize=${pageSize}`,
                        method:"get",
                        dataType:'text',
                     success:function(res){
                        var result = JSON.parse(res);
                         
                        var result =   result.data.map((item,index)=>{
                            return {title:item.title,content:item.content,date: getmarkTime(item.ctime),views:item.views,tags:item.tags,id:item.id,link:"/blog_detail.html?bid="+item.id}
                            
                        })
                        articleList.articleList = result;

                     },
                     error:function(error){
                        console.log(error)
                     }
                    })
                   
                     
                }
            }else{
                console.log("page",this.page,this.pageSize);
          
                return function(page,pageSize){
                     $.ajax({
                url:`/queryByTag?tag=${this.tag}&page=${page-1}&pageSize=${pageSize}`,
                method:'get',
                success:function(res){
                  
                    var result = JSON.parse(res);
                         
                        var result =   result.data.map((item,index)=>{
                            return {title:item.title,content:item.content,date: getmarkTime(item.ctime),views:item.views,tags:item.tags,id:item.id,link:"/blog_detail.html?bid="+item.id}
                            
                        })
                        articleList.articleList = result;
                        
                        console.log("page",articleList.page,articleList.pageSize,result);
                    
                },
                error:function(err){
                    console.log(err);
                }
            })
        
                }
            }
         
          
        }

    },
    methods:{
        /**
         * 
         * @param {*} firstPageNum  第一页
         * @param {*} lastPageNum   最后一页 /总页数
         * @param {*} pageContent   分页的按钮容量
         * @param {*} page          当前页
         */
        Pagerinit:function(firstPageNum = 1,lastPageNum,pageContent,page){
            let arr = [];
            arr.push("上一页");
            arr.push(firstPageNum);
            if(firstPageNum==lastPageNum){
                return ;
            }
            if(page>=lastPageNum){
                page = lastPageNum;
            
            }
            if(page<=firstPageNum){
                page = firstPageNum;
            
            }
            if(lastPageNum<=pageContent+1){
                for(let i = firstPageNum+1 ;i<lastPageNum;i++){
                    arr.push(i);
                }
            }
            else if(page-parseInt(pageContent/2)<=firstPageNum+1){
                for(let i = page-parseInt(pageContent/2) <2? 2:page-parseInt(pageContent/2) ;i<=firstPageNum+pageContent-1;i++){
                    arr.push(i);
                }
                arr.push("...");
             
                
            }else if(page+parseInt(pageContent/2)>=lastPageNum-1){
                arr.push("...");
           
                for(let i = page-parseInt(pageContent/2)>=lastPageNum-pageContent-1? lastPageNum-pageContent+1:lastPageNum-pageContent+2 ; i<=lastPageNum-1 ; i++){
                    
                    arr.push(i);
                    
                }
         
            }else{
                arr.push("...");
                for(let i = page-parseInt(pageContent/2) ;i<=page-parseInt(pageContent/2)+pageContent-1;i++){
                    arr.push(i);
                }
                arr.push("...");
            
            }
            
            arr.push(lastPageNum);
            arr.push("下一页");

            return arr;
        },
        getPagerCount:  function(){


        if(this.searchWord!=""){
            var Await =  $.ajax({
                url:"/querySearchWordCount?searchWord="+this.searchWord,
                method:'get',
                dataType:'text',
                success:function(res){
                    var blogsum =JSON.parse(res).data[0].count
                   
                    var pagesum = Math.floor(blogsum / articleList.pageSize)+1;
                     articleList.lastpagenum = pagesum;
                
                },
                error:function(err){
                    console.log(err);
                }
            })
    
            $.when(Await).done(()=>{
                var arr =  this.Pagerinit(1,this.lastpagenum,this.pagercontent,this.page);
                this.showpage = arr;
                consol
        })
    }
              // 获取 blog总数
        else if(this.tag=="!"){
            console.log(1);
            var Await =  $.ajax({
                url:"/queryBlogCount",
                method:'get',
                dataType:'text',
                success:function(res){
                    var blogsum =JSON.parse(res).data[0].count
                   
                    var pagesum = Math.floor(blogsum / articleList.pageSize)+1;
                     articleList.lastpagenum = pagesum;
                
                },
                error:function(err){
                    console.log(err);
                }
            })
    
            $.when(Await).done(()=>{
                var arr =  this.Pagerinit(1,this.lastpagenum,this.pagercontent,this.page);
                this.showpage = arr;
                console.log("lastnum",this.lastpagenum);
               })
 
        }else{
            console.log(2);
            var Await =  $.ajax({
                url:"/queryBlogCountByTag?tag="+this.tag,
                method:'get',
                dataType:'text',
                success:function(res){
                    var blogsum =JSON.parse(res).data[0].count
                   
                    var pagesum = Math.floor(blogsum / articleList.pageSize)+1;
                     articleList.lastpagenum = pagesum;
                   
                },
                error:function(err){
                    console.log(err);
                }
            })
    
            $.when(Await).done(()=>{
                var arr =  this.Pagerinit(1,this.lastpagenum,this.pagercontent,this.page);
                this.showpage = arr;
                console.log("lastnum",this.lastpagenum);
               })
         
        }
       
        },
        movePage:function(page){
            
            if(page=="上一页" || page=="下一页"){
             
                if(page=="上一页"){
                    this.page-=1;
                    console.log("-1");
                   
                }else if(page=="下一页"){
                    console.log("+1");
                    this.page+=1;

                }
                if(this.page<1){
                    this.page = 1;
                    console.log("赋值1");
                }
                if(this.page>this.lastpagenum){
                    this.page=this.lastpagenum
                    console.log("赋值2");
                }
              
                this.getPage(this.page,this.pageSize);

            
            }else{
                this.page = page;
            
                
                this.getPage(this.page,this.pageSize);
            }
            
            // console.log(page);
            
           
        
            
           
        },
        
    },

    created(){
        var blogid = location.search.indexOf("?") >-1 ? location.search.split("?")[1].split("&") :"";
        // var tag="!";

            for(var i = 0;i<blogid.length ;i ++){
                if(blogid[i].split("=")[0] =="tag"){
                    this.tag =blogid[i].split("=")[1]
                    break;
                }
                else if(blogid[i].split("=")[0] =="searchWord"){
                    this.searchWord = blogid[i].split("=")[1]
                    break;
                }
             }
        
        this.getPagerCount()
        this.getPage(this.page,this.pageSize);
        this.movePage(this.page)
        
    }
})





function getmarkTime(oldtime){
    var a = new Date(oldtime*1000)
    var b = a.getFullYear() + "年"+ (a.getMonth()+1) + "月" +a.getDate() + "日"
    return b;

}