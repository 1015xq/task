window.onload = function () {
var container = document.getElementById('container');
var list = document.getElementById('list');
var buttons = document.getElementById('buttons').getElementsByTagName('span');
var prev = document.getElementById('prev');
var next = document.getElementById('next');
var index = 1;
var len = 5;
var animated = false;
var interval = 3000;
var timer;

function animate (offset) {
    if (offset == 0) {
         return;
    }
    animated = true;
    var time = 300;
    var inteval = 10;
    var speed = offset/(time/inteval);
    var left = parseInt(list.style.left) + offset;

    var go = function (){
        if ( (speed > 0 && parseInt(list.style.left) < left) || (speed < 0 && parseInt(list.style.left) > left)) {
            list.style.left = parseInt(list.style.left) + speed + 'px';
            setTimeout(go, inteval);
        }
        else {
            list.style.left = left + 'px';
            if(left>-1024){
            list.style.left = -1024 * len + 'px';
            }
            if(left<(-1024 * len)) {
            list.style.left = -1024+'px';
            }
                animated = false;
        }
    }
        go();
}
function showButton() {
    for (var i = 0; i < buttons.length ; i++) {
        if( buttons[i].className == 'on'){
            buttons[i].className = '';
            break;
        }
    }
    buttons[index - 1].className = 'on';
}
function play() {
    timer = setTimeout(function () {
        next.onclick();
        play();
    }, interval);
}
function stop() {
    clearTimeout(timer);
}
next.onclick = function () {
    if (animated) {
        return;
    }
    if (index == 5) {
        index = 1;
    }
    else {
        index += 1;
    }
    animate(-1024);
    showButton();
}
prev.onclick = function () {
    if (animated) {
        return;
    }
    if (index == 1) {
        index = 5;
    }
    else {
        index -= 1;
    }
    animate(1024);
    showButton();
}
for (var i = 0; i < buttons.length; i++) {
    buttons[i].onclick = function () {
        if (animated) {
            return;
        }
        if(this.className == 'on') {
            return;
        }
        var myIndex = parseInt(this.getAttribute('index'));
        var offset = -1024 * (myIndex - index);
        animate(offset);
        index = myIndex;
        showButton();
    }
}
    container.onmouseover = stop;
    container.onmouseout = play;
    play();


    document.getElementById("btn_showlogin").onclick = shogMinLogin;
    document.getElementById("close_minilogin").onclick = closeLogin;
    document.getElementById("firstLine").onmousedown = moveLogin;
    /* 显示登录窗口 */
    function shogMinLogin(){
        var mini_login = document.getElementsByClassName("mini_login")[0];
        var cover = document.getElementsByClassName("cover")[0];
        mini_login.style.display = "block";
        cover.style.display = "block";
        cover.style.height=document.documentElement.scrollHeight+"px";
        cover.style.width=document.documentElement.scrollWidth+"px";
        cover.onclick=function(){
             mini_login.style.display="none";
             cover.style.display="none";
        }
    }

    /* 关闭登录窗口 */
    function closeLogin(){
        var mini_login = document.getElementsByClassName("mini_login")[0];
        var cover = document.getElementsByClassName("cover")[0];
        mini_login.style.display = "none";
        cover.style.display = "none";
    }

    /* 移动登录窗口 */
    function moveLogin(event){
        var moveable = true;

        //获取事件源
        event = event ? event : window.event;
        var clientX = event.clientX;
        var clientY = event.clientY;
        
        var mini_login = document.getElementById("mini_login");
        console.log(mini_login);
        var top = parseInt(mini_login.style.top);
        var left = parseInt(mini_login.style.left);//鼠标拖动
        document.onmousemove = function(event){
            if(moveable){
                event = event ? event : window.event;
                var y = top + event.clientY - clientY;
                var x = left + event.clientX - clientX;
                if(x>0 && y>0){
                    mini_login.style.top = y + "px";
                    mini_login.style.left = x + "px";
                }
            }
        }
        //鼠标弹起
        document.onmouseup = function(){
            moveable = false;
        }
    }

   var oMsg = document.getElementById("msg");
   var oBtn = document.getElementById("btn");
   var oMsg_c = document.getElementById("msg_c");
   var oUl = document.createElement("ul");
   oMsg_c.appendChild(oUl);
   oBtn.onclick = function(){
     var sVal = oMsg.value;
     if (sVal==""||(!/^[\u4e00-\u9fa5]+$/gi.test(sVal))){alert("请输入某某大学进行查询");}
       else{
         var oli = document.createElement("li");
         oli.innerHTML = sVal ;
         var oli1 = oUl.getElementsByTagName("li");
         if(oli1.length>0){
            oUl.insertBefore(oli,oli1[0]);
         }
         else{
            oUl.appendChild(oli);
         }
         oMsg.value='';
         var oSpan = document.getElementsByTagName("span");
         for(var i=0; i<oSpan.length; i++){
           oSpan[i].onclick = function(){
              oUl.removeChild(this.parentNode);
           }
         }
       }
   }

}
