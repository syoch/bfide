
/// <reference path="../typings/tjq.d.ts" />

let memory = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
let pointer = 0;

/**
 * Logging to Brainfuck output
 * @param {String} str Logging string
 */
function Logging(str) {
    console.log(str);
}

/**
 * execute Brain f**k source
 * @param {String} _src Execute source
 */
function executeBf(src) {
    for (let i = 0; i < src.length; i++) {
        const ch = src[i];
        switch (ch) {
            case "+":
                memory[pointer] += 1;
                break;
            case "-":
                memory[pointer] -= 1;
                break;
            case "<":
            default: console.log(ch); break;
        }
    }
}

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