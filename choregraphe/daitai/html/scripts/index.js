$(function() {
    // var session = new QiSession();
    // function pepper_say(message){
    //     session.service("ALMemory").done(function (ALMemory) {
    //       ALMemory.raiseEvent("MyApps/Slack", message);
    //     });
    // }
    var header = "<div class='main-header'>";
    header += "<img src='images/logo2.png'>";
    header += "</div>";
    $(".surface").prepend(header);
    $(".surface").hide();
    $("#list").fadeIn();
    $(".bread_cramb p").append("リスト");
    var image = new Array(8);
    for (var i = 0; i < image.length; i++) {
        image[i] = "https://s3-ap-northeast-1.amazonaws.com/peco-images/images/16508.jpg";
    }
    for (i = 0; i < image.length / 4; i++) {
        for (var j = 0; j < image.length / 2; j++) {
            $(".row" + i + " .col" + j).append("<img src='" + image[(4 * i) + j] + "'>");
            $(".row" + i + " .col" + j).bind("click", {
                row: i,
                col: j
            }, moveDetailHandler);
        }
    }

    function moveDetailHandler(event) {
        moveDetail(event.data);
    }

    function moveDetail(data) {
        $(".row0").hide();
        $(".row1").hide();
        $(".bread_cramb p").empty();
        $(".bread_cramb p").append("リスト > 詳細");
        $(".bread_cramb p").unbind();
        $(".bread_cramb").addClass("cur");
        $(".bread_cramb p").click(function() {
            moveList();
        });
        $(".surface").hide();
        $(".main-header").hide();
        $(".bread_cramb").hide();
        $(".image-area-block").empty();
        $(".image-area-block").append("<img src='" + image[(4 * data.row) + data.col] + "'>").hide();
        var height = $(window).height();
        $(".image-area-block img").css("height", height - 66 - 90);
        $("#detail").show();
        $(".bread_cramb").show();
        $(".main-header").show();
        $(".image-area-block").fadeIn();
        var canvas = '<canvas id="canvas" width="' + $(".image-area img").width() + 'px" height="' + $(".image-area img").height() + 'px">残念ながらHTML5に対応していません</canvas>';
        $(".image-area-block").append(canvas);
        prepareCanvas();
    }

    function moveList() {
        $(".bread_cramb p").empty();
        $(".bread_cramb p").append("リスト");
        $(".bread_cramb p").unbind();
        $(".bread_cramb").removeClass("cur");
        $(".surface").hide();
        $(".main-header").hide();
        $(".bread_cramb").hide();
        $("#list").show();
        $(".bread_cramb").show();
        $(".main-header").show();
        $(".row0").fadeIn();
        $(".row1").fadeIn();
    }

    function prepareCanvas() {
        var offset = 5;
        var startX;
        var startY;
        var flag = false;
        var finishX;
        var finishY;
        var canvas = $('canvas').get(0);
        if (canvas.getContext) {
            var context = canvas.getContext('2d');
            context.strokeStyle = "#ee0000";
        }

        $('canvas').on("touchstart mousedown", function(e) {
            flag = true;
            startX = (e.pageX || e.originalEvent.changedTouches[0].pageX) - $(this).offset().left - offset;
            startY = (e.pageY || e.originalEvent.changedTouches[0].pageY) - $(this).offset().top - offset;
            return false; // for chrome
        });

        $('canvas').on("touchmove mousemove", function(e) {
            if (flag) {
                context.clearRect(0 , 0 , canvas.width , canvas.height);
                var endX = (e.pageX || e.originalEvent.changedTouches[0].pageX) - $('canvas').offset().left - offset;
                var endY = (e.pageY || e.originalEvent.changedTouches[0].pageY) - $('canvas').offset().top - offset;
                context.lineWidth = 10;
                context.beginPath();
                context.moveTo(startX, startY);
                context.lineTo(endX, endY);
                context.stroke();
                context.closePath();
                finishX = endX;
                finishY = endY;
            }
        });

        $('canvas').on('touchend mouseup', function() {
            flag = false;
        });

        $('canvas').on('mouseleave', function() {
            flag = false;
        });
    }
});