$(document).ready(function () {

    var selectedButton = "#navBtn0";

    var grades = [["<span style='font-size:24px'>Subject</span>", "<span style='font-size:24px'>Grade</span>"], ["Biology", "9"], ["Chemistry", "9"], ["Computer Sci.", "8"], ["English Lit.", "8"], ["English Lang.", "8"], ["French", "8"], ["Maths", "9"], ["Music", "8"], ["Physics", "9"], ["R.S.", "8"],]

    $("#navIndicator").css("top", $(selectedButton).css("height"));
    $(".pane").css("top", $(selectedButton).css("height"));
    updateNavIndicator(selectedButton);
    window.onresize = function () {
        updateNavIndicator(selectedButton);
        $("#navIndicator").css("top", $(selectedButton).css("height"));
    }

    $(".navButton").click(function () {
        selectedButton = "#" + $(this).prop("id");
        updateNavIndicator(selectedButton);
        updatePaneArea(selectedButton);
    });

    $("#viewGradesButton").click(function () {
        $("#gradesModal").css("top", 0);
        $("body").css("overflow-y", "hidden");
    });

    $(".modalCloseButton").click(function () {
        $("#gradesModal").css("top", "-200vh");
        $("body").css("overflow-y", "auto");
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