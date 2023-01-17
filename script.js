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
                sound.pause();
                sound.play();
            }

            if (isOver()) {
                showResult();
            }
        }
    })
})

function checkForBox(line, parent) {
    let lineNo = Array.from(parent.children).indexOf(line);
    let color = document.querySelector('.game-turn').innerHTML.includes('1') ? "red" : "blue";

    if (parent.classList.contains('row')) {
        let rowNo = Array.from(parent.parentNode.children).indexOf(parent) - 1;
        rowClicked[rowNo][lineNo] = true;
        let count = checkCompletionRow(rowNo, lineNo, color);
        if (count) {
            if (color == "red") {
                document.querySelector('.player1-score').innerHTML = Number(document.querySelector('.player1-score').innerHTML) + count;
            } else {
                document.querySelector('.player2-score').innerHTML = Number(document.querySelector('.player2-score').innerHTML) + count;

            }
            return true;
        }
    } else {
        let colNo = Array.from(parent.parentNode.children).indexOf(parent) - 11 - 1;
        colClicked[colNo][lineNo] = true;
        let count = checkCompletionCol(colNo, lineNo, color);
        if (count) {
            if (color == "red") {
                document.querySelector('.player1-score').innerHTML = Number(document.querySelector('.player1-score').innerHTML) + count;
            } else {
                document.querySelector('.player2-score').innerHTML = Number(document.querySelector('.player2-score').innerHTML) + count;
            }
            return true;
        }

    }
}

function checkCompletionCol(colNo, lineNo, color) {
    let count = 0;
    if (colNo < 15 && colClicked[colNo + 1][lineNo] && rowClicked[lineNo + 1][colNo] && rowClicked[lineNo][colNo]) {
        nameBox(color, lineNo * 55, colNo * 55 + 20);
        count++;
    }
    if (colNo > 0 && colClicked[colNo - 1][lineNo] && rowClicked[lineNo + 1][colNo - 1] && rowClicked[lineNo][colNo - 1]) {
        nameBox(color, lineNo * 55, colNo * 55 - 35);
        count++;
    }

    return count;


}

function checkCompletionRow(rowNo, lineNo, color) {
    let count = 0;

    if (rowNo < 10 && rowClicked[rowNo + 1][lineNo] && colClicked[lineNo + 1][rowNo] && colClicked[lineNo][rowNo]) {
        nameBox(color, rowNo * 55, lineNo * 55 + 20,);
        count++;
    }
    if (rowNo > 0 && rowClicked[rowNo - 1][lineNo] && colClicked[lineNo + 1][rowNo - 1] && colClicked[lineNo][rowNo - 1]) {
        nameBox(color, (rowNo - 1) * 55, lineNo * 55 + 20,);
        count++;
    }

    return count;

}

function changeTurn() {
    document.querySelectorAll('.game-info-item').forEach(item => {
        item.classList.toggle('active');
    })

    const turn = document.querySelector('.game-turn');
    turn.innerHTML = turn.innerHTML.includes('1') ? "Player 2 Turn" : "Player 1 Turn";
}

function nameBox(color, top, left) {
    const letter = document.createElement("div");
    letter.classList.add("letter");
    letter.innerHTML = color == "red" ? "1 " : "2";
    letter.classList.add(color)
    letter.style.top = `calc(${top}px)`
    letter.style.left = `calc(${left}px)`
    game.appendChild(letter);

}

function isOver() {
    for (let i = 0; i < lines.length; i++) {
        if (!lines[i].classList.contains('active')) {
            return false;
        }
    }


    return true;
}

function showResult() {
    const player1Score = document.querySelector('.player1-score').innerHTML;
    const player2Score = document.querySelector('.player2-score').innerHTML;
    const winner = player1Score > player2Score ? "Player 1" : "Player 2";

    document.querySelector('.winner').classList.add('active');
    document.querySelector('.winner-text').innerHTML = `${winner} wins with a score of ${Math.max(player1Score, player2Score)} : ${Math.min(player1Score, player2Score)}`
}




