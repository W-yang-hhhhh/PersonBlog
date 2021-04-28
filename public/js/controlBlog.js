var controlBlog = new Vue({
    el:'#inall',
    data:{
        blogName:[],
        showleft:true
    },
    computed:{
        filterdata:function(){
            return function(id){
                this.blogName=this.blogName.filter((item,index)=>{
                    return item.id!=id
                })

            }
        }
    },
    methods:{
         change_showLeft:function(mark){
             
             if(mark=='add'&& this.showleft){
                 return
             }
             if(mark=='delete'&& !this.showleft){
                 return 
             }
             this.showleft =!this.showleft;
             if(this.showleft){
                 this.getEditor();
             }
         },
         getEditor:function(){
            var E = window.wangEditor;
            var editor = new E( document.getElementById('editor') );
            editor.customConfig.uploadImgShowBase64 = true ;
            editor.create();
         },
         deleteBlog:function(id){
            
             $.ajax({
                 method:'post',
                 url:'/deleteBlog',
                 data:{
                     id:id,
                 }
             }).then((res)=>{
                 console.log(res);
             })
             this.filterdata(id);
             this.getBlogData();
             console.log(id,this.blogName);
         },
         getBlogData:function(){
            $.ajax({
                method:'get',
                url:'/queryAllBlog',
            }).then((res)=>{
                    let result = JSON.parse(res);
                    result = result.data.map((item,index)=>{
                        return{
                            id:item.id,
                            title:item.title
                        }
                    })
                    controlBlog.blogName = result;
            })
         }
    },
    created:function(){
    //    this.getEditor();
        this.getBlogData();
      
         
    }
})