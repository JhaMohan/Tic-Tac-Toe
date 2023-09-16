const boxes = document.querySelectorAll(".box");
const gameInfo = document.querySelector('.game-info');
const newgame = document.querySelector('.btn');


let currentPlayer;
let gameGrid;

const winningPositions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];


function initGame() {
    currentPlayer = "X";
    gameGrid = ["", "", "", "", "", "", "", "", ""];

    boxes.forEach((box) => {
        box.innerText = "";
        box.style.pointerEvents = "fill";
        box.classList.remove('win');

    })
    newgame.classList.remove('active');
    gameInfo.innerText = `Current Player - ${currentPlayer}`;
}

initGame();




boxes.forEach((box, index) => {
    box.addEventListener('click', () => {
        handleClick(index);
    });
});




function handleClick(index) {
    if (gameGrid[index] === "") {
        boxes[index].innerText = currentPlayer;
        gameGrid[index] = currentPlayer;
        boxes[index].style.pointerEvents = "none";
        swapTurn();
        checkGameOver();
    }
}


function swapTurn() {

    if (currentPlayer === "X") {
        currentPlayer = "O";
    } else {
        currentPlayer = "X";
    }
    gameInfo.innerText = `Current Player - ${currentPlayer}`;
}

function checkGameOver() {

    let answer = "";

    winningPositions.forEach((position) => {
        if ((gameGrid[position[0]] !== "" && gameGrid[position[1]] !== "" && gameGrid[position[2]] !== "") &&
            ((gameGrid[position[0]] === gameGrid[position[1]]) && (gameGrid[position[1]] === gameGrid[position[2]]))) {

            if (gameGrid[position[0]] === "X") {
                answer = "X";
            } else {
                answer = "O";
            }

            boxes.forEach((box) => {
                box.style.pointerEvents = "none";
            });
            boxes[position[0]].classList.add("win");
            boxes[position[1]].classList.add("win");
            boxes[position[2]].classList.add("win");
        }
    });

    if (answer !== "") {
        gameInfo.innerText = `${answer} - win the game`;
        newgame.classList.add('active');
        return;
    }

    let fillcount = 0;

    gameGrid.forEach((box) => {
        if (box !== "") {
            fillcount++;
        }
    })

    if (fillcount === 9) {
        gameInfo.innerText = `It's a draw`;
        newgame.classList.add('active');
        return;
    }

}


newgame.addEventListener('click', () => {
    initGame();
})