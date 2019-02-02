let fieldWidth = 3;
let field = '';
let row = '';
const cross = 'cross';
const circle = 'circle';
let playerSymbol = circle;
let winLineLength = 3;
let playerStep = true;
const fieldProection = [];
const score = {
    circle: 0,
    cross: 0
}
//**********************************************************************************************************************
let playerStepSound = new Audio();
playerStepSound.preload = 'auto';
playerStepSound.src = './sound/step.mp3';
let winSound = new Audio();
winSound.preload = 'auto';
winSound.src = './sound/win.mp3';
let loseSound = new Audio();
loseSound.preload = 'auto';
loseSound.src = './sound/lose.mp3';
//**********************************************************************************************************************

//Adding click event on box
const clickHandler = function (event) {
    if (playerStep) {
        playerStep = false;
        if (event.target.innerHTML === '') {
            event.target.innerHTML = (playerSymbol === cross) ? '<img class="image" src="./images/cross.png" alt="">' : '<img class="image" src="./images/circle.png" alt="">';
            window.onresize.call();
            event.target.removeEventListener('click', clickHandler);
            event.target.setAttribute('Identify', 'true');
            let elements = document.getElementsByClassName('box');
            for (let i = 0; i < elements.length; i++)
                if (elements[i].hasAttribute('Identify')) {
                    fieldProection[((i - i % fieldWidth) / fieldWidth)][i % fieldWidth] = playerSymbol;
                    elements[i].removeAttribute('Identify');
                    break;
                }
        }
        playerStepSound.play();
        if(checkWinner()) {
            playerStep = true;
            return;
        }
        ChoseBoxAfterTime();
    }

};
window.onresize = () => {
    let height = ((document.documentElement.clientHeight - 150) / fieldWidth) / 1 + "px";
    Array.prototype.forEach.call(document.getElementsByClassName('box'), (elem) => {
        elem.style.width = height;
        elem.style.height = height;
    });

    if (document.documentElement.clientHeight > document.documentElement.clientWidth - 150) {
        document.getElementById('navigation').classList.add('panel-down');
    } else document.getElementById('navigation').classList.remove('panel-down');
    
};
//Creating of field View
function createFieldView() {
    for (let j = 0; j < fieldWidth; j++)
        row += '<div class="box"></div>'
    for (let i = 0; i < fieldWidth; i++)
        field += '<div class="row">' + row + '</div><br/>'
    document.getElementById('root').innerHTML += '<div id="field">' + field + '</div>';
    Array.prototype.forEach.call(document.getElementsByClassName('box'), (elem) => elem.addEventListener('click', clickHandler));
    window.onresize.call();
    row = '';
    field = '';
};
//Updating field
window.onload = function () {
    window.onresize.call();
};


//**********************************************************************************************************************



let initField = () => {
    for (let i = 0; i < fieldWidth; i++) fieldProection[i] = [];
    for (let i = 0; i < fieldProection.length; i++)
        for (let j = 0; j < fieldProection.length; j++)
            fieldProection[i][j] = 0;
};

function calcCost(arr, x, y, max) {
    let resArr = [0, 0, 0, 0, 0, 0, 0, 0];
    let pointArr = [0, 0, 0, 0, 0, 0, 0, 0];
    for (let i = 1; i < max; i++) {
        //0
        if (y - i >= 0 && x - i >= 0 && typeof (arr[y - i][x - i]) === 'string') {
            if ((arr[y - i][x - i]) === cross && ((pointArr[0] + '') === cross || pointArr[0] === 0) && pointArr[0] !== circle) {
                pointArr[0] = cross;
                resArr[0]++;
            } else if ((arr[y - i][x - i]) === circle && ((pointArr[0] + '') === circle || pointArr[0] === 0) && pointArr[0] !== cross) {
                {
                    pointArr[0] = circle;
                    resArr[0]++;
                }
            }
        }
        //1
        if (x - i >= 0 && typeof (arr[y][x - i]) === 'string') {
            if ((arr[y][x - i]) === cross && ((pointArr[1] + '') === cross || pointArr[1] === 0) && pointArr[1] !== circle) {
                pointArr[1] = cross;
                resArr[1]++;
            } else if ((arr[y][x - i]) === circle && ((pointArr[1] + '') === circle || pointArr[1] === 0) && pointArr[1] !== cross) {
                {
                    pointArr[1] = circle;
                    resArr[1]++;
                }
            }
        }
        //2
        if (y + i < fieldWidth && x - i >= 0 && typeof (arr[y + i][x - i]) === 'string') {
            if ((arr[y + i][x - i]) === cross && ((pointArr[2] + '') === cross || pointArr[2] === 0) && pointArr[2] !== circle) {
                pointArr[2] = cross;
                resArr[2]++;
            } else if ((arr[y + i][x - i]) === circle && ((pointArr[2] + '') === circle || pointArr[2] === 0) && pointArr[2] !== cross) {
                {
                    pointArr[2] = circle;
                    resArr[2]++;
                }
            }
        }
        //3
        if (y - i >= 0 && typeof (arr[y - i][x]) === 'string') {
            if ((arr[y - i][x]) === cross && ((pointArr[3] + '') === cross || pointArr[3] === 0) && pointArr[3] !== circle) {
                pointArr[3] = cross;
                resArr[3]++;
            } else if ((arr[y - i][x]) === circle && ((pointArr[3] + '') === circle || pointArr[3] === 0) && pointArr[3] !== cross) {
                {
                    pointArr[3] = circle;
                    resArr[3]++;
                }
            }
        }
        //4
        if (y + i < fieldWidth && typeof (arr[y + i][x]) === 'string') {
            if ((arr[y + i][x]) === cross && ((pointArr[4] + '') === cross || pointArr[4] === 0) && pointArr[4] !== circle) {
                pointArr[4] = cross;
                resArr[4]++;
            } else if ((arr[y + i][x]) === circle && ((pointArr[4] + '') === circle || pointArr[4] === 0) && pointArr[4] !== cross) {
                {
                    pointArr[4] = circle;
                    resArr[4]++;
                }
            }
        }
        //5
        if (y - i >= 0 && x + i < fieldWidth && typeof (arr[y - i][x + i]) === 'string') {
            if ((arr[y - i][x + i]) === cross && ((pointArr[5] + '') === cross || pointArr[5] === 0) && pointArr[5] !== circle) {
                pointArr[5] = cross;
                resArr[5]++;
            } else if ((arr[y - i][x + i]) === circle && ((pointArr[5] + '') === circle || pointArr[5] === 0) && pointArr[6] !== cross) {
                {
                    pointArr[5] = circle;
                    resArr[5]++;
                }
            }
        }
        //6
        if (x + i < fieldWidth && typeof (arr[y][x + i]) === 'string') {
            if ((arr[y][x + i]) === cross && ((pointArr[6] + '') === cross || pointArr[6] === 0) && pointArr[6] !== circle) {
                pointArr[6] = cross;
                resArr[6]++;
            } else if ((arr[y][x + i]) === circle && ((pointArr[6] + '') === circle || pointArr[6] === 0) && pointArr[6] !== cross) {
                {
                    pointArr[6] = circle;
                    resArr[6]++;
                }
            }
        }
        //7
        if (y + i < fieldWidth && x + i < fieldWidth && typeof (arr[y + i][x + i]) === 'string') {
            if ((arr[y + i][x + i]) === cross && ((pointArr[7] + '') === cross || pointArr[7] === 0) && pointArr[7] !== circle) {
                pointArr[7] = cross;
                resArr[7]++;
            } else if ((arr[y + i][x + i]) === circle && ((pointArr[7] + '') === circle || pointArr[7] === 0) && pointArr[7] !== cross) {
                {
                    pointArr[7] = circle;
                    resArr[7]++;
                }
            }
        }

        if ((y - i >= 0 && x - i >= 0 && typeof (arr[y - i][x - i]) === 'string') &&
            (y + i < fieldWidth && x + i < fieldWidth && typeof (arr[y + i][x + i]) === 'string') &&
            arr[y - i][x - i] === arr[y + i][x + i]) {
            resArr[0]++;
            resArr[7]++;
        }        if ((y - i >= 0 && typeof (arr[y - i][x]) === 'string') &&
            (y + i < fieldWidth && typeof (arr[y + i][x]) === 'string') &&
            arr[y - i][x] === arr[y + i][x]) {
            resArr[3]++;
            resArr[4]++;
        }        if ((y - i >= 0 && x + i < fieldWidth && typeof (arr[y - i][x + i]) === 'string') &&
            (y + i < fieldWidth && x - i >= 0 && typeof (arr[y + i][x - i]) === 'string') &&
            arr[y - i][x + i] === arr[y + i][x - i]) {
            resArr[5]++;
            resArr[2]++;
        }        if ((x - i >= 0 && typeof (arr[y][x - i]) === 'string') &&
            (x + i <= fieldWidth && typeof (arr[y][x + i]) === 'string') &&
            arr[y][x - i] === arr[y][x + i]) {
            resArr[1]++;
            resArr[6]++;
        }
    }
    let indexOfMax = 0;
    for (let i = 1; i < 8; i++) {
        if (resArr[i] > resArr[indexOfMax]) {
            indexOfMax = i;
        } else if (resArr[i] == resArr[indexOfMax]) {
            if (pointArr[i] !== playerSymbol) indexOfMax = i;
        }
    }

    if (pointArr[indexOfMax] !==  playerSymbol ) return (resArr[indexOfMax] += 0.1);
    return resArr[indexOfMax];
}

//**********************************************************************************************************************

function choseBox() {
    let result = {
        x: 0,
        y: 0,
        res: 0
    };
    for (let x = 0; x < fieldWidth; x++)
        for (let y = 0; y < fieldWidth; y++) {
            if (typeof (fieldProection[x][y]) === 'number') {
                fieldProection[x][y] = calcCost(fieldProection, y, x, winLineLength);
                if (fieldProection[x][y] > result.res) {
                    result.res = fieldProection[x][y];
                    result.x = y;
                    result.y = x;
                }
            }
        }
    setBlock(result.x, result.y);
    fieldProection[result.y][result.x] = (playerSymbol === cross) ? 'circle' : 'cross';
    playerStep = true;
    return result;
};

function ChoseBoxAfterTime() {
    setTimeout(choseBox, 1500);
    setTimeout(checkWinner, 2500);
}

function setBlock(x, y) {
    if (typeof (fieldProection[y][x]) !== 'string')
    document.getElementsByClassName('box')[x + y * fieldWidth]
        .innerHTML = (playerSymbol === cross) ? '<img class="image" src="./images/circle.png" alt="">' : '<img class="image" src="./images/cross.png" alt="">';
    document.getElementsByClassName('box')[x + y * fieldWidth].removeEventListener('click', clickHandler);
    window.onresize.call();
    playerStepSound.play();
}

//**********************************************************************************************************************
function checkWinner() {
    let buf = 0;
    let last = 0;
    let draw = true;
    //Draw checking
    for (let i =0; i < fieldWidth; i++)
    for (let j =0; j < fieldWidth; j++) {
        if (typeof (fieldProection[i][j]) === 'number') draw = false;
    }
    if (draw) {
        if (confirm("Game ended without a winner!\nDo you want to play again?"))
            restartGame();
        else closeGame();
            return true;
    }
    //horizontal and vertical
    for (let i = 0; i < fieldWidth; i++) {
        buf = 0;
        last = 0;
        for (let j = 0; j < fieldWidth; j++) {
            if (fieldProection[i][j] !== last) {
                last = fieldProection[i][j];
                if (last === circle || last === cross) buf = 1;
                else buf = 0;
            } else {
                if (last === circle || last === cross) buf++;
                if (buf >= winLineLength) {
                    playerWin(last);
                    return true;
                }
            }
        }
    }
    for (let i = 0; i < fieldWidth; i++) {
        buf = 0;
        last = 0;
        for (let j = 0; j < fieldWidth; j++) {
            if (fieldProection[j][i] !== last) {
                last = fieldProection[j][i];
                if (last === circle || last === cross) buf = 1;
                else buf = 0;
            } else {
                if (last === circle || last === cross) buf++;
                if (buf >= winLineLength) {
                    playerWin(last);
                    return true;
                }
            }
        }
    }
//    Diagonals
    for (let x = 0; x < winLineLength; x++) {
        buf = 0;
        last = 0;
        for (let i = 0; i < fieldWidth - x; i++) {
            if (fieldProection[x + i][i] !== last) {
                last = fieldProection[x + i][i];
                if (last === circle || last === cross) buf = 1;
                else buf = 0;
            } else {
                if (last === circle || last === cross) buf++;
                if (buf >= winLineLength) {
                    playerWin(last);
                    return true;
                }
            }
        }
    }
    for (let x = 0; x < winLineLength; x++) {
        buf = 0;
        last = 0;

        for (let i = 0; i < fieldWidth - x; i++) {
            if (fieldProection[i][x + i] !== last) {
                last = fieldProection[i][x + i];
                if (last === circle || last === cross) buf = 1;
                else buf = 0;
            } else {
                if (last === circle || last === cross) buf++;
                if (buf >= winLineLength) {
                    playerWin(last);
                    return true;
                }
            }
        }
    }

    for (let x = 0; x < fieldWidth; x++) {
        buf = 0;
        last = 0;
        for (let i = 0; i < fieldWidth - x; i++) {
            if (fieldProection[fieldWidth - 1 - i - x][i] !== last) {
                last = fieldProection[fieldWidth - 1 - i - x][i];
                if (last === circle || last === cross) buf = 1;
                else buf = 0;
            } else {
                if (last === circle || last === cross) buf++;
                if (buf >= winLineLength) {
                    playerWin(last);
                    return true;
                }
            }
        }
    }
    for (let x = 0; x < fieldWidth; x++) {
        buf = 0;
        last = 0;
        for (let i = fieldWidth - 1; i > 0; i--) {
            if (fieldProection[i][fieldWidth - 1 - i + x] !== last) {
                last = fieldProection[i][fieldWidth - 1 - i + x];
                if (last === circle || last === cross) buf = 1;
                else buf = 0;
            } else {
                if (last === circle || last === cross) buf++;
                if (buf >= winLineLength) {
                    playerWin(last);
                    return true;
                }
            }
        }
    }
    return false;
}
//**********************************************************************************************************************
function closeGame() {
    document.getElementById('field').remove();
    document.getElementById('menu').classList.remove('hidden');
    document.getElementById('navigation').classList.add('hidden');
    initSymbChangeBtn();
    initSymbChangeBtn();
}
//**********************************************************************************************************************
function restartGame() {
    playerStep = true;
    document.getElementById('field').remove();
    initField();
    createFieldView();
}
//**********************************************************************************************************************
function playerWin(winner) {
    if(winner === playerSymbol) winSound.play();
    else loseSound.play();
    if (confirm('Player ' + winner + ' win!\nDo you want to play again?')) {
        restartGame();
        if (winner === cross) score.cross++;
        else score.circle++;
        document.getElementById('score').innerHTML = '<b>'+ score.cross +'</b> : <b>'+ score.circle +'</b>';
    }
    else closeGame();
}
