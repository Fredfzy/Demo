<?php 
	$client_code =  urlencode('&clientCode='.$_GET['clientCode']);
$appid = $_GET['corpid'];
if($appid=='') $appid = 'wx7830e56481e6d576';
$config = urlencode('?config='.$_GET['config']);
$type = urlencode('&type='.$_GET['type']);
$id = urlencode('&id='.$_GET['id']);
$url = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid='.$appid.'&redirect_uri=http%3a%2f%2f1.33oa.applinzi.com%2fredirect.php'.$config.$type.$id.$client_code.'&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect';  

$url1 = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid='.$appid.'&redirect_uri=http%3a%2f%2f1.33oa.applinzi.com%2fqr.php'.$config.$type.$id.$client_code.'&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect';  
?>
<script>window.location.href='<?php echo $url ?>'</script>  