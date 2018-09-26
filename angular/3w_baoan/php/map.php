<?php
header("Content-Type:text/html; charset=utf-8");
header('Access-Control-Allow-Origin: *');
$x = $_GET["x"]; 
$y = $_GET["y"]; 
function httpGet($url) {
    $curl = curl_init();
    curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($curl, CURLOPT_TIMEOUT, 500);
    curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, false);
    curl_setopt($curl, CURLOPT_SSL_VERIFYHOST, false);
    curl_setopt($curl, CURLOPT_URL, $url);

    $res = curl_exec($curl);
    curl_close($curl);

    return $res;
  }
$url = "http://apis.map.qq.com/ws/geocoder/v1/?location=".$x.",".$y."&key=TQZBZ-UPYWF-V2QJD-JU7ZE-R65K6-Z3FAZ&get_poi=1";
$location = json_decode(httpGet($url));
echo $location->result->formatted_addresses->recommend;
?>