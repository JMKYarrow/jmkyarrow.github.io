$(document).ready(function () {

    var selectedButton = "#navBtn0";

    var grades = [["<span style='font-size:24px'>Subject</span>", "<span style='font-size:24px'>Grade</span>"], ["Biology", "9"], ["Chemistry", "9"], ["Computer Sci.", "8"], ["English Lit.", "8"], ["English Lang.", "8"], ["French", "8"], ["Maths", "9"], ["Music", "8"], ["Physics", "9"], ["R.S.", "8"],]

    for (var i = 0; i < grades.length; i++){
        $("#gradesTable").append('<div><div class="cell col0" style="top:' + (46 * (i + 1)) + 'px;">' + grades[i][0] + '</div><div class="cell col1" style="top:' + (46 * (i + 1)) + 'px;">' + grades[i][1] + '</div></div>')
    }

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

    $("#viewGradesButton").click(function () {
        $("#gradesModal").css("top", 0);
        $("body").css("overflow-y", "hidden");
    });

    $(".modalCloseButton").click(function () {
        $("#gradesModal").css("top", "-100vh");
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