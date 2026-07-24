const board = document.getElementById("board");
const player = {
    x:3,
    y:3
}
const map = [
    [1,1,1,1,1,1,1],
    [1,0,0,0,0,0,1],
    [1,0,0,0,0,0,1],
    [1,0,0,0,0,0,1],
    [1,0,0,0,0,0,1],
    [1,0,0,0,0,0,1],
    [1,1,1,1,1,1,1]   
]

function drawBoard(){

    for(let y = 0; y < 7; y++){
        for(let x = 0; x < 7; x++){
            const cell = document.createElement("div");
            cell.className = "cell";
            board.appendChild(cell);
            if (map[y][x] == 1)
                cell.textContent = "🟫";
            if(player.x == x && player.y == y){
                cell.textContent = "😀";
}}}}
drawBoard();

document.addEventListener("keydown", function(event){
if(event.key == "ArrowRight"){
    const nx = player.x+1;
    if (1 == map[player.y][nx]){
        pass
    }else{
        player.x++;
}}
if(event.key == "ArrowLeft"){
    const nx = player.x-1;
    if (1 == map[player.y][nx]){
        pass
    }else{
        player.x--;
}}
if(event.key == "ArrowUp"){
    const ny = player.y-1;
    if (1 == map[ny][player.x]){
        pass
    }else{
       player.y--; 
}}
if(event.key == "ArrowDown"){
    const ny = player.y+1;
    if (1 == map[ny][player.x]){
        pass
    }else{
        player.y++;
}}

board.innerHTML = "";
drawBoard();
});
