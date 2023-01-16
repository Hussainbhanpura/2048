var board;
var score = 0;
var rows = 4;
var columns = 4;

var game = document.getElementById("game");
game.addEventListener('click', gameStart);

function gameStart() {
    setGame();
}


function setGame() {
    board = [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
    ]
    game.innerHTML = "Running...";
    game.removeEventListener('click', gameStart);
    document.getElementById("text").innerText = "Start Game";
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {
            let tile = document.createElement("div");
            tile.id = r.toString() + "-" + c.toString();
            let num = board[r][c];
            updateTile(tile, num);
            document.getElementById("board").append(tile);
        }
    }
    setTwo();
    setTwo();
}

function gameRestart() {
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {
            let tile = document.getElementById(r.toString() + "-" + c.toString());
            updateTile(tile, 0);
            document.getElementById("board").removeChild(tile);
        }
    }
    document.addEventListener('keyup', control);
    setGame();
}

function updateTile(tile, num) {
    tile.innerText = "";
    tile.classList.value = "";
    tile.classList.add("tile");
    if (num > 0) {
        tile.innerText = num;
        if (num <= 4096) {
            tile.classList.add("x" + num.toString());
        }
        else {
            tile.classList.add("x8192");
        }
    }
}

function control(e) {
    if (!hasZero()) {
        return gameOver();
    }
    if (e.keyCode == 37) {
        slideLeft();
        setTwo();
    }
    else if (e.keyCode == 39) {
        slideRight();
        setTwo();
    }
    else if (e.keyCode == 38) {
        slideUp();
        setTwo();
    }
    else if (e.keyCode == 40) {
        slideDown();
        setTwo();
    }
    document.getElementById("score").innerText = score
}

document.addEventListener('keyup', control);

function hasZero() {
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {
            if (board[r][c] == 0) {
                return true;
            }
        }
    }
    return false;
}

function gameOver() {
    document.getElementById("text").innerText = "You Lose!"
    document.getElementById("score").innerText = "0";
    score = 0;
    document.removeEventListener("keyup", control)
    game.innerText = "Restart";
    game.addEventListener('click', gameRestart);
}
function setTwo() {
    let found = false;
    while (!found) {
        let r = Math.floor(Math.random() * rows);
        let c = Math.floor(Math.random() * columns);

        if (board[r][c] == 0) {
            board[r][c] = 2;
            let tile = document.getElementById(r.toString() + "-" + c.toString());
            tile.classList.add("x2");
            tile.innerText = "2";
            found = true;
        }
    }
}

function filterZero(row) {
    return row.filter(num => num != 0);
}

function slide(row) {
    //[2,2,2,0]
    row = filterZero(row);

    for (let i = 0; i < row.length - 1; i++) {
        if (row[i] == row[i + 1]) {
            row[i] *= 2;
            row[i + 1] = 0;
            score = score + row[i];
        }
    }
    row = filterZero(row);
    //add zeroes

    while (row.length < columns) {
        row.push(0);
    }
    return row;
}

function slideDown() {
    for (let c = 0; c < columns; c++) {
        let row = [board[0][c], board[1][c], board[2][c], board[3][c]];
        row.reverse();
        row = slide(row);
        row.reverse();
        board[0][c] = row[0];
        board[1][c] = row[1];
        board[2][c] = row[2];
        board[3][c] = row[3];
        for (let r = 0; r < rows; r++) {
            let tile = document.getElementById(r.toString() + "-" + c.toString());
            let num = board[r][c];
            updateTile(tile, num)
        }
    }
}

function slideUp() {
    for (let c = 0; c < columns; c++) {
        let row = [board[0][c], board[1][c], board[2][c], board[3][c]];
        row = slide(row);
        board[0][c] = row[0];
        board[1][c] = row[1];
        board[2][c] = row[2];
        board[3][c] = row[3];
        for (let r = 0; r < rows; r++) {
            let tile = document.getElementById(r.toString() + "-" + c.toString());
            let num = board[r][c];
            updateTile(tile, num)
        }
    }
}

function slideRight() {
    for (let r = 0; r < rows; r++) {
        let row = board[r];
        row.reverse();
        row = slide(row);
        row.reverse();
        board[r] = row;

        for (let c = 0; c < columns; c++) {
            let tile = document.getElementById(r.toString() + "-" + c.toString());
            let num = board[r][c];
            updateTile(tile, num)
        }
    }
}

function slideLeft() {
    for (let r = 0; r < rows; r++) {
        let row = board[r];
        row = slide(row);
        board[r] = row;

        for (let c = 0; c < columns; c++) {
            let tile = document.getElementById(r.toString() + "-" + c.toString());
            let num = board[r][c];
            updateTile(tile, num)
        }
    }
}