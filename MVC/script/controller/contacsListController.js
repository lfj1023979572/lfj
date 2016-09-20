/**
 * Created by Administrator on 2016-9-9.
 */

function doSearch(){
    var input=document.querySelector("#search-input");
    var search=document.querySelector("#search");
    search.classList.add("focus");
    search.focus();
}
function clearInput(){
    var input=document.querySelector("#search-input");
    input.value="";
    $(".aui-content").each(function(){
        console.log(this);
        if (this.querySelector("li")){
            this.style.display="block";
        }
    });
    $("div[date-value='*'] li").remove();
}
function cancelSearch(){
    var input=document.querySelector("#search-input");
    var search=document.querySelector("#search");
    search.classList.remove("focus");
    search.blur();
    input.value="";
    $(".aui-content").each(function(){
        if (this.querySelector("li")){
            this.style.display="block";
        }
    });
    $("div[date-value='*'] li").remove();
}
//加载数据
function loadDate(values){
    //console.log(values);
    for (var key in values){
        if (values[key].length){
            $("#list [date-index='"+key+"']").css("display","block");
            for (var i=0;i<values[key].length;i++){
                console.log(values[key]);
             console.log($("#list [date-index='"+key+"']"));
                $("#list [date-index='"+key+"'] ul").append("<li class='aui-list-view-cell' date-index='"+values[key][i].key+"' date-pinyin='"+values[key][i].pinyin+"'>"+values[key][i].name+"</li>")
            }
        }
    }
}
//处理搜索
function search(value){
   var lis=$(".aui-list-view-cell");
    var resultLis=[];
    lis.each(function(){
        var pinYin=this.getAttribute("date-pinyin");
        if (pinYin.match(value)) {
            var em = this.cloneNode(true);
            resultLis.push(em);
        }
    });
    $("div[date-value='*'] .aui-list-view .aui-list-view-cell").remove();
    for (var i=0;i<lis.length;i++){
        $("div[date-index]").css("display","none");
        $("div[date-value='*']").css("display","block");
        $("div[date-value='*'] ul").append(resultLis[i]);
    }

}
//刷新数据
function clearLi(values){
    $(".aui-list-view  .aui-list-view-cell").remove();
    loadDate(values);
}
function clickABCD(){

    var lis=document.querySelectorAll("#searchABC li");

    var divs=document.querySelectorAll(".aui-content p");
    console.log(divs);
    for (var i=0;i<lis.length;i++){
        var li=lis[i];
            li.index=i
        li.onclick=function(){
            //for (var j=0;j<divs.length;j++){
//                console.log(divs[j].innerHTML);
                if (divs[this.index].innerHTML==this.innerHTML){
                    document.querySelector("#content").scrollTop = divs[this.index].offsetTop;
                }
            }
        }
}




