window.onload = function () {
    var top = document.getElementById("top");
    var close = document.getElementById("close");
    close.onclick = function () {
        top.style.display = "none";
    }

    var arrTd = document.getElementsByClassName("td");
    var site = document.getElementById("site");

    for (i = 0; i < arrTd.length; i++) {
        arrTd[i].onclick = function () {
            //清除所有样式
            for (j = 0; j < arrTd.length; j++) {
                // arrTd[j].style.backgroundColor = "white";
                arrTd[j].firstChild.style.backgroundColor = "white";
                arrTd[j].firstChild.style.color = "#999";

            }
            //添加地址触发样式
            this.firstChild.style.backgroundColor = "red";
            this.firstChild.style.color = "white";
            site.innerText = this.innerText;
            // site.style.backgroundColor = "black";
            // site.style.color = "black";

        }
    }

};




//获取元素节点
let hotWord = document.querySelector('.hot-word');
let list = document.querySelector('.list');
let search = document.querySelector('.search');
let searchLog = document.querySelector('.search-log');
let wrap = document.querySelector('.search>div');
let form = document.querySelector('.form');

//切换输入框的关键字
(function () {
    let hotWords = ['苹果手机', '家用电器', '电脑', '女鞋', '户外', '显示器', '图书', '教育', '电子书'];
    let index = 0;//表示数组下标
    //设置HTML的标准属性：元素节点.属性="属性值"
    setInterval(function () {
        index++;
        //范围校验
        if (index > hotWords.length - 1) {
            index = 0;
        }
        //设置placeholder属性
        hotWord.placeholder = hotWords[index];
    }, 3000);
})();

//模糊查询
//input当内容发生改变触发
//change当内容确定改变触发
let listArr = ['苹果手机', '苹果13', '苹果14', '苹果14 pro', '苹果手表', '华为手机', '小米手机', '魅族手机', '三星手机'];
hotWord.oninput = function () {
    //清空div
    list.innerHTML = '';
    //获取input的value值
    let value = hotWord.value;
    //和数组元素对比
    for (let i = 0; i < listArr.length; i++) {
        //在数组元素中查找value值
        if (listArr[i].indexOf(value) !== -1) {
            //添加到div中
            list.innerHTML = list.innerHTML + `<p>${listArr[i]}</p>`;
            //显示div
            list.style.display = 'block';
        }
    }
}
//失去焦点
hotWord.onblur = function () {
    //隐藏div
    list.style.display = 'none';
}

//轮播图
let img = document.getElementById('img');
let prev = document.querySelector('.prev');
let next = document.querySelector('.next');
let lis = document.querySelectorAll('.banner-btn>li');
let slideBanner = document.querySelector('.slide-banner');
let imgArr = ['轮播图1.webp', '轮播图2.jpg', '轮播图3.jpg', '轮播图4.jpg', '轮播图5.jpg', '轮播图6.jpg', '轮播图7.webp', '轮播图8.jpg'];
let i = 0;

//封装切换的函数
function banner() {
    //清空样式
    for (let k = 0; k < lis.length; k++) {
        lis[k].className = '';
    }
    //设置图片的路径
    img.src = 'img/' + imgArr[i];
    //设置点的样式
    lis[i].className = 'btn-active';
}

//封装自动切换的函数
function autoBanner() {
    i++;
    if (i > imgArr.length - 1) {
        i = 0;
    }
    banner();
}

let timer = setInterval(autoBanner, 3000);
//鼠标移入停止定时器
slideBanner.onmouseover = function () {
    clearInterval(timer);
}
//鼠标离开开启定时器
slideBanner.onmouseout = function () {
    timer = setInterval(autoBanner, 3000);
}

//下一张
next.onclick = function () {
    i++;
    if (i > imgArr.length - 1) {
        i = 0;
    }
    //设置图片路径
    banner();
}
//上一张
prev.onclick = function () {
    i--;
    if (i < 0) {
        i = imgArr.length - 1;
    }
    //设置图片路径
    banner();
}

// 京东秒杀倒计时
var clock = document.getElementById('clock');
var countTime = document.getElementById("countTime");
var spans = countTime.getElementsByTagName('span');
var endTime = new Date('2222/09/24 12:00:00');
var timerDJS = null;
timerDJS = setInterval(function () {
    var nowTime = new Date();
    clock.innerHTML = nowTime.getHours() - nowTime.getHours() % 4;
    if (clock.innerHTML < 10)
        clock.innerHTML = '0' + clock.innerHTML;
    var lastTime = parseInt((endTime - nowTime) / 1000) % 14400;  //14400表示4个小时
    var hour = parseInt((lastTime / 60 / 60 % 24));
    if (hour < 10)
        hour = '0' + hour;
    var min = parseInt(lastTime / 60 % 60);
    if (min < 10)
        min = '0' + min;
    var sec = parseInt(lastTime % 60);
    if (sec < 10)
        sec = '0' + sec;

    spans[0].innerHTML = hour;
    spans[1].innerHTML = min;
    spans[2].innerHTML = sec;
}, 1000);

//点击点
//拿到所有点
for (let j = 0; j < lis.length; j++) {
    //绑定点击事件
    lis[j].onmouseover = function () {
        //设置图片路径
        i = j;
        banner();
    }
}

//楼层效果
let elevator = document.querySelector('.elevator');
let header = document.querySelector('.header');
let items = document.querySelectorAll('.items');
let eleA = document.querySelectorAll('.elevator>a');

//header+banner的高度
let to = header.offsetHeight + slideBanner.offsetHeight + 40;//基础的距离

//声明一个数组，存储四个div距上面的距离
let floor = [];
//拿到四个div
for (let i = 0; i < items.length; i++) {
    to = to + items[i].offsetHeight
    floor.push(to);
}
console.log(floor);

//封装去掉a样式的函数
function clear() {
    for (let i = 0; i < eleA.length; i++) {
        // eleA[i].className = '';
        eleA[i].classList.remove("active");
    }
}

//给页面绑定滚动监听事件
window.onscroll = function () {

    //获取滚动条距上面的距离
    let top = document.documentElement.scrollTop || document.body.scrollTop;
    //获取元素距上面的距离
    let top1 = header.offsetHeight + slideBanner.offsetHeight + 40;
    //判断
    if (top >= top1) {
        //固定定位
        elevator.className = 'elevator elevator-fix';
    } else {
        elevator.className = 'elevator';
    }


    //回顶部
    var scrollTopBack = document.getElementById("scrollTopBack");
    // 当网页向下滑动 854px 出现"返回顶部" 按钮
    if (document.body.scrollTop > 1000 || document.documentElement.scrollTop > 1000) {
        scrollTopBack.classList.add("activeBack");
    } else {
        scrollTopBack.classList.remove("activeBack");
    }

    //楼层效果
    //判断top距上面的距离，对应的a修改字体颜色
    if (top >= top1 && top < floor[0]) {
        clear();
        eleA[0].classList.add("active");
    }
    else if (top >= floor[0] && top <= floor[1]) {
        clear();
        eleA[1].classList.add("active");
    }
    else if (top >= floor[1] && top < floor[2]) {
        clear();
        eleA[2].classList.add("active");
    }
    else if (top >= floor[2]) {
        clear();
        eleA[3].classList.add("active");
    }
    if (top < top1) {
        clear();
    }

    //吸顶效果
    if (top >= top1 - 62) {
        //固定定位
        search.className = 'search header-fix';
        //动画指向完毕回到初始化的状态  top:-52px;
        search.style.top = '0';
        //左侧小logo显示
        searchLog.style.display = 'block';
        //搜索框中显示水平居中的div
        wrap.className = 'wrap';
        //设置搜索框距左侧和上侧的距离
        form.style.marginTop = '7px';
        form.style.marginLeft = '260px';
    } else {//不满足条件回复原本样式
        search.className = 'search';
        searchLog.style.display = 'none';
        wrap.className = '';
        form.style.marginTop = '25px';
        form.style.marginLeft = '70px';
    }
}


//点击返回顶部
scrollTopBack.onclick = function () {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}