const info = document.querySelector(".Game-info");
const boxes = document.querySelectorAll(".box");
const newBtn = document.querySelector(".NewGame");

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
    [2, 4, 6],
];
initGame();


// check game over

function checkGameOver() {
    let answer = "";
    winningPositions.forEach((position) => {
        if ((gameGrid[position[0]] !== "" || gameGrid[position[1]] !== "" || gameGrid[position[2]] !== "")
            && (gameGrid[position[0]] === gameGrid[position[1]]) && (gameGrid[position[1]] === gameGrid[position[2]])) {

            // we know now wheather x/0 is winner
            if (gameGrid[position[0]] === "X") {
                answer = "X";
            }
            else {
                answer = "0";
            }

            boxes.forEach((box) => {
                box.style.pointerEvents = "none";
            })

            boxes[position[0]].classList.add("win");
            boxes[position[1]].classList.add("win");

            boxes[position[2]].classList.add("win");


        }
    });

    // now we have answer 
    if (answer !== "") {
        info.innerText = `Winner is - ${answer}`;
        newBtn.classList.add("active");
        return;
    }
    let count = 0;
    gameGrid.forEach((box) => {
        if (box !== "") {
            count++;
        }
    })

    if (count === 9) {
        info.innerText = "Game Tied !";
        newBtn.classList.add("active");
    }
}

// init game function
function initGame() {
    currentPlayer = "X";

    gameGrid = ["", "", "", "", "", "", "", "", ""];
    boxes.forEach((box, index) => {
        box.innerText = "";
        boxes[index].style.pointerEvents = "all";
        box.classList = `box box${index + 1}`;

    })
    newBtn.classList.remove("active");

    info.innerText = `Current Player is -${currentPlayer}`;
}

// handleclick function
function handleClick(index) {
    if (gameGrid[index] === "") {
        boxes[index].innerText = `${currentPlayer}`;
        gameGrid[index] = currentPlayer;

        boxes[index].style.pointerEvents = "none";
        console.log("till done");
        Swapturn();
        checkGameOver();
    }
}

// writing the function for the swapTurn
// swap turn 
function Swapturn() {
    if (currentPlayer === "X") {
        currentPlayer = "0";
    }

    else {
        currentPlayer = "X";
    }
    info.innerText = `Current Player is -${currentPlayer}`;

}


boxes.forEach((box, index) => {
    box.addEventListener("click", () => {
        handleClick(index);
    })
})
newBtn.addEventListener("click", initGame);
