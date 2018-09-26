<?php
$config = $_GET['config'];
require_once "jssdk.php";
$jssdk = new JSSDK('configs/'.$config.'.json');
$signPackage = $jssdk->GetSignPackage();
$ticket = $jssdk->getJsApiTicket();
$accessToken = $jssdk->getAccessToken();
$userId = $_GET["id"];
$appToken = $_GET["token"];
$host = $jssdk->tokenHost;
$url = $host."/auth/token/".$userId;
$res = json_decode($jssdk->httpGet($url));
//echo $jssdk->httpGet($url);
//$url = "https://qyapi.weixin.qq.com/cgi-bin/user/get?access_token=".$accessToken."&userid=".$userId;
//$res = json_decode($jssdk->httpGet($url));
$ver = '?69';
?>
<!DOCTYPE html>
<html lang="en" ng-app="oa">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="initial-scale=1, maximum-scale=1, user-scalable=no, width=device-width">
    <link rel="stylesheet" href="ionic/css/ionic.css"/>
    <link rel="stylesheet" href="ionic/css/style.css"/>
    <script src="http://res.wx.qq.com/open/js/jweixin-1.0.0.js"></script>
    <script>
        (function () {
            wx
            ver = '<?php echo $ver;?>0';
            userInfo = {
                id: Number('<?php echo $res->id;?>'),
        		loginName: '<?php echo $userId;?>',
                name:'<?php echo $res->name;?>',
                avatar: '<?php echo $res->avatar;?>',
                groupId: Number('<?php echo $res->group_id;?>'),
                roleId: Number('<?php echo $res->role_id;?>'),
                groupName: '<?php echo $res->groupName?>',
                roleName: '<?php echo $res->roleName?>',
                signImg: '<?php echo $res->signImg?>',
                userType: '<?php echo $res->userType?>'
            }
            window.config = '<?php echo $config;?>'
            window.domain = '<?php echo $host;?>'
            window.accessToken = '<?php echo $accessToken;?>'
        })()
    </script>
</head>
<body>
    <div ui-view></div>
    <script src="ionic/js/ionic.bundle.min.js"></script>
    <script src="modules/config/app.js<?php echo $ver;?>"></script>
    <script src="modules/config/api.js"></script>
    <script src="modules/config/util.js<?php echo $ver;?>"></script>

    <script src="engine/core.js"></script>
    <script src="engine/view.js"></script>
    <script src="engine/ctrl.js"></script>

    <script src="modules/main/dashboard.js<?php echo $ver;?>"></script>

    <script src="modules/pro/proForm.js"></script>
    <script src="modules/pro/proHandle.js"></script>
    <script src="modules/pro/proView.js"></script>

    <script src="modules/main/att.js"></script>
    <script src="modules/topic/topic.js"></script>
    <script src="modules/workflow/workflow.js"></script>
    <script src="modules/flow/flow.js<?php echo $ver;?>">"></script>
    <script src="modules/task/task.js"></script>
    <script src="modules/app/app.js<?php echo $ver;?>"></script>
    <script src="modules/report/report.js"></script>
    <script src="modules/project/project.js"></script>
    <script src="modules/archive/archive.js"></script>
    <script src="modules/crm/crm.js"></script>
    <script src="modules/attendance/attendance.js<?php echo $ver;?>"></script>
    <script src="modules/components/components.js<?php echo $ver;?>"></script>
    <script src="vendors/datepicker/ionic-datepicker.bundle.min.js"></script>
</body>
    <script>
    wx.config({
            debug: false,
            appId: '<?php echo $signPackage["appId"];?>',
            timestamp: <?php echo $signPackage["timestamp"];?>,
            nonceStr: '<?php echo $signPackage["nonceStr"];?>',
            signature: '<?php echo $signPackage["signature"];?>',
            jsApiList: [
                'checkJsApi',
                'onMenuShareTimeline',
                'onMenuShareAppMessage',
        		'chooseImage',
        		'uploadImage',
        		'previewImage',
               'openLocation',
               'getLocation',
               'hideOptionMenu',
               'hideAllNonBaseMenuItem'

    ]
    });
    wx.ready(function () {
        wx.hideOptionMenu();
        wx.hideAllNonBaseMenuItem();
            // 在这里调用 API
            // 1 判断当前版本是否支持指定 JS 接口，支持批量判断
            document.querySelector('#checkJsApi').onclick = function () {
                wx.checkJsApi({
                    jsApiList: [
                        'getNetworkType',
                        'previewImage'
                    ],
                    success: function (res) {
                        alert(JSON.stringify(res));
                    }
                });
            };
    });


</script>
</html>

</html>
