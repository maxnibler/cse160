var xArray = new Array(600) //Declared as a global variable
function main(){ //initializes the array as a 2d array
    var i;
    for (i = 0; i < 600; i++){
	xArray[i] = new Array(400); //corresponding array of y values
    };
}
function getCursorPosition(canvas, event) {
    const rect = canvas.getBoundingClientRect()
    const x = event.clientX - rect.left
    const y = event.clientY - rect.top
    console.log("X - " + x + ", Y - " + y)
    if (event.button == 0){
	blueSquare(x,y);
    }else if(event.button == 2){
	redCircle(x,y);
    }
    xArray[x][y] = event.button; //stores the most recent mouse button input at that position
}
const canvas = document.querySelector('canvas')
canvas.addEventListener('mousedown', function(e) {
    getCursorPosition(canvas, e)
})
function blueSquare(centerX, centerY){
    var can = document.getElementById("canvas")
    var ctx = can.getContext("2d");
    var newX = centerX - 5;
    var newY = centerY - 5;
    ctx.beginPath();
    ctx.lineWidth = "1";
    ctx.fillStyle = "blue";
    ctx.rect(newX,newY,10,10);
    ctx.fill();
}
function redCircle(centerX, centerY){
    var can = document.getElementById("canvas")
    var ctx = can.getContext("2d");
    ctx.beginPath();
    ctx.fillStyle = "red";
    ctx.arc(centerX,centerY,10,0,2*Math.PI);
    ctx.fill();
}
