$(document).ready(function () {
    $("#mainSlider").rgbslide(3550);

    $(".topBtn").click(function () {
        $("body").animate({ scrollTop: "0px"});
    });
    $(".appBtn").click(function () {
        $("body").animate({ scrollTop: $("#apps").offset().top + "px" });
    });
    $(".webBtn").click(function () {
        $("body").animate({ scrollTop: $("#web").offset().top + "px" });
    });
    $(".creBtn").click(function () {
        $("body").animate({ scrollTop: $("#creations").offset().top + "px" });
    });

    $("#sectionMenu").css("height", $("body").height() + "px");
    $(".sect h1, #navBar h1").click(function () {
        $("#sectionMenu").fadeIn();
        $("body").css("overflow-y", "hidden");
    });
    $("#sectionMenu h1").click(function () {
        $("#sectionMenu").fadeOut();
        $("body").css("overflow-y", "auto");
    });
});