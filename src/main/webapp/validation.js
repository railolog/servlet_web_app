var form = document.querySelector('.formWithValidation')
var yVal = document.querySelector('.y')
var xVal = null
var rVal = null
var xBtns = document.querySelectorAll('.x')
var rBtns = document.querySelectorAll('.r')
var xError = document.querySelector('.error.x')
var yError = document.querySelector('.error.y')
var rError = document.querySelector('.error.r')
var table = document.querySelector('.results')
var divRes = document.querySelector('div#result')
var parser = new DOMParser();
var canvas_graph = document.querySelector('canvas#graph');
var y;


let xhr = new XMLHttpRequest()

function cumulativeOffset(element){
    var top = 0, left = 0;
    do {
        top += element.offsetTop  || 0;
        left += element.offsetLeft || 0;
        element = element.offsetParent;
    } while(element);

    return {
        top: top,
        left: left
    };
}

function draw_dec_lines(ctx, w, h){
    ctx.beginPath();
    ctx.moveTo(4, h/2);
    ctx.lineTo(w - 4, h/2);
    ctx.lineTo(w - 12, h/2 - 4)
    ctx.moveTo(w - 4, h/2)
    ctx.lineTo(w - 12, h/2 + 4)

    ctx.moveTo(w/2, h - 4);
    ctx.lineTo(w/2, 4);
    ctx.lineTo(w/2 - 4, 12)
    ctx.moveTo(w/2, 4)
    ctx.lineTo(w/2 + 4, 12)

    for (i = 1; i < 6; i++){
        x = w/6 * i;
        ctx.moveTo(x, h/2 - 4)
        ctx.lineTo(x, h/2 + 4)
    }

    for (i = 1; i < 6; i++){
        y = h/6 * i;
        ctx.moveTo(w/2 - 4, y)
        ctx.lineTo(w/2 + 4, y)
    }

    ctx.stroke();
}

function draw_text(ctx, w, h){
    ctx.font = '12px sans-serif';

    x = w/6
    y = h/6

    ctx.fillText('-R', x - 6, h/2 - 7)
    ctx.fillText('-R/2', x * 2 - 6, h/2 - 7)
    ctx.fillText('R/2', x * 4 - 6, h/2 - 7)
    ctx.fillText('R', x * 5 - 4, h/2 - 7)

    ctx.fillText('-R', w/2 + 7, y * 5 + 4)
    ctx.fillText('-R/2', w/2 + 7, y * 4 + 4)
    ctx.fillText('R/2', w/2 + 7, y * 2 + 4)
    ctx.fillText('R', w/2 + 7, y + 4)

    ctx.fillText('x', x * 6 - 6, h/2 - 7)
    ctx.fillText('y', w/2 + 7, 8)
}

function draw_figures(ctx, w, h){
    ctx.fillStyle = `rgb(51, 153, 255)`

    ctx.fillRect(w/2, h/2, -w/6, -h/3)

    ctx.moveTo(w/2, h/2)
    ctx.lineTo(w/2, h/6)
    ctx.lineTo(w/6 * 4, h/2)
    ctx.lineTo(w/2, h/2)
    ctx.fill()

    ctx.arc(w/2, h/2, w/3, Math.PI, Math.PI / 2, 1)
    ctx.fill()
}

function draw_dot(e, x, y, r, hm){
    var ctx = e.getContext('2d')

    ctx.beginPath();

    if (hm === 'Hit'){
        ctx.fillStyle = 'green'
    }
    else {
        ctx.fillStyle = 'red'
    }

    ctx.arc(((x * 105.5)/(r * 1.5) + canvas_graph.width/2) - 0.5,
            (-(y * 105.5)/(r * 1.5) + canvas_graph.width/2) - 0.5, 2, 0, 2 * Math.PI)
    ctx.fill()
}

function draw(){
    var ctx = canvas_graph.getContext('2d');

    draw_figures(ctx, canvas_graph.width, canvas_graph.height);

    ctx.fillStyle = `rgb(0, 0, 0)`

    draw_dec_lines(ctx, canvas_graph.width, canvas_graph.height);
    draw_text(ctx, canvas_graph.width, canvas_graph.height);
}

draw()

function addColon(row, val){
    var colon = document.createElement('td')
    colon.innerText = val
    row.appendChild(colon)
}

function handleValid(responseObj, tr) {
    addColon(tr, responseObj.x)
    addColon(tr, responseObj.y)
    addColon(tr, responseObj.r)
    addColon(tr, responseObj.hit)
    addColon(tr, responseObj.t)
    addColon(tr, responseObj.wt)

    //table.appendChild(tr)
}

function handleInValid(tr) {
    var colon = document.createElement('td')
    colon.innerText = 'Сервер получил некорректные данные'
    colon.colSpan = 6
    colon.style.color = "red";
    tr.appendChild(colon)
}

xhr.onload = function() {
    //console.log(xhr.response)

    divRes.innerHTML = xhr.response;

    /*document.querySelectorAll('tr.correct-dots').forEach(i => {
        Array.from(i.childNodes).forEach(k => {
            console.log(k.innerHTML)
        })
    })*/

    document.querySelectorAll('tr.correct-dots').forEach(i => {
        var childs = Array.from(i.childNodes)
        console.log(childs[1].innerHTML, childs[3].innerHTML, childs[5].innerHTML, childs[7].innerHTML)
        draw_dot(canvas_graph, childs[1].innerHTML, childs[3].innerHTML, childs[5].innerHTML, childs[7].innerHTML)
    })

    return;
}

xhr.onerror = function() {
    alert('Запрос не удался')
}

function updateClickedBtn(clickedBtn, others){
    valToChange = clickedBtn.value
    others.forEach(b => b.style.background = "white")
    clickedBtn.style.background = "red"
}

xBtns.forEach(b => b.addEventListener('click', function() {
    updateClickedBtn(this, xBtns)
}))

xBtns.forEach(b => b.addEventListener('click', function() {
    xVal = this.value
}))

rBtns.forEach(b => b.addEventListener('click', function() {
    updateClickedBtn(this, rBtns)
}))

rBtns.forEach(b => b.addEventListener('click', function() {
    rVal = this.value
}))

function valdateX(){
    if (!xVal){
        xError.textContent = 'Choose X value before checking!'
        return false
    }
    else{
        xError.textContent = ''
        return true
    }
}

function valdateY(){
    y = yVal.value

    if (y.length == 0){
        yError.textContent = 'Please, type a number'
        return false
    }

    console.log(y.length)
    if (y.length > 5){
        y = y.substr(0, 5);
    }
    console.log(y.length)

    y = Number(y.replace(",", "."))

    if (isNaN(y)){
        yError.textContent = 'Please, type a number'
        return false
    }
    else if (y < -3 || y > 5){
        yError.textContent = 'Enter Y value: Y is between -3 and 5'
        return false
    }
    else{
        yError.textContent = ''
        return true
    }
}

function valdateR(){
    if (!rVal){
        rError.textContent = 'Choose R value before check'
        return false
    }
    else{
        rError.textContent = ''
        return true
    }
}

function sendRequestToPHP(){
    console.log(xVal, y, rVal)
    var params = 'x=' + encodeURIComponent(xVal) +
        '&y=' + encodeURIComponent(y) +
        '&r=' + encodeURIComponent(rVal) +
        '&t=' + encodeURIComponent(new Date().getTimezoneOffset());
    xhr.open('POST', '/lab2', true)

    xhr.setRequestHeader("content-type","application/x-www-form-urlencoded")

    var data = {x: xVal, y: y, r: rVal, t: new Date().getTimezoneOffset()}
    console.log(params)

    xhr.send(params)

    console.log(2)
}

function sendInitRequest(){
    var params = 'getTable=' + encodeURIComponent('true');
    xhr.open('GET', '/lab2?' + params, true);
    xhr.setRequestHeader("content-type","application/x-www-form-urlencoded")
    xhr.send()
}

canvas_graph.addEventListener('click', (e) => {
    c_offset = cumulativeOffset(canvas_graph);

    if (valdateR()){
        var x = e.pageX - c_offset['left'];
        var yX = e.pageY - c_offset['top'];

        xVal = Math.round((x - canvas_graph.width/2) / (105.5 / 1.5) * rVal * 1000) / 1000;
        y = Math.round((canvas_graph.height/2 - yX) / (105.5 / 1.5) * rVal * 1000) / 1000;

        sendRequestToPHP();
    }
})

form.addEventListener('submit', function(event) {
    event.preventDefault()
    if (valdateX() & valdateY() & valdateR()){
        console.log('sent')
        sendRequestToPHP()
    }
})

sendInitRequest()