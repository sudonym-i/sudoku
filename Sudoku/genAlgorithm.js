
function genorateSudoku() {
    function setup() {
        //generate empty matrix
        for (let i = 0; i < rows; i++) {
            temporaryPositions.push(new Array(rows));
        }
        for (let i = 0; i < 3; i++) {
            numberMap.push(new Array(3));
        }
    }
    function checkAndAddToMap(xPos, yPos) {
        if (numberMap[yPos][xPos] == null) {
            numberMap[yPos][xPos] = x;
        }
        else { checkAndAddToMap(Math.round(Math.random() * 2), Math.round(Math.random() * 2)) }
    }
    function createNumberMap() {
        for (x = 1; x < 10; x++) {
            checkAndAddToMap(Math.round(Math.random() * 2), Math.round(Math.random() * 2))
        }
    }
    function generateBlock(blockx, blocky) {
        for (x = 0; x < 3; x++) {
            for (y = 0; y < 3; y++) {
                answerMap[x + blockx * 3][y + blocky * 3] += numberMap[y][x]
            }
        }
    }
    function generatePuzzle() {
        let flipCheckI = 0; let flipCheckB = 0;
        for (i = 0; i < 3; i++) {
            /// i is x
            directionX = Math.round(Math.random)
            for (b = 0; b < 3; b++) {
                // b is y
                numberMap.splice(0, 0, numberMap.splice(2, 1)[0]);
                if (flipCheckI != i) { numberMap.splice(0, 0, numberMap.splice(2, 1)[0]) }
                if (flipCheckB != b) { for (n = 0; n < 3; n++) { numberMap[n].splice(0, 0, numberMap[n].splice(2, 1)[0]) } }
                generateBlock(i, b)
                flipCheckI = i
                flipCheckB = b
            }
        }
        render()
    }
    setup()
    createNumberMap()
    generatePuzzle()
}

document.fonts.ready.then(() => {
    genorateSudoku();
    const addedMemory = []
    for (let y = 0; y < rows; y++) {
        for (let x = 0; x < rows; x++) {
            addedMemory.push(answerMap[x][y] % 10)
            if (Math.round(Math.random() * 2) == 1) {
                positions[x][y] = answerMap[x][y]
            }
        }
    }

    render()

});
