let c = document.getElementById('myCanvas');
let ctx = c.getContext('2d');
c.addEventListener('click', click); //When a player clicks on the field of the game (canvas), the click is evaluated with click(e) function.  
let bn1 = document.getElementById('buttonStart');
bn1.addEventListener('click', startGame); //When the button "Start" is clicked, the function startGame() is called and so the process begins.
let level = document.getElementById('level');
let score = document.getElementById('score');
let table = document.getElementById('scoreboard');
let username;
let s = 0;
let users = new Array();
let timerID;
let count = 0;
let posX, posY;
let moleNum;
let rowCount = 0;

//The function is called when the button "Start" is clicked.
function startGame() {
    count = 0;
    level.innerHTML = 1;
    s = 0;
    score.innerHTML = s;
    username = prompt('Enter your username:');
    while (username=='') {
        username = prompt('Username can\'t be empty!\nEnter your username:');
    }
    if (username == null) {
        return;
    }
    
    alert('Level 1');
    clearInterval(timerID);
    timerID = null;
    timerID = setInterval(()=>appear(2,1000,1), 2000);  //The moles on level 1 will appear with the interval of 2 seconds. 
}

function appear(mCount, showTime, level) {  
    count++;
    if (count <= mCount) { //8 moles will appear on level 1.
        let rand = Number(Math.random()); //The place where a mole appears will be unpredictably chosen between 5 locations based on a generated random number. 
        //5 possible locations where a mole is drawn.
        if (rand >= 0.8) {
            moleNum = 1;
            createMole(100,300);
        } else if (rand < 0.8 && rand >= 0.6) {
            moleNum = 2;
            createMole(200,200);
        } else if (rand < 0.6 && rand >= 0.4) {
            moleNum = 3;
            createMole(300,250);
        } else if (rand < 0.4 && rand >= 0.2) {
            moleNum = 4;
            createMole(400,230);    
        } else {
            moleNum = 5;
            createMole(500,280);
        }      
        setTimeout(function () {
        ctx.clearRect(0, 0, 600, 400);
        moleNum = 0;
        }, showTime);
    //After all 8 moles are drawn, going to the next level.
    } else {
        count = 0;
        clearInterval(timerID);
        timerID = null;
        if (level == 1) {
            alert('Level 2');
            level2();
        } else if (level == 2) {
            alert('Level 3');
            level3();
        } else if (level == 3) {
            alert('Game over!');
            end();
        }
    }
}

function createMole(x,y) {
    ctx.clearRect(0, 0, 600, 400);
    let mole = new Image();
    mole.src = 'design/mole.jpg';
    posX = x;
    posY = y;
    mole.addEventListener('load', function () {
        ctx.drawImage(mole, x, y, 76, 57);
    });
}

function level2() {
    level.innerHTML = 2;
    if (timerID == null) {
        timerID = setInterval(()=>appear(2,800,2), 1400); //The moles on level 2 will appear with the interval of 1.4 second. 
    }
}

function level3() {
    level.innerHTML = 3;
    if (timerID == null) {
        timerID = setInterval(()=>appear(2,600,3), 1000); //The moles on level 2 will appear with the interval of 1 second. 
    }
}

function end() {
    //The username entered in the beggining of the game is compared with those in the table (scoreboard).
    let exists = false;
    let i=0;
    while (!exists && i < users.length) {
        if (username == users[i][0]) {
            exists = true;
            if (s > users[i][1]) {
                users[i][1] = s;
            }
            i=users.length;
        } else {
            i++;
        }
    }
    if (!exists) {
        users.push([username,s]);
    }
    sortArray();
    sortTable();
}

//sorting the scores of the players

function sortArray() {
    for (let i=users.length-1; i>0; i--) {
        let min = i;
        for (let j=i-1; j>=0; j--) {
            if (users[j][1] < users[min][1]) {
                let higher1 = users[min][1]; 
                let higher0 = users[min][0];
                users[min][1] = users[j][1];
                users[min][0] = users[j][0];
                users[j][1] = higher1;
                users[j][0] = higher0;
                min = j;
            }
        }
    }
}

function sortTable() {
    let r=1;
    while (r <= rowCount) {
        table.deleteRow(-1);
        r++;
    }
    rowCount=0;
    for (let l=0; l < users.length; l++) {
        rowCount++;
        let newRow = table.insertRow(rowCount);
        let cellName = newRow.insertCell(0);
        let cellScore = newRow.insertCell(1);
        cellName.innerHTML = users[l][0];
        cellScore.innerHTML = users[l][1];   
    }
}

//The function is called when the game field (canvas) is clicked. 
function click(e) {
    let clickX = e.offsetX;
    let clickY = e.offsetY;
    //The location of the click is compared with the location of the mole that is on the screen at the moment. If they match, 1 score is added.
    if (((moleNum == 1 && clickX <= (posX+76) && clickX >= posX && clickY <= (posY+57) && clickY >= posY)) || (moleNum == 2 && clickX <= (posX+76) && clickX >= posX && clickY <= (posY+57) && clickY >= posY) || 
    moleNum == 3 && (clickX <= (posX+76) && clickX >= posX && clickY <= (posY+57) && clickY >= posY) || (moleNum == 4 && clickX <= (posX+76) && clickX >= posX 
    && clickY <= (posY+57) && clickY >= posY) || (moleNum == 5 && clickX <= (posX+76) && clickX >= posX && clickY <= (posY+57) && clickY >= posY)) {
        moleNum = 0;
        s += 1;
        score.innerHTML = s;
    }
}
