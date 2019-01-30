let fieldWidth = 5;
let field = '';
let row = '';
let playerSymbol = 'cross';
let clickHandler = function (event) {
    if(event.target.innerHTML === ''){
        event.target.innerHTML = (playerSymbol==='cross')?'<span class="cross">&#x2716</span>':'<span class="circle">&#9711</span>';
    }
    window.onresize.call();
    event.target.removeEventListener('click',clickHandler);
};
// <span class="cross">&#x2716</span>
// <span class="circle">&#9711</span>

for (let j = 0; j < fieldWidth; j++) row += '<div class="box"></div>'
for (let i = 0; i < fieldWidth; i++) field += '<div class="row">' + row + '</div><br/>'
document.body.innerHTML += '<div>'+ field + '</div>';
Array.prototype.forEach.call(document.getElementsByClassName('box'), (elem) => elem.addEventListener('click',clickHandler));
window.onresize = () => {
    let height = ((document.documentElement.clientHeight - 50) / fieldWidth)/1  + "px";
    Array.prototype.forEach.call(document.getElementsByClassName('box'),(elem) => {
        elem.style.width = height;
        elem.style.height = height;
    });
    width = document.getElementsByClassName('box')[1].clientWidth*0.85;
    Array.prototype.forEach.call(document.getElementsByClassName('cross'), (elem) => elem.style.fontSize = width + 'px');
    Array.prototype.forEach.call(document.getElementsByClassName('circle'), (elem) => elem.style.fontSize = width*0.85 + 'px');
    document.getElementById('change').style.left = window.innerHeight + 'px';
};
window.onload = function () {
    window.onresize.call();
}

document.getElementById('change').addEventListener('click',() => {
    if (playerSymbol === 'cross') {
        playerSymbol = 'circle';
    }
    else playerSymbol = 'cross';
})
