<!DOCTYPE html>
<html lang="en">
<head>
    <meta name="viewport" content="initial-scale=1, maximum-scale=1, user-scalable=no, width=device-width"> 
    <meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate" />
    <meta http-equiv="Pragma" content="no-cache" />
    <meta http-equiv="Expires" content="0" />
</head>
     <style>
        body{
            font-family:"Microsoft YaHei","Hiragino Sans GB", "WenQuanYi Micro Hei", sans-serif;
        }
    .loading  {
	background: rgba(0, 50, 250, 0);
	position: relative;
	margin: 5em auto 0 auto;
	width: 3em; 
	height: 3em;
	animation-name:rotate;
}

.loading,
.loading:before,
.loading:after  {
	border-radius: 100%;
	animation-duration: 3s;
	animation-iteration-count: infinite;
	animation-timing-function: ease-in;
}

.loading:before,
.loading:after  {
	content: "";
	position: absolute;
	top: 0; 
	left: 0;
	width: inherit; 
	height: inherit;
}

.loading:before  {
	background: rgba(200, 250, 100, 0);
	animation-name: ring;
}

.loading:after  {
	background: rgba(250, 0, 200, 0);
	animation-name: ring2;
}

@keyframes rotate  {
	0%  {
		transform: rotateZ(0deg) scaleX(0.1) scaleY(0.1) translateZ(0);
		box-shadow: inset 0.8em 0 0 rgba(255, 0, 0, 0.5), 
					inset 0 0.8em 0 rgba(252, 150, 0, 0.5), 
					inset -0.8em 0 0 rgba(0, 255, 0, 0.5), 
					inset 0 -0.8em 0 rgba(0, 150, 255, 0.5);
	}
	
	/* hidden */
	
	85%, 100%  {
	
	/* 360deg * 10 */
	
		transform: rotateZ(3600deg) scaleX(2.01) scaleY(2) translateZ(0);
		box-shadow: inset 0 0 0 rgba(255, 0, 0, 0), 
					inset 0 0 0 rgba(252, 150, 0, 0), 
					inset 0 0 0 rgba(0, 255, 0, 0), 
					inset 0 0 0 rgba(0, 150, 255, 0);
	}
}

@keyframes ring  {
	0%  {
		transform: scaleX(0.1) scaleY(0.5);
		box-shadow: inset 0.8em 0 0 rgba(255, 0, 0, 0.5), 
					inset 0 0.8em 0 rgba(252, 150, 0, 0.5), 
					inset -0.8em 0 0 rgba(0, 255, 0, 0.5), 
					inset 0 -0.8em 0 rgba(0, 150, 255, 0.5);
	}
	
	/* hidden */
	
	75%, 100%  {
		transform: scaleX(2) scaleY(2.1);
		box-shadow: inset 0 0 0 rgba(255, 0, 0, 0), 
					inset 0 0 0 rgba(252, 150, 0, 0), 
					inset 0 0 0 rgba(0, 255, 0, 0), 
					inset 0 0 0 rgba(0, 150, 255, 0);
	}
}

@keyframes ring2  {
	0%  {
		transform: scaleX(0.5) scaleY(0.1);
		box-shadow: inset 0.8em 0 0 rgba(255, 0, 0, 0.5), 
					inset 0 0.8em 0 rgba(252, 150, 0, 0.5), 
					inset -0.8em 0 0 rgba(0, 255, 0, 0.5), 
					inset 0 -0.8em 0 rgba(0, 150, 255, 0.5);
	}
	
	/* hidden */
	
	65%, 100%  {
		transform: scaleX(2) scaleY(2.1);
		box-shadow: inset 0 0 0 rgba(255, 0, 0, 0), 
					inset 0 0 0 rgba(252, 150, 0, 0), 
					inset 0 0 0 rgba(0, 255, 0, 0), 
					inset 0 0 0 rgba(0, 150, 255, 0);
	}
        }</style>
    
    <body>
    <div style="text-align: center;color: #1ab394">
        <h1 style="margin:30px 0 -5px">OA</h1>
        <span>new version</span>
    </div>
	<div class="loading"></div>
	</body>
<!--body style="background: #1ab394 no-repeat; background-attachment:fixed;
  background-position:center;">
<div style="position: absolute;width: 100px;height: 100px;top:50%;left: 50%;
margin-top:-50px;margin-left: -50px;">
    <span style="font-size: xx-large;font-weight: 900;
    position: absolute; width:50px;height: 50px;top:50%;left: 50%;margin-top:-25px;margin-left: -25px
    ;text-align: center;color: white;line-height: 50px">OA</span>
    <svg width="100" height="100" viewBox="0 0 38 38" xmlns="http://www.w3.org/2000/svg" stroke="#fff">
        <g fill="none" fill-rule="evenodd">
            <g transform="translate(1 1)" stroke-width="2">
                <circle stroke-opacity=".5" cx="18" cy="18" r="18"/>
                <path d="M36 18c0-9.94-8.06-18-18-18">
                    <animateTransform
                            attributeName="transform"
                            type="rotate"
                            from="0 18 18"
                            to="360 18 18"
                            dur="1s"
                            repeatCount="indefinite"/>
                </path>
            </g>
        </g>
    </svg>

</div>
</body-->
</html>


<?php  
    $code = $_GET["code"];  
	$type = $_GET["type"];
	if($_GET['id'])
        $id = '/'.urldecode($_GET['id']);
	$config = $_GET['config'];
    require_once "jssdk.php";
	$jssdk = new JSSDK('configs/'.$config.'.json');
	$agentid = $jssdk->appId;
    $access_token = $jssdk->getAccessToken();  
//echo  $access_token;
    $user_url = 'https://qyapi.weixin.qq.com/cgi-bin/user/getuserinfo?access_token='.$access_token.'&code='.$code.'&agentid='.$agentid; 

//echo $user_url;
    $user_obj = json_decode($jssdk->httpGet($user_url)); 
	$user_id = $user_obj->UserId;
//echo $user_id;
	$token_host = $jssdk->tokenHost;
	$token_url = $token_host.'/auth/login/'.$user_id;
	$app_token_obj = json_decode($jssdk->httpGet($token_url));
	$app_token = $app_token_obj->token;
	$redirect_host = $jssdk->redirectHost;
	$redirect_url = '/index.php?id='.$user_id.'&token='.$app_token.'&config='.$config.'#/main/'.$type.$id;
//echo $redirect_url;
    ?> 

<script>
    window.location.href='<?php echo $redirect_url ?>'
    setTimeout("window.location.href='<?php echo $redirect_url ?>'",500)
</script>