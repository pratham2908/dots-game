const dotParent = document.querySelector('.dots');
const game = document.querySelector('.game');

let rowClicked = [];
let colClicked = [];
let rowArr = [];
let colArr = [];


for (let i = 0; i < 176; i++) {
    const dot = document.createElement('div');
    dot.classList.add('dot');
    dotParent.appendChild(dot);
}

for (let i = 0; i < 11; i++) {
    const row = document.createElement('div');
    row.classList.add('row');
    row.style.top = `calc( ${i * 55}px)`
    game.appendChild(row);
    let row1 = [];

    for (let j = 0; j < 15; j++) {
        const line = document.createElement('div');
        line.classList.add('line');
        row.appendChild(line);
        row1.push(false);
    }
    rowClicked.push(row1);
    rowArr.push(row);
}

for (let i = 0; i < 16; i++) {
    const col = document.createElement('div');
    col.classList.add('col');
    col.style.left = `calc(${i * 55}px)`
    game.appendChild(col);
    let col1 = [];

    for (let j = 0; j < 10; j++) {
        const line = document.createElement('div');
        line.classList.add('line');
        col.appendChild(line);
        col1.push(false);
    }
    colClicked.push(col1);
    colArr.push(col);
}


const lines = document.querySelectorAll('.line');
const sound = document.querySelector('audio');

lines.forEach(line => {
    line.addEventListener('click', () => {
        if (!line.classList.contains('active')) {
            line.classList.add('active');
            if (!checkForBox(line, line.parentNode)) {
                changeTurn();
            } else {
                sound.play();
            }
        }
    })
})

function checkForBox(line, parent) {
    let lineNo = Array.from(parent.children).indexOf(line);
    let color = line.classList.contains('blue') ? "blue" : "red";

    if (parent.classList.contains('row')) {
        let rowNo = Array.from(parent.parentNode.children).indexOf(parent) - 1;
        rowClicked[rowNo][lineNo] = true;
        let boxesMade = checkCompletionRow(rowNo, lineNo);
        if (boxesMade) {
            if (color == "red") {
                document.querySelector('.player1-score').innerHTML = Number(document.querySelector('.player1-score').innerHTML) + boxesMade;
            } else {
                document.querySelector('.player2-score').innerHTML = Number(document.querySelector('.player2-score').innerHTML) + boxesMade;
            }
            return true;
        }
    } else {
        let colNo = Array.from(parent.parentNode.children).indexOf(parent) - 11 - 1;
        colClicked[colNo][lineNo] = true;
        let boxesMade = checkCompletionCol(colNo, lineNo);
        if (boxesMade) {
            if (color == "red") {
                document.querySelector('.player1-score').innerHTML = Number(document.querySelector('.player1-score').innerHTML) + boxesMade;
            } else {
                document.querySelector('.player2-score').innerHTML = Number(document.querySelector('.player2-score').innerHTML) + boxesMade;
            }
            return true;
        }

    }
}

function checkCompletionCol(colNo, lineNo) {
    let count = 0;
    if (colNo < 15 && colClicked[colNo + 1][lineNo] && rowClicked[lineNo + 1][colNo] && rowClicked[lineNo][colNo]) {
        const IstClassList = colArr[colNo + 1].children[lineNo].classList.value;
        const secondClassList = rowArr[lineNo + 1].children[colNo].classList.value;
        const thirdClassList = rowArr[lineNo].children[colNo].classList.value;
        const currClassList = colArr[colNo].children[lineNo].classList.value;

        if (IstClassList == secondClassList && secondClassList == thirdClassList && thirdClassList == currClassList) {
            count++;

        }
    }

    if (colNo > 0 && colClicked[colNo - 1][lineNo] && rowClicked[lineNo + 1][colNo - 1] && rowClicked[lineNo][colNo - 1]) {
        const IstClassList = colArr[colNo - 1].children[lineNo].classList.value;
        const secondClassList = rowArr[lineNo + 1].children[colNo - 1].classList.value;
        const thirdClassList = rowArr[lineNo].children[colNo - 1].classList.value;
        const currClassList = colArr[colNo].children[lineNo].classList.value;


        if (IstClassList == secondClassList && secondClassList == thirdClassList && thirdClassList == currClassList) {
            count++;
        }
    }

    return count;
}

function checkCompletionRow(rowNo, lineNo) {
    let count = 0;
    if (rowNo < 10 && rowClicked[rowNo + 1][lineNo] && colClicked[lineNo + 1][rowNo] && colClicked[lineNo][rowNo]) {
        const IstClassList = rowArr[rowNo + 1].children[lineNo].classList.value;
        const secondClassList = colArr[lineNo + 1].children[rowNo].classList.value;
        const thirdClassList = colArr[lineNo].children[rowNo].classList.value;
        const currClassList = rowArr[rowNo].children[lineNo].classList.value;

        if (IstClassList == secondClassList && secondClassList == thirdClassList && thirdClassList == currClassList) {
            count++;
        }

    }

    if (rowNo > 0 && rowClicked[rowNo - 1][lineNo] && colClicked[lineNo + 1][rowNo - 1] && colClicked[lineNo][rowNo - 1]) {

        const IstClassList = rowArr[rowNo - 1].children[lineNo].classList.value;
        const secondClassList = colArr[lineNo + 1].children[rowNo - 1].classList.value;
        const thirdClassList = colArr[lineNo].children[rowNo - 1].classList.value;
        const currClassList = rowArr[rowNo].children[lineNo].classList.value;


        if (IstClassList == secondClassList && secondClassList == thirdClassList && thirdClassList == currClassList) {
            count++;
        }

    }

    return count;
}

function changeTurn() {
    lines.forEach(line => {
        if (!line.classList.contains('active'))
            line.classList.toggle('blue');
    })

    document.querySelectorAll('.game-info-item').forEach(item => {
        item.classList.toggle('active');
    })

    const turn = document.querySelector('.game-turn');

    if (turn.innerHTML.includes('1')) {
        turn.innerHTML = "Player 2 Turn";
    } else {
        turn.innerHTML = "Player 1 Turn";
    }
}




