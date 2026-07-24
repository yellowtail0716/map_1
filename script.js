//定義-----------------------------------------------------------------------------------------------------------------------------------------------------------------
const board = document.getElementById("board");
const player = {
    x:3,
    y:3,
    maxHp:3,
    hp:maxHp
    
}
const enemy = {
    x:3,
    y:1,
    maxHp:2,
    hp:maxHp
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
//関数-----------------------------------------------------------------------------------------------------------------------------------------------------------------
//hpバーの更新
function drawHp(){
    const hpFill = document.getElementById("hpFill");
    hpFill.style.width = (player.hp / player.maxHp) * 100 + "%";
    const enemyHpFill = document.getElementById("enemyHpFill");
    enemyHpFill.style.width = (enemy.hp / enemy.maxHp) * 100 + "%";
}
//画面の更新
function drawBoard(){

    for(let y = 0; y < 7; y++){
        for(let x = 0; x < 7; x++){
            const cell = document.createElement("div");
            cell.className = "cell";
            board.appendChild(cell);
            if (map[y][x] == 1){
                cell.textContent = "🟫";
            }else if(player.x == x && player.y == y){
                cell.textContent = "😀";
            }else if(enemy.x == x && enemy.y == y){
                if(enemy.hp > 0)
                cell.textContent = "▲";
}}}}
drawHp();
drawBoard();
//プレイヤーの動き
function movePlayer(dx,dy){
    const nx = player.x + dx
    const ny = player.y + dy
    if (map[ny][nx] == 1) {
    return;}
    if (nx == enemy.x && ny == enemy.y){
        enemy.hp--;
        console.log(enemy.hp);
        if (enemy.hp <= 0) {
            spawnEnemy();
        }else{
            player.hp--;}
        drawBoard();
        drawHp();
        return;}
    player.x = nx;
    player.y = ny;
    moveEnemy();
}
//敵の動き
function moveEnemy(){
    const dir = Math.floor(Math.random() * 4);
    let dx = 0;
    let dy = 0;
    if (dir == 0){
        dx = 1
    }else if(dir == 1){
        dx = -1
    }else if(dir == 2){
        dy = -1
    }else if(dir == 3){
        dy = 1}
    const nx = enemy.x + dx;
    const ny = enemy.y + dy;
    if (map[ny][nx] == 1) {
    moveEnemy();
    return;}
    if (nx == player.x && ny == player.y){
        player.hp--;
        console.log(enemy.hp);
        return;}
    enemy.x = nx;
    enemy.y = ny;
}
function spawnEnemy(){
    const sx = Math.floor(Math.random() * 5)+1;
    const sy = Math.floor(Math.random() * 5)+1;
    if (map[sy][sx] == 1) {
    spawnEnemy();
    return;}
    if (sx == player.x && sy == player.y){
    spawnEnemy();
    return;}
    enemy.hp = 2
    enemy.x = sx;
    enemy.y = sy;
}
//-----------------------------------------------------------------------------------------------------------------------------------------------------------------
//プレイヤーの行動取得
document.addEventListener("keydown", function(event){
if(event.key == "ArrowRight"){
    movePlayer(1,0);
}
if(event.key == "ArrowLeft"){
    movePlayer(-1,0);
}
if(event.key == "ArrowUp"){
    movePlayer(0,-1);
}
if(event.key == "ArrowDown"){
    movePlayer(0,1);
}
board.innerHTML = "";
drawBoard();
drawHp();
});
