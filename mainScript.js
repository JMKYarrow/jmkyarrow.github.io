$(document).ready(function () {
    $("#mainSlider").rgbslide(3550);

    $(".topBtn").click(function () {
        $("body").animate({ scrollTop: "0px"},800);
    });
    $(".appBtn").click(function () {
        //$("body").animate({ scrollTop: $("#apps").offset().top + "px" }, 800);
    });
    $(".webBtn").click(function () {
        $("body").animate({ scrollTop: $("#web").offset().top + "px" }, 800);
    });
    $(".creBtn").click(function () {
        $("body").animate({ scrollTop: $("#creations").offset().top + "px" }, 800);
    });
    $(".twiBtn").click(function () {
        $("body").animate({ scrollTop: $("#twitter").offset().top + "px" }, 800);
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