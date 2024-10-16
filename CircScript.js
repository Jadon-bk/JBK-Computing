const canvas = document.getElementById("root");
const ctx = canvas.getContext("2d");

// let canvasElem = document.querySelector("canvas");
// canvasElem.addEventListener("mousedown", function (e {getMousePosition(canvasElem, e)}));

var count = 0;

// Get the DPR and size of the canvas
const dpr = window.devicePixelRatio;
const rect = canvas.getBoundingClientRect();

// Set the "actual" size of the canvas
canvas.width = rect.width * dpr;
canvas.height = rect.height * dpr;

// Scale the context to ensure correct drawing operations
ctx.scale(dpr, dpr);

var bag = [[canvas.width/2,canvas.height/2,"0","0"],[canvas.width/2+100, canvas.height/2+100, "0", "0"]];


function Clear() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function drawCircle() {
    ctx.beginPath();
    ctx.arc(rect.width/2, rect.height/2, rect.height*0.475, 0, 2*Math.PI);
    ctx.stroke();
}

function drawSquare() {
    ctx.strokeRect((rect.width-0.95*rect.height)/2, rect.height*0.025, rect.height*0.95, rect.height*0.95);
}

function addBall() {
    console.log("adding");
}

function draw(){
    ctx.beginPath();
    ctx.arc(bag[count][0], bag[count][1], 25, 0, 2*Math.PI);
    ctx.fillStyle = "red";
    ctx.fill();
    count = count + 1
}

function getMousePosition(canvas, event) {
    let rect = canvas.getBoundingClientRect();
    let x = event.clientX - rect.left;
    let y = event.clientY - rect.top;
    console.log("Coordinate x: " + x, "Coordinate y: " + y);
}




















