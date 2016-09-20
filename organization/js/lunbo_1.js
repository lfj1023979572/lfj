/**
 * Created by Administrator on 2016-8-29.
 */
function Carousel(parmas) {
    var option = {
        outerMost: document,
        width: 0,
        height: 0,
        changSpeed: 0,
        speed: 0,
        imgUrl: []
    };
    init(parmas);
    function init(parmas) {
        assignment(option, parmas);
        createLi();
        createImg();
        click();
    }

    //创建img
    function createImg() {
        option.outerMost.setAttribute("style", "width: " + option.width + "px;height:" + option.height + "px;overflow: hidden;position: relative;");
        var str_1 = "<div class='imgs' style='width: " + (option.imgUrl.length) * (option.width) + "px;height:" + option.height + "px;position: absolute;'></div>";
        option.outerMost.insertAdjacentHTML("afterBegin", str_1);
        for (var i = 0; i < option.imgUrl.length; i++) {
            var str_img = "<img src='" + option.imgUrl[i].src + "' style='float: left'>";
            document.querySelector(".imgs").insertAdjacentHTML("beforeEnd", str_img);
        }
        console.log(option.imgUrl.length);
    }

    //创建li
    function createLi() {
        var str_2 = "<div class='num' style='position: absolute;bottom: 10px;right: 10px;'></div>";
        //动态添加包括数字的div
        option.outerMost.insertAdjacentHTML("beforeEnd", str_2);
        var str_3 = "<ul class='ul' style=' list-style-type: none;text-align: center;color: white;'></ul>";
        //动态添加包括数字的ul
        document.querySelector(".num").insertAdjacentHTML("afterBegin", str_3);
        for (var j = 0; j < option.imgUrl.length; j++) {
            var str_li = "<li style='width: 25px;height: 25px;float: left;margin-right: 5px;line-height: 25px;margin-top: -15px;+" +
                "border-radius: 50%;background-color: rgba(110,100,300,0.5);'>" + [j + 1] + "</li>";
            document.querySelector(".num .ul").insertAdjacentHTML("beforeEnd", str_li);
        }
    }

    //把前台的值赋值给option
    function assignment(a, b) {
        for (var key in b) {
            if (a.hasOwnProperty(key)) {
                a[key] = b[key];
            }
        }
        return a;
    }

    var imgMovingTim = 0;//从当前页跳转到目标页的时钟
    var currentIndex = 0;//存储当前页的index
    var slideShowImgTim;
    slideShowImgTim = setInterval(slideShowImg, option.speed);//每隔一段时间跳转一次
    /**
     * 由当前页移动到下一页
     * @param index
     */
    changNum();
    //图片移动的方法
    function imgMoving(index) {
        if (imgMovingTim == 0) {
            //当前页面的居左距离
            var currentImgleft = -currentIndex * option.width;
            //目标页面的居左距离
            var nextLeft = -index * option.width;
            //移动十次的步长
            var step = (nextLeft - currentImgleft) / 10;
            var count = 0;
            var imgs = document.querySelector(".imgs");
            imgMovingTim = setInterval(function () {
                currentImgleft += step;
                imgs.style.left = currentImgleft + "px";
                count++;
                if (count > 9) {
                    //停止移动
                    clearInterval(imgMovingTim);
                    imgMovingTim = 0;
                    currentIndex = index;
                    //改变数值
                    changNum();
                }
            }, 50)
        }
    }

    //自动播放轮播图片
    function slideShowImg() {
        var nextImgIndex = currentIndex + 1;
        if (nextImgIndex >= option.outerMost.querySelectorAll("img").length) {
            nextImgIndex = 0;
        }
        imgMoving(nextImgIndex);
    }

    //改变数字的数字、大小、样式
    function changNum() {
        var lis = document.querySelectorAll(".num .ul li");
        for (var i = 0; i < lis.length; i++) {
            lis[i].style.fontWeight = 400;
            lis[i].style.backgroundColor = "red";
        }
        var currentLi = lis[currentIndex];
        currentLi.style.fontWeight = 700;
        currentLi.style.backgroundColor = "#f90";
    }

    //点击事件
    function click() {
        var lis = document.querySelectorAll(".num .ul li");
        for (var i = 0; i < lis.length; i++) {
            lis[i].onclick = function (event) {
                var li = event.target.innerHTML;
                imgMoving(parseInt(li) - 1);
            }
        }
    }

    //添加监听事件
    //鼠标移动图片上停止自动播放
    document.querySelector(".outerMost").onmousemove = function () {
        clearInterval(slideShowImgTim);
    };
    //鼠标离开图片上自动播放开始
    document.querySelector(".outerMost").onmouseout = function () {
        slideShowImgTim = setInterval(slideShowImg, option.speed);
    }
    //处理浏览器最小化
    document.addEventListener("webkitvisibilitychang", function () {
        if (document.webkitvisibilitychange == "hidden") {
            clearInterval(slideShowImgTim);
        } else {
            slideShowImgTim = setInterval(slideShowImg, option.speed);
        }
    })
}

