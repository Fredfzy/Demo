<!DOCTYPE html>
<html lang="en" ng-app="oa">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="initial-scale=1, maximum-scale=1, user-scalable=no, width=device-width">
    <link rel="stylesheet" href="ionic/css/ionic.css"/>
    <link rel="stylesheet" href="ionic/css/style.css"/>
    <script src="http://res.wx.qq.com/open/js/jweixin-1.0.0.js"></script>
</head>
<body>21321
    <h1>2222</h1>
    <div ui-view></div>
    <script src="ionic/js/ionic.bundle.js"></script>
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

    ]
    });
    wx.ready(function () {
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
