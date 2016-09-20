/**
 * Created by Administrator on 2016-9-9.
 */
//加载数据
var obj1,key1;
function loadContacs(values,name){
    var obj=obj1;
    var key=key1;
    //console.log(values);
    for (var key in values){
        if (values[key].length){
            for (var i=0;i<values[key].length;i++) {
                if (name == values[key][i].name) {
                    //console.log(values[key][i].img);
                    $(".aui-list-view .aui-swipe-handle").prepend("<img class='aui-img-object aui-pull-left' src='" + values[key][i].img + "'width='900' height='900'>");
                    $("#name").val( values[key][i].name);
                    $("#telephone").val(values[key][i].telephone);
                    $("#qq").val( values[key][i].qq);
                }
            }
        }
    }
}

function move(){
    $("#show_contacs").animate({left:0},300).show();
}
function headerChange(width){
    var headerIcon=document.querySelector("#header1 .aui-icon-left");
    headerIcon.parentNode.onclick=function(){
        //console.log(this);
        $("#show_contacs").animate({left:width},300);
        $("#content").load("html/contacsList.html",function(){
            loadDateLast();
        });
    };
}
function edit(){
    $("#edit").click(function(){
        $("#cancel").css("display","block");
        $("#preservation").css("display","block");
        $("#edit").css("display","none");
        $("#name").focus();
        //$("#qq").focus();
        //$("#telephone").focus();
    });
}

function input_blur(){
    $("#name").blur();
    $("#qq").blur();
    $("#telephone").blur();
    //console.log($("#name"));
}
