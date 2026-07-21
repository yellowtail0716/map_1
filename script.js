const board = document.getElementById("board");
const player = {
    x:3,
    y:3
}

function drawBoard(){
    for(let i = 0; i < 25; i++){
        const cell = document.createElement("div");
        cell.className = "cell";
        board.appendChild(cell);

        if(i == player.y * 5 - player.x){
            cell.textContent = "😀";
        }

    }
}
drawBoard();

document.addEventListener("keydown", function(event){
if(event.key == "ArrowRight"){
    player.x--;
}
if(event.key == "ArrowLeft"){
    player.x++;
}
if(event.key == "ArrowUp"){
    player.y--;
}
if(event.key == "ArrowDown"){
    player.y++;
}
board.innerHTML = "";
drawBoard();
});


