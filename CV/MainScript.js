$(document).ready(function () {

    var selectedButton = "#navBtn0";

    $("#navIndicator").css("top", $(selectedButton).css("height"));
    $(".pane").css("top", $(selectedButton).css("height"));
    updateNavIndicator(selectedButton);
    window.onresize = function () {
        updateNavIndicator(selectedButton);
    }

    $(".navButton").click(function () {
        selectedButton = "#" + $(this).prop("id");
        updateNavIndicator(selectedButton);
        updatePaneArea(selectedButton);
    });

});

function updateNavIndicator(buttonID) {
    $("#navIndicator").css("width", $(buttonID).css("width"));
    $("#navIndicator").css("left", $(buttonID).position().left);
}

function updatePaneArea(buttonID) {
    $(".pane").removeClass("paneIsVisible");
    $(buttonID.replace("navBtn", "pane")).addClass("paneIsVisible");
}