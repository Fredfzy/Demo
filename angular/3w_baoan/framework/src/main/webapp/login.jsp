<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>

    <!DOCTYPE html>
        <html>

        <head>

        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">

        <title>OA | Login</title>

        <link href="stylesheets/bootstrap.min.css" rel="stylesheet">
        <link href="font-awesome/css/font-awesome.css" rel="stylesheet">

        <link href="stylesheets/animate.css" rel="stylesheet">
        <link href="stylesheets/style.css" rel="stylesheet">

        <script src="vendors/jquery-2.1.1.min.js"></script>
        <script src="vendors/qrCode/qrcode.js"></script>
        <script src="vendors/qrCode/jquery.qrcode.js"></script>
        <style>
        #wrap-login{
        width: 600px;
        height: 410px;
        box-shadow: 0 0 20px #888888;
        position: absolute;
        left: -300px;
        margin-left: 50%;
        top: 50%;
        margin-top: -205px;
        border-radius: 8px;
        background: #fff;
        }
        #wrap-login>div{
        }
        #wrap-qrCode{
        border-radius: 8px 0 0 8px;
        }
        #qrCode{
        box-shadow: 0 0 20px #888888;
        width: 280px;
        height: 280px;
        border-radius: 8px;
        background: #fff;
        padding: 12px;
        }
        .sub-wrap{
        width: 300px;
        height: 410px;
        float: left;
        padding: 10px;
        }
        #form{
        padding: 20px;
        }
        #logo{
        text-align: center;
        font-size: 60px;
        margin-bottom: 40px;
        }
        #form>button{
        margin-top: 60px;
        }
        #form input{
        border-style:none;
        border-bottom: 1px solid rgb(221, 221, 221);
        background:transparent;
        }
        </style>
        </head>

        <body class="gray-bg">
        <div class="full-height full-width absolute" id="bg" style="opacity: 0.3">
        </div>
        <div id="wrap-login" class="animated fadeInUp">
        <div id="wrap-qrCode" class="sub-wrap">
        <div id="qrCode">
        <div id="canvas-qrCode"></div>
        </div>
        </div>
        <div id="wrap-form" class="sub-wrap">
        <div id="logo" class="m-t">
        <strong>OA</strong>
        </div>
        <form id="form" action="/login" method="POST">
        <input type="text" name="username" class="form-control" placeholder="用户名">
        <input type="password" name="password" class="form-control m-t-lg" placeholder="密码">
        <button class="btn btn-primary btn-block m-t-lg">
        <strong>登录</strong></button>
        <div class="help-block text-danger">
            <% if(session.getAttribute("SPRING_SECURITY_LAST_EXCEPTION")!=null) out.print(((Exception)session.getAttribute("SPRING_SECURITY_LAST_EXCEPTION")).getMessage()); %>
        </div>
        </form>
        </div>
        </div>
        </body>
        </html>
        <script>
        clientCode = (new Date()).getTime();
        onload = function () {
        var domBg = document.getElementById('bg')
        ,domQrBox = document.getElementById('wrap-qrCode')
        ,domLogo = document.getElementById('logo')
        ,animations = ['bounce','rubberBand','swing','tada','flip']
        ,bgs = [];
        for(var i = 1;i<16;i++){
        bgs.push(i+'.jpg');
        }
        for(i = 1;i<4;i++){
        bgs.push(i+'.gif');
        }
        domQrBox.style.background = domBg.style.background='url(img/bg/'+bgs[parseInt(Math.random()*bgs.length)]+')';
        domLogo.style['-webkit-animation']=animations[parseInt(Math.random()*animations.length)]+' 1.5s infinite';
        $.get('/auth/wechatConfig',function(data){
        var url = 'http://1.33oa.applinzi.com/qrLogin.php?corpid='+
        data.corpid+'&config='+data.config+'&clientCode='+clientCode;
        console.log(url);
        jQuery('#canvas-qrCode').qrcode({
        text: url
        });
        })
        setInterval(function(){
        async();
        },1000);
        }
        function async() {
        var xmlhttp;
        if (window.XMLHttpRequest) {// code for IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp = new XMLHttpRequest();
        }
        else {// code for IE6, IE5
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
        }
        xmlhttp.open("GET", "/auth/scan/" + clientCode, true);
        xmlhttp.send();
        xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
        var responseObj = JSON.parse(xmlhttp.responseText);
        if (responseObj.errCode > 0) {
        location.href = '/index.html'
        }
        }
        }
        }
        </script>
