let canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
ctx.font = `10px monospace`;
const temporaryPositions = []
const answerMap = []
const numberMap = []
let modifyer = false; let mobileFactor = 0
if (navigator.userAgent.match(/Android/i)
    || navigator.userAgent.match(/webOS/i)
    || navigator.userAgent.match(/iPhone/i)
    || navigator.userAgent.match(/iPad/i)
    || navigator.userAgent.match(/iPod/i)
    || navigator.userAgent.match(/BlackBerry/i)
    || navigator.userAgent.match(/Windows Phone/i)) {
    modifyer = 70; document.getElementById("Title").style = "font-size: 40px"
    canvas.height = 330; canvas.width = document.documentElement.clientWidth; mobileFactor = 5
} else {
    modifyer = 0; canvas.height = 400; canvas.width = document.documentElement.clientWidth + 20; mobileFactor = 0
}
let vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0)
const rows = 9;
const scale = (400 - modifyer) ** 1 / 10;
let xMargin = (vw - scale * rows) / 2
const positions = [];
const yMargin = 10;
const yTop = 100;
const selected = {};
selected.confirm = false;
let errorCounter = 0;
const population = 10;
const selectedMemory = [];
let puzzleFinished = false;
function drawBorders() {
    ctx.lineWidth = 3;
    ctx.moveTo(xMargin, yMargin);
    ctx.lineTo(xMargin + scale * rows, yMargin);
    ctx.lineTo(xMargin + scale * rows, yMargin + scale * rows);
    ctx.lineTo(xMargin, yMargin + scale * rows);
    ctx.lineTo(xMargin, yMargin);
    ctx.moveTo(xMargin, yMargin + scale * 3);
    ctx.lineTo(xMargin + scale * rows, yMargin + scale * 3);
    ctx.moveTo(xMargin, yMargin + scale * 6);
    ctx.lineTo(xMargin + scale * rows, yMargin + scale * 6);
    ctx.moveTo(xMargin + 3 * scale, yMargin);
    ctx.lineTo(xMargin + 3 * scale, yMargin + scale * rows);
    ctx.moveTo(xMargin + 6 * scale, yMargin);
    ctx.lineTo(xMargin + 6 * scale, yMargin + scale * rows);
    //shadow
    ctx.moveTo(xMargin + scale * rows + 3, yMargin + 2);
    ctx.lineTo(xMargin + scale * rows + 3, yMargin + scale * rows + 3);
    ctx.lineTo(xMargin, yMargin + scale * rows + 3);
}
function setup() {
    //generate empty matrices
    for (let i = 0; i < rows; i++) {
        positions.push(new Array(rows));
        answerMap.push(new Array(rows));
    }



//encode quadrant values
for (let y = 0; y < rows; y++) {
    for (let x = 0; x < rows; x++) {
        switch (true) {
            case (x < 3 && y < 3):
                positions[x][y] = 10;
                answerMap[x][y] = 10;
                break;
            case (x > 2 && x < 6 && y < 3):
                positions[x][y] = 20;
                answerMap[x][y] = 20;
                break;
            case (x > 5 && y < 3):
                positions[x][y] = 30;
                answerMap[x][y] = 30;
                break;
            case (x < 3 && y > 2 && y < 6):
                positions[x][y] = 40;
                answerMap[x][y] = 40;
                break;
            case (x > 2 && x < 6 && y > 2 && y < 6):
                positions[x][y] = 50;
                answerMap[x][y] = 50;
                break;
            case (x > 5 && y > 2 && y < 6):
                positions[x][y] = 60;
                answerMap[x][y] = 60;
                break;
            case (x < 3 && y > 5):
                positions[x][y] = 70;
                answerMap[x][y] = 70;
                break;
            case (x > 2 && x < 6 && y > 5):
                positions[x][y] = 80;
                answerMap[x][y] = 80;
                break;
            case (x > 5 && y > 5):
                positions[x][y] = 90;
                answerMap[x][y] = 90;
                break;
        }
    }
}
}

function setupDraw() {
    canvas.style = "width: fit-content;";
    canvas.style = "height: fit-content;";
    ctx.font = `${scale - 20}px Nova Square`;
    ctx.beginPath();
    drawBorders();
    ctx.stroke();
    ctx.lineWidth = 1;
    //render grid
    for (let y = 0; y < rows; y++) {
        for (let x = 0; x < rows; x++) {
            ctx.fillStyle = "rgba(0,0,0,1)";
            ctx.rect(
                elementPos(x, scale, xMargin),
                elementPos(y, scale, yMargin),
                scale,
                scale,
            );
            if (positions[x][y] % 10 != 0) {
                ctx.fillText(
                    `${positions[x][y] % 10}`,
                    elementPos(x, scale, xMargin + 10),
                    elementPos(y, scale, 1.5 * yMargin),
                );
            }
            ctx.fillStyle = "rgb(211, 174, 129)";
            if (Math.floor(positions[x][y] / 10) % 2 != 0) {
                ctx.fillRect(
                    elementPos(x, scale, xMargin),
                    elementPos(y, scale, yMargin),
                    scale,
                    scale,
                );
            }
            ctx.stroke();
        }
    }
    render()
}
function render() {
    vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0)
    xMargin = (vw - scale * rows) / 2
    if (errorCounter != 0) { document.getElementById("commentary").innerHTML = `Errors  ${errorCounter}` }
    puzzleFinished = true;
    canvas.style = "width: fit-content;";
    canvas.style = "height: fit-content;";
    ctx.font = `${scale - 12}px Nova Square`;
    ctx.beginPath();
    ctx.clearRect(0, 0, 100080, 100080);
    drawBorders();
    ctx.stroke();
    ctx.lineWidth = 1;
    //render grid
    for (let y = 0; y < rows; y++) {
        for (let x = 0; x < rows; x++) {
            ctx.rect(
                elementPos(x, scale, xMargin),
                elementPos(y, scale, yMargin),
                scale,
                scale,
            );
            ctx.fillStyle = "rgb(211, 174, 129)";
            if (Math.floor(positions[x][y] / 10) % 2 != 0) {
                ctx.fillRect(
                    elementPos(x, scale, xMargin),
                    elementPos(y, scale, yMargin),
                    scale,
                    scale,
                );
            }
            if (positions[x][y] % 10 != 0) {
                ctx.fillStyle = "rgba(0,0,0,1)";
                ctx.fillText(
                    `${positions[x][y] % 10}`,
                    elementPos(x, scale, xMargin + 10),
                    elementPos(y, scale, 4 * yMargin - mobileFactor),
                );
            } else {
                puzzleFinished = false;
            }
            ctx.stroke();
        }
    }
    if (selected.confirm == true) {
        //highlight selected + rows
        ctx.fillStyle = "rgba(0,0,100,0.4)";
        ctx.fillRect(
            elementPos(selected.x, scale, xMargin),
            elementPos(selected.y, scale, yMargin),
            scale,
            scale,
        );
        for (let i = 0; i < 9; i++) {
            ctx.fillStyle = "rgba(0,0,100,0.15)";
            ctx.fillRect(
                elementPos(i, scale, xMargin),
                elementPos(selected.y, scale, yMargin),
                scale,
                scale,
            );
            ctx.fillRect(
                elementPos(selected.x, scale, xMargin),
                elementPos(i, scale, yMargin),
                scale,
                scale,
            );
        }
    }
    if (puzzleFinished == true) { puzzleCompleted() }
}

function elementPos(x, scale, margin) {
    return x * scale + margin;
}
function selectCell(event) {
    if (
        event.clientX > xMargin &&
        event.clientX < xMargin + scale * rows
    ) {
        if (
            event.clientY > yTop &&
            event.clientY < yTop + scale * rows + (scale / 2)
        ) {
            // positions[Math.round((event.clientX-(xMargin/2))/scale)][Math.round((event.clientY-yMargin)/scale)-1] <-- math for coordinates
            if (
                Math.round((event.clientX - xMargin + 1) / scale) - 1 !=
                -1 &&
                Math.round((event.clientY - yTop) / scale) - 1 != -1
            ) {
                selected.confirm = true;
                selected.x =
                    Math.round(((event.clientX + 10) - xMargin) / scale) - 1;
                selected.y =
                    Math.round((event.clientY - yTop) / scale) - 1;
                render();
            } else {
                selected.confirm = false;
                render();
            }
        } else {
            selected.confirm = false;
            render();
        }
    }
}
function clicked(button) {
    if (
        selected.confirm == true &&
        positions[selected.x][selected.y] % 10 == 0
    ) {
        positions[selected.x][selected.y] += button;
        selectedMemory.push(selected.x * 10 + selected.y);
        render();
        if (checkAgainstRules(selected.x, selected.y) == false) {
            ctx.fillStyle = "rgba(100,0,0,0.4)";
            positions[selected.x][selected.y] -=
                positions[selected.x][selected.y] % 10;
            selectedMemory.pop();
            ctx.fillRect(
                elementPos(selected.x, scale, xMargin),
                elementPos(selected.y, scale, yMargin),
                scale,
                scale,
            );
        }
    }
}
function checkAgainstRules(Xpos, Ypos) {
    if (positions[Xpos][Ypos] != answerMap[Xpos][Ypos]) { errorCounter++; return false; }
}
function erase() {
    positions[selected.x][selected.y] =
        Math.floor(positions[selected.x][selected.y] / 10) * 10;
    render();
}
function undo() {
    if (selectedMemory.length != 0) {
        positions[
            Math.floor(selectedMemory[selectedMemory.length - 1] / 10)
        ][selectedMemory[selectedMemory.length - 1] % 10] =
            Math.floor(positions[Math.floor(selectedMemory[selectedMemory.length - 1] / 10,)][selectedMemory[selectedMemory.length - 1] % 10] / 10,) * 10;
        selectedMemory.pop();
        render();
    }
}
// function puzzleCompleted() {
//   canvas.style = "display: none;"
//   document.getElementById("commentary").style = "display: none;"
//   document.getElementById("doubleCont").style = "display: none;"
//   document.getElementById("Title").innerHTML = "<br><br><br>Puzzle Completed!"
//   document.getElementById("confetti").style = "display: flex;"
// }
setup();
setupDraw();