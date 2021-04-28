function getNow (){
   
    return parseInt(Date.now()/1000);

}

// 将时间戳转换成 年月日
function getmarkTime(oldtime){
    var a = new Date(oldtime*1000)
    var b = a.getFullYear() + "年"+ a.getDay() + "月" +a.getDate() + "日"
    return b;

}


module.exports.getNow = getNow;
module.exports.getmarkTime = getmarkTime;