//initialize player symbol change buttons
function initSymbChangeBtn() {
    document.getElementsByClassName('menu-icon-box')[0].addEventListener('click',function (event) {
        if(!event.target.classList.contains('active')) {
            document.getElementsByClassName('menu-icon-box')[0].classList.toggle('active');
            document.getElementsByClassName('menu-icon-box')[1].classList.toggle('active');
            playerSymbol = circle;
        }
    });

    document.getElementsByClassName('menu-icon-box')[1].addEventListener('click',function (event) {
        if(!event.target.classList.contains('active')) {
            document.getElementsByClassName('menu-icon-box')[0].classList.toggle('active');
            document.getElementsByClassName('menu-icon-box')[1].classList.toggle('active');
            playerSymbol = cross;
        }
    });
}
initSymbChangeBtn();
//**********************************************************************************************************************
function startGame() {
    if(document.getElementsByClassName('menu-icon-box')[0].classList.contains('active'))
        playerSymbol = circle;
    else playerSymbol = cross;
    document.getElementById('navigation').classList.remove('hidden');
    document.getElementById('menu').classList.add('hidden');
    setFieldWidth();
    setWinLineLength();
    score.circle = 0;
    score.cross = 0;
    document.getElementById('score').innerHTML = '<b>'+ score.cross +'</b> : <b>'+ score.circle +'</b>';
    initField();
    createFieldView();
    if(playerSymbol === circle) {
        playerStep = false;
        setTimeout(choseBox,1000);
    }
};
//**********************************************************************************************************************
function setFieldWidth() {
    fieldWidth = document.getElementById('fieldWidth').value-0;
}

function setWinLineLength() {
    winLineLength = document.getElementById('winLineLength').value-0;
}
