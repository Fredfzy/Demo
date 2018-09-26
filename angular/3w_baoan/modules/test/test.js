/**
 * Created by qin on 2016/05/15.
 */
angular.module('oa')
    .controller('TestCtrl', function ($scope, $ionicModal) {
        var canvas, ctx, color = "#000"
            , modal;
        $ionicModal.fromTemplateUrl('modal-sign.tpl.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function (data) {
            modal = data;
            setTimeout(function () {
                newCanvas();
            }, 1000);
        });
        $scope.openModal = function () {
            modal.show();
        };
        function newCanvas() {
            //define and resize canvas
            document.getElementById("content").style.height = window.innerHeight - 90;
            var canvas = '<canvas id="canvas" width="' + window.innerWidth + '" height="' + (window.innerHeight - 90) + '"></canvas>';
            document.getElementById("content").innerHTML = canvas;

            // setup canvas
            canvas = document.getElementById("canvas")
            ctx = canvas.getContext("2d");
            ctx.strokeStyle = color;
            ctx.lineWidth = 3;

            // setup to trigger drawing on mouse or touch
            drawTouch();

            $scope.doSign = function () {
                document.getElementById("signImg").src = canvas.toDataURL();
                modal.hide();
            }
        }

        // prototype to	start drawing on touch using canvas moveTo and lineTo
        var drawTouch = function () {
            var start = function (e) {
                ctx.beginPath();
                x = e.changedTouches[0].pageX;
                y = e.changedTouches[0].pageY - 44;
                ctx.moveTo(x, y);
            };
            var move = function (e) {
                e.preventDefault();
                x = e.changedTouches[0].pageX;
                y = e.changedTouches[0].pageY - 44;
                ctx.lineTo(x, y);
                ctx.stroke();
            };
            document.getElementById("canvas").addEventListener("touchstart", start, false);
            document.getElementById("canvas").addEventListener("touchmove", move, false);
        };

    })

var obj1 = {
        "sqr": "Admin",
        "sqsj": "2016-06-15 10:44:02",
        "gw": 237,
        "sqbm": 523,
        "mx": [
            {"dj": 0, "ysje": "0.00", "kmmc": "福利", "fymc": "人员费用", "kmlb": "130", "bh": "01-RYF-001-02", "ysbm": 422}],
        "bz": "", "je": "0.00", "dx": "0.00"
    },
    obj2 = {
        "sqr": "qy",
        "gw": 3,
        "sqbm": 1,
        "mx": [{
            "ysje": "12345677654321.00",
            "sl": 1111111,
            "dj": 11111111,
            "kmmc": " 福利",
            "fymc": "人员费用",
            "kmlb": "130",
            "bh": "01-RYF-001-02",
            "ysbm": 422
        }],
        "je": "12345677654321.00",
        "dx": 0
    }