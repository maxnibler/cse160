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
	blueTree(x,y);
    }else if(event.button == 2){
	blueTree(x,y);
    }
    xArray[x][y] = event.button; //stores the most recent mouse button input at that position
}
const canvas = document.querySelector('canvas')
canvas.addEventListener('mousedown', function(e) {
    getCursorPosition(canvas, e)
})
function blueTree(coorX, coorY){
    var canvas = document.getElementById('canvas');
    var gl = canvas.getContext('experimental-webgl');
    gl.clearColor(0.9,0.9,0.8,1);
    gl.clear(gl.COLOR_BUFFER_BIT);
    
}
function branch(x, y, z, length, angA, angB){
    
}
function findBranch(x, y, z, length, depth, angA, angB){
    var newLength = length / 2;
    
    
}
function findCoord(x, y, z, length, angA, angB){
    var retCoor = new Array(3);
    var xSlope  = Math.cos(angA) * Math.cos(angB);
    var zSlope  = Math.sin(angA) * Math.cos(angB);
    var ySlope  = Math.sin(angB);
    retCoor[0]  = length * xSlope - x;
    retCoor[1]  = length * ySlope - y;
    retCoor[2]  = length * zSlope - z;
    return retCoor;
}
