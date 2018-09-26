<!DOCTYPE html>
<?php
	$client_code = $_GET["clientCode"]; 
    $code = $_GET["code"];  
	$config = $_GET['config'];
    require_once "jssdk.php";
	$jssdk = new JSSDK('configs/'.$config.'.json');
	$host = $jssdk->tokenHost;
	$agentid = $jssdk->appId;
    $access_token = $jssdk->getAccessToken();  
    $user_url = 'https://qyapi.weixin.qq.com/cgi-bin/user/getuserinfo?access_token='.$access_token.'&code='.$code.'&agentid='.$agentid; 
    $user_obj = json_decode($jssdk->httpGet($user_url)); 
	$user_id = $user_obj->UserId;
	$user_name = $user_obj->name;
?>
<html lang="en" ng-app="oa">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="initial-scale=1, maximum-scale=1, user-scalable=no, width=device-width">
    <script>
        window.onload = function(){
            var btnLogin = document.getElementById('btnLogin');
            var loading = document.getElementById('loading');
            btnLogin.onclick = function(){
                btnLogin.style.display = 'none';
                loading.style.display = 'block';
                var xmlhttp;
if (window.XMLHttpRequest)
  {// code for IE7+, Firefox, Chrome, Opera, Safari
  xmlhttp=new XMLHttpRequest();
  }
else
  {// code for IE6, IE5
  xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
  }
                xmlhttp.open("GET","<?php echo $host?>/auth/readyToScan/<?php echo $client_code?>/<?php echo $user_id?>",true);
xmlhttp.send();
            }
        }
    </script>
</head>
<body>
    <div style="text-align:center">
        <h1><?php echo $user_id?></h1>
<!--         <h1><?php echo $host?>/auth/readyToScan/<?php echo $client_code?>/<?php echo $user_id?></h1>
 -->    </div>
    <div style="width:90%;margin:5%;position:absolute;bottom:0;left:0;text-align:center;padding:10px 0;font-weight:600;background:#1ab394;color:#fff;border-radius:3px"
    id="btnLogin">点击登录</div>
    <div style="width:90%;margin:5%;position:absolute;bottom:0;left:0;text-align:center;padding:10px 0;font-weight:600;display:none" id="loading">正在登录</div>
</body>
</html>
