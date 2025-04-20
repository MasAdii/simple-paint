const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')

const brush = document.getElementById('brush')
const eraser = document.getElementById('eraser')
const clear = document.getElementById('clear')
const colorPicker = document.getElementById('colorPicker')

canvas.width = 800
canvas.height = 500

let painting = false
let erasing = false
let currentColor = '#000000'
let lineWidth = 5

function start(e){
    painting = true
    draw(e)
}

function end(e){
    painting = false
    ctx.beginPath()
}

function draw(e){
    if(!painting) return;

    ctx.lineWidth = lineWidth;
    ctx.lineCap = 'round';
    ctx.strokeStyle = erasing ? '#FFFFFF' : currentColor;

    const x = e.clientX;
    const y = e.clientY;

    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x, y);
}


function selectBrush(){
    erasing = false
    brush.classList.add('active')
    eraser.classList.remove('active')
}

function selectEraser(){
    erasing = true
    eraser.classList.add('active')
    brush.classList.remove('active')
}

function clearCanvas(){
    ctx.clearRect(0, 0, canvas.width, canvas.height)
}

function changeColor(e){
    currentColor = e.target.value
}

brush.addEventListener('click', selectBrush)
eraser.addEventListener('click', selectEraser)
clear.addEventListener('click', clearCanvas)
colorPicker.addEventListener('input', changeColor)

canvas.addEventListener('mousedown', start)
canvas.addEventListener('mouseup', end)
canvas.addEventListener('mousemove', draw)

canvas.addEventListener('touchstart', (e) => {
    e.preventDefault()
    const touch = e.touches[0]
    start(convertTouchToMouse(touch))
})

canvas.addEventListener('touchend', (e) => {
    e.preventDefault()
    end(e)
})

canvas.addEventListener('touchmove', (e) => {
    e.preventDefault()
    const touch = e.touches[0]
    draw(convertTouchToMouse(touch))
})

function convertTouchToMouse(touch) {
    const rect = canvas.getBoundingClientRect();
    return {
        clientX: touch.clientX - rect.left,
        clientY: touch.clientY - rect.top
    }
}
