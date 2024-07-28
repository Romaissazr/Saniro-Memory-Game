var errors = 0;
var cardList = [
    "Ciranamol",
    "Dogo",
    "Dogot",
    "Froge",
    "Lala",
    "HelloKitty",
    "Kuromi",
    "Maru",
    "MyMelo",
    "Kiki"
];
var cardSet;
var board = [];
var rows = 4;
var columns = 5;

var card1Selected;
var card2Selected;

window.onload = function () {
    shuffleCards();
    startGame();
    document.getElementById("resetButton").addEventListener("click", resetGame);
}

function shuffleCards() {
    // Duplicate the cardList using concat
    cardSet = cardList.concat(cardList);
    console.log(cardSet);
    for (let i = 0; i < cardSet.length; i++) {
        let j = Math.floor(Math.random() * cardSet.length);

        let temp = cardSet[i];
        cardSet[i] = cardSet[j];
        cardSet[j] = temp;
    }
    console.log(cardSet);
}

function startGame() {
    board = [];
    document.getElementById("board").innerHTML = ""; // Clear the board
    for (let r = 0; r < rows; r++) {
        let row = [];
        for (let c = 0; c < columns; c++) {
            let cardImg = cardSet.pop();
            row.push(cardImg);

            let card = document.createElement("img");
            card.id = r.toString() + "-" + c.toString();
            card.src = "./images/" + cardImg + ".jpg";
            card.classList.add("card");
            card.addEventListener("click", selectCard);
            document.getElementById("board").append(card);
        }
        board.push(row);
    }
    console.log(board);
    setTimeout(hideCard, 1500);
}

function hideCard() {
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {
            let card = document.getElementById(r.toString() + "-" + c.toString());
            card.src = "./images/PinkHeart.jpg";
        }
    }
}

function selectCard() {
    if (this.src.includes("PinkHeart.jpg")) {
        if (!card1Selected) {
            card1Selected = this;

            let coords = card1Selected.id.split("-");
            let r = parseInt(coords[0]);
            let c = parseInt(coords[1]);

            card1Selected.src = "./images/" + board[r][c] + ".jpg";

        } else if (!card2Selected && this !== card1Selected) {
            card2Selected = this;

            let coords = card2Selected.id.split("-");
            let r = parseInt(coords[0]);
            let c = parseInt(coords[1]);

            card2Selected.src = "./images/" + board[r][c] + ".jpg";
            setTimeout(update, 1000);
        }
    }
}

function update() {
    if (card1Selected.src != card2Selected.src) {
        card1Selected.src = "./images/PinkHeart.jpg";
        card2Selected.src = "./images/PinkHeart.jpg";
        errors += 1;
        document.getElementById("errors").innerHTML = errors;
    }
    card1Selected = null;
    card2Selected = null;
}

function resetGame() {
    errors = 0;
    document.getElementById("errors").innerHTML = errors;
    card1Selected = null;
    card2Selected = null;
    shuffleCards();
    startGame();
}
