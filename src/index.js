
/// <reference path="../typings/tjq.d.ts" />

let memorys;
let memory = [
    0, 0, 0, 0, 0, 
    0, 0, 0, 0, 0, 
    0, 0, 0, 0, 0, 
    0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 
];
let pointer = 0;

/**
 * Logging to Brainfuck output
 * @param {String} str Logging string
 */
function Logging(str) {
    if (Logging.space == 1) {
        $(".log")[0].innerText += " " + str;
    } else {
        $(".log")[0].innerText += str;
    }

    if (str.endsWith(" ")) {
        Logging.space = 1;
    } else {
        Logging.space = 0;
    }
}
Logging.space = 0;

/**
 * sleep
 * @param {Number} time delay time
 */
function sleep(time) {
    return new Promise((resolve, reject) => {
        if(time==0){
            setZeroTimeout(resolve,0);
        }else{
            setTimeout(resolve, time);
        }
    });
}

/**
 * set memory cursor position
 * @param {Number} pos new position
 */
function setMemoryCursor(pos){
    $(".memory").children().css("background-color","transparent");
    $(".memory").children()[pos].style.backgroundColor="white"
}
setMemoryCursor.pos=0;

/**
 * execute Brain f**k source
 * @param {String} _src Execute source
 */
async function executeBf(src) {
    for (let i = 0; i < src.length; i++) {
        const ch = src[i];
        switch (ch) {
            case "+":
                memory[pointer] += 1;
                if (memory[pointer] == 256) {
                    memory[pointer]=0;
                }
                memorys[pointer].innerHTML = memory[pointer];
                break;
            case "-":
                memory[pointer] -= 1;
                if (memory[pointer] < 0) {
                    memory[pointer]=255;
                }
                memorys[pointer].innerHTML = memory[pointer];
                break;
            case "<":
                pointer -= 1;
                setMemoryCursor(pointer);
                if (pointer == -1) {
                    let msg = "pointer less 0(underflow)\n";
                    Logging(msg);
                    throw msg;
                }
                break;
            case ">":
                pointer += 1;
                setMemoryCursor(pointer);
                if (pointer > memory.length-1) {
                    let msg = "pointer greater 19(underflow)\n";
                    Logging(msg);
                    throw msg;
                }
                break;
            case "[":
                let start = i;
                let end = i;
                let depth=1;
                while (depth!=0){
                    end+=1;
                    if(src[end]=="]"){
                        depth-=1;
                    }
                    if(src[end]=="["){
                        depth+=1;
                    }
                    if(src[end]==undefined){
                        break;
                    }
                }

                let loop = src.slice(start + 1, end);
                while (memory[pointer] != 0) {
                    await executeBf(loop);
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
            default: break;
        }
        await sleep($("#delay").val());
    }
}

$(function () {
    // init html
    let elems = $(".action").children();
    for (let i = 0; i < elems.length; i++) {
        const elem = $(elems[i]);
        elem.css("--size", elem.attr("size"));
    }
    setMemoryCursor(0)
    // show memory all 0
    memorys = $(".memory").children();
    for (let i = 0; i < memory.length; i++) {
        memorys[i].innerHTML = "0";
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
        for (let i = 0; i < memory.length; i++) {
            memory[i] = 0;
            memorys[i].innerHTML = "0";
        }
        pointer = 0;
        executeBf($("#editor").val());
    });
    $("#btn_add").on("click",()=>{
        let elem=$("<memory>").html("0");
        memory.push(0);
        $(".memory").append(elem);
        memorys=memorys.add(elem);
        $("#current_memsize").html(memory.length)
    })
    $("#btn_sub").on("click",()=>{
        // sub memory
        // update #current_memsize
    })
})