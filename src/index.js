
/// <reference path="../typings/tjq.d.ts" />

$(function () {
    let elems = $(".action").children();
    for (let i = 0; i < elems.length; i++) {
        const elem = $(elems[i]);
        elem.css("--size", elem.attr("size"));
    }

    $("#btn_run").on("click", () => {
        console.log("run", $("#editor").val());
    })

})