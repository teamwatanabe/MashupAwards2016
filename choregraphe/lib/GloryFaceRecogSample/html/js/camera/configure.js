$(function () {
    // タブレットの反応改善施策
    $("a, .tap, button, input:checkbox").bind('touchstart', function (e) {
        e.preventDefault();
    });
    $("a, .tap, button, input:checkbox").bind('touchmove', function (e) {
        e.preventDefault();
    });
    $("a, .tap, button, input:checkbox").bind('touchend', function (e) {
        e.preventDefault();
        $(this).click()
    });
});