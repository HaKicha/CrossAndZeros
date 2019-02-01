let fieldWidth = 4;
let field = '';
let row = '';
const cross = 'cross';
const circle = 'circle';
let playerSymbol = cross;
let winLineLength = 4;
let playerStep = true;

//Adding click event on box
const clickHandler = function (event) {
    if (playerStep) {
        playerStep = false;
        if (event.target.innerHTML === '') {
            event.target.innerHTML = (playerSymbol === cross) ? '<span class="cross">&#x2716</span>' : '<span class="circle">&#9711</span>';
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
        ;
        if(checkWinner()) return;
        ChoseBoxAfterTime();
    }

};

//Creating of field View
function createFieldView() {
    for (let j = 0; j < fieldWidth; j++) row += '<div class="box"></div>'
    for (let i = 0; i < fieldWidth; i++) field += '<div class="row">' + row + '</div><br/>'
    document.body.innerHTML += '<div>' + field + '</div>';
    Array.prototype.forEach.call(document.getElementsByClassName('box'), (elem) => elem.addEventListener('click', clickHandler));
    window.onresize = () => {
        let height = ((document.documentElement.clientHeight - 50) / fieldWidth) / 1 + "px";
        Array.prototype.forEach.call(document.getElementsByClassName('box'), (elem) => {
            elem.style.width = height;
            elem.style.height = height;
        });
        let width = document.getElementsByClassName('box')[1].clientWidth * 0.85;
        Array.prototype.forEach.call(document.getElementsByClassName('cross'), (elem) => elem.style.fontSize = width + 'px');
        Array.prototype.forEach.call(document.getElementsByClassName('circle'), (elem) => elem.style.fontSize = width * 0.85 + 'px');
        document.getElementById('change').style.left = window.innerHeight + 60 + 'px';
    };
};
//Updating field
window.onload = function () {
    window.onresize();
};


//**********************************************************************************************************************
const fieldProection = [];

let initField = (arr) => {
    for (let i = 0; i < fieldWidth; i++) arr[i] = [];
    for (let i = 0; i < arr.length; i++)
        for (let j = 0; j < arr.length; j++)
            arr[i][j] = 0;
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
    }
    let indexOfMax = 0;
    for (let i = 1; i < 8; i++) {
        if (resArr[i] > resArr[indexOfMax]) {
            indexOfMax = i;
        } else if (resArr[i] == resArr[indexOfMax]) {
            if (pointArr[i] !== playerSymbol) indexOfMax = i;
        }
    }
    if (pointArr[indexOfMax] ===  playerSymbol ) return (resArr[indexOfMax] += 0.1);
    return resArr[indexOfMax];
}

//**********************************************************************************************************************

createFieldView();
initField(fieldProection);

//Change symbol
document.getElementById('change').addEventListener('click', (event) => {
    if (playerSymbol === cross) {
        playerSymbol = circle;
        event.target.style.background = 'green';
    } else {
        playerSymbol = cross;
        event.target.style.background = 'red';
    }
});


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
    checkWinner();
    return result;
};

function ChoseBoxAfterTime() {
    setTimeout(choseBox, 1500);
}

function setBlock(x, y) {
    document.getElementsByClassName('box')[x + y * fieldWidth]
        .innerHTML = ((playerSymbol === cross) ?
        '<span class="circle">&#9711</span>'
        : '<span class="cross">&#x2716</span>');
    window.onresize.call();
}

//**********************************************************************************************************************
function checkWinner() {
    let buf = 0;
    let last = 0;
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
                    alert("Player " + last + " win!");
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
                    alert("Player " + last + " win!");
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
                    alert("Player " + last + " win!");
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
                    alert("Player " + last + " win!");
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
                    alert("Player " + last + " win!");
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
                    alert("Player " + last + " win!");
                    return true;
                }
            }
        }
    }
    return false;
}
//**********************************************************************************************************************