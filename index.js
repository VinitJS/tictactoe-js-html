// DISPLAY
const refBoard = [
    [],[],[]
];

const order = []

let k = 0
for(let i=0; i<3; i++) {
    for(let j=0; j<3; j++) {
        refBoard[i][j] = document.getElementById(`tr${k++}`);
    }
}

// PLAYERS
let playerCount = 0;

class Player {
    constructor(name) {
        this.name = name
        this.count = {
            r0: 0,
            r1: 0,
            r2: 0,
            c0: 0,
            c1: 0,
            c2: 0,
            dt: 0,
            db: 0
        }
    }
}

function playerFactory(pName) {
    if(!pName) throw Error("name is required parameter.");
    if(playerCount > 1) throw Error("Too many players.");
    return new Player(pName);
}

const p1 = playerFactory("💩");
const p2 = playerFactory("👅");

let playerTurn = true; // false: p2, true: p1
let clickedCount = 0;

function mark(i, j) {
    if(document.getElementById('announce').innerText ||
    refBoard[i][j].innerText) return;

    if(i < 0 || i > 2 || j < 0 || j > 2) throw Error("Invalid Input");
    
    const player = playerTurn ? p1 : p2;

    refBoard[i][j].innerText = player.name;
    if(check(player, i, j)) document.getElementById('announce').innerText = `${player.name} won!`;
    
    playerTurn = !playerTurn;
    
    clickedCount++;
    if(clickedCount > 8) document.getElementById('announce').innerText = "It's a draw!"
}

function undo() {

    if(order.length < 1) return;

    clickedCount--;
    const [player, i, j] = order.pop();
    
    refBoard[i][j].innerText = null;
    
    player.count[`r${i}`]--;
    if(player.count[`r${i}`] === 3) return true;
    
    player.count[`c${j}`]--;
    if(player.count[`c${j}`] === 3) return true;
    
    if(i === j) player.count.dt--;
    if(player.count.dt === 3) return true;
    
    if(i+j === 2) player.count.db--;
    if(player.count.db === 3) return true;
    
    playerTurn = !playerTurn;
    document.getElementById('announce').innerText = null;
}

function check(player, i, j) {
    
    order.push([player, i, j]);

    player.count[`r${i}`]++;
    if(player.count[`r${i}`] === 3) return true;

    player.count[`c${j}`]++;
    if(player.count[`c${j}`] === 3) return true;

    if(i === j) player.count.dt++;
    if(player.count.dt === 3) return true;

    if(i+j === 2) player.count.db++;
    if(player.count.db === 3) return true;
    
    return false;
}
