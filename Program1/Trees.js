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
    //gl.clearColor(0.9,0.9,0.8,1);
    //gl.clear(gl.COLOR_BUFFER_BIT);
    storeBranch(coorX, 0, coorY, coorX, 40, coorY);
    findBranch(coorX, 40, coorY, 40, 0, 0, 0);
    
}
function storeBranch(x1, y1, z1, x2, y2, z2){
    var canvas = document.getElementById('canvas');
    var gl = canvas.getContext('experimental-webgl');
    var vertexBuff = gl.createBuffer();
    var treeProg = gl.createProgram();
    gl.linkProgram(treeProg);
    var branchVertex = [x1,y1,z1,
			x2,y2,z2];
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuff);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(branchVertex), gl.STATIC_DRAW);
    gl.drawArrays(gl.LINES,0,6);
}
function findBranch(x, y, z, length, depth, angA, angB){
    //console.log("Finding: " + angA+" "+angB);
    var newCoor = findCoord(x, y, z, length, angA+0, angB+45);
    console.log("Coord: " + newCoor);
    var newCoor = findCoord(x, y, z, length, angA+120, angB+45);
    console.log("Coord: " + newCoor);
    var newCoor = findCoord(x, y, z, length, angA+240, angB+45);
    console.log("Coord: " + newCoor);    
}
function findCoord(x, y, z, length, angA, angB){
    var retCoor = new Array(3);
    var xSlope  = Math.cos(angA) * Math.cos(angB);
    var zSlope  = Math.sin(angA) * Math.cos(angB);
    var ySlope  = Math.sin(angB);
    retCoor[0]  = length * xSlope + x;
    retCoor[1]  = length * ySlope + y;
    retCoor[2]  = length * zSlope + z;
    return retCoor;
}
