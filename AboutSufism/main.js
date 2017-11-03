$(document).ready(function () {
    window.onscroll = function () {
        $("#titleUnderline").css("width", window.scrollY * 3 + 32);
        $("#classification").css("opacity", (window.scrollY / 200).toString());
        $("#shahadaAndSalah").css("opacity", ((window.scrollY - $("#classification").height()) / 200).toString());
        $("#sawmAndFitr").css("opacity", ((window.scrollY - $("#classification").height() - $("#shahadaAndSalah").height()) / 200).toString());
        $("#zakahAndAdha").css("opacity", ((window.scrollY - $("#classification").height() - $("#shahadaAndSalah").height() - $("#sawmAndFitr").height()) / 200).toString());
        $("#hajjAndJihad").css("opacity", ((window.scrollY - $("#classification").height() - $("#shahadaAndSalah").height() - $("#sawmAndFitr").height() - $("#zakahAndAdha").height()) / 200).toString());
        $("#ashuraAndBibliography").css("opacity", ((window.scrollY - $("#classification").height() - $("#shahadaAndSalah").height() - $("#sawmAndFitr").height() - $("#zakahAndAdha").height() - $("#hajjAndJihad").height()) / 200).toString());
    };
});