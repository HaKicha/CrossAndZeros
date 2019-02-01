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
document.getElementById('menu-button').addEventListener('click', function () {
    if(document.getElementsByClassName('menu-icon-box')[0].classList.contains('active'))
        playerSymbol = circle;
    else playerSymbol = cross;

    fieldWidth = document.getElementById('fieldWidth').value-0;
    winLineLength = document.getElementById('winLineLength').value-0;

    document.getElementById('menu').classList.add('hidden');
    initField();
    createFieldView();
});
//**********************************************************************************************************************
