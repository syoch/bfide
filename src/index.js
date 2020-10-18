
/// <reference path="../typings/tjq.d.ts" />

let memory = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
let pointer = 0;

/**
 * Logging to Brainfuck output
 * @param {String} str Logging string
 */
function Logging(str) {
    $(".log")[0].innerText+=str;
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
                pointer -= 1;
                break;
            case ">":
                pointer += 1
                break;
            case "[":
                let start = i;
                let end = i;
                while (src[end] != "]" && src[end] != undefined)
                    end += 1;

                let loop = src.slice(start + 1, end);
                while (memory[pointer] != 0) {
                    executeBf(loop);
                }

                i = end;
                break;
            case "]":
                Logging("Unmatched bracket on" + i + "\n");
                throw "";
            case ",":
                // TODO: implement
                break;
            case ".":
                let a = String.fromCharCode(memory[pointer])
                Logging(a)
                break;
            default: console.log(ch); break;
        }
    }
}

$(function () {
    // smart style
    let elems = $(".action").children();
    for (let i = 0; i < elems.length; i++) {
        const elem = $(elems[i]);
        elem.css("--size", elem.attr("size"));
    }
    // load animation
    setTimeout(() => {
        let array = "Brainfuck Ide by syoch\n".split("");
        let i = 0;
        Logging(">>> ");
        let interval = setInterval(() => {
             Logging(array[i])
            i++;
            if (array[i] == undefined) {
                clearInterval(interval);
            }
        }, 10);
    }, 0);
    // html handler
    $("#btn_run").on("click", () => {
        executeBf($("#editor").val());
    })

})