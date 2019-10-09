var xArray = new Array(600) //Declared as a global variable
function main(){ //initializes the array as a 2d array
    var i;
    for (i = 0; i < 600; i++){
	xArray[i] = new Array(400); //corresponding array of y values
    };
    
    var canvas = document.getElementById('canvas');
    var gl = canvas.getContext('experimental-webgl');
    var vertices = [
            -0.7,-0.1,0,
            -0.3,0.6,0,
            -0.3,-0.3,0,
            0.2,0.6,0,
            0.3,-0.3,0,
            0.7,0.6,0 
         ]
    vertices[7] = [0.5, 0.6, 0,
		   -0.4, -0.5, 0]
         // Create an empty buffer object
         var vertex_buffer = gl.createBuffer();

         // Bind appropriate array buffer to it
         gl.bindBuffer(gl.ARRAY_BUFFER, vertex_buffer);
      
         // Pass the vertex data to the buffer
         gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

         // Unbind the buffer
         gl.bindBuffer(gl.ARRAY_BUFFER, null);

         /*=================== Shaders ====================*/

         // Vertex shader source code
         var vertCode =
            'attribute vec3 coordinates;' +
            'void main(void) {' +
               ' gl_Position = vec4(coordinates, 1.0);' +
            '}';

         // Create a vertex shader object
         var vertShader = gl.createShader(gl.VERTEX_SHADER);

         // Attach vertex shader source code
         gl.shaderSource(vertShader, vertCode);

         // Compile the vertex shader
         gl.compileShader(vertShader);

         // Fragment shader source code
         var fragCode =
            'void main(void) {' +
               'gl_FragColor = vec4(0.0, 0.0, 0.0, 0.1);' +
            '}';

         // Create fragment shader object
         var fragShader = gl.createShader(gl.FRAGMENT_SHADER);

         // Attach fragment shader source code
         gl.shaderSource(fragShader, fragCode);

         // Compile the fragmentt shader
         gl.compileShader(fragShader);

         // Create a shader program object to store
         // the combined shader program
         var shaderProgram = gl.createProgram();

         // Attach a vertex shader
         gl.attachShader(shaderProgram, vertShader);

         // Attach a fragment shader
         gl.attachShader(shaderProgram, fragShader);

         // Link both the programs
         gl.linkProgram(shaderProgram);

         // Use the combined shader program object
         gl.useProgram(shaderProgram);

         /*======= Associating shaders to buffer objects ======*/

         // Bind vertex buffer object
         gl.bindBuffer(gl.ARRAY_BUFFER, vertex_buffer);

         // Get the attribute location
         var coord = gl.getAttribLocation(shaderProgram, "coordinates");

         // Point an attribute to the currently bound VBO
         gl.vertexAttribPointer(coord, 8, gl.FLOAT, false, 0, 0);

         // Enable the attribute
         gl.enableVertexAttribArray(coord);

         /*============ Drawing the triangle =============*/

         // Clear the canvas
         gl.clearColor(0.5, 0.5, 0.5, 0.9);

         // Enable the depth test
         gl.enable(gl.DEPTH_TEST);

         // Clear the color and depth buffer
         gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

         // Set the view port
         gl.viewport(0,0,canvas.width,canvas.height);

         // Draw the triangle
         gl.drawArrays(gl.LINES, 0, 8);
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
    var tree = [coorX, coorY, 0,
		coorX, coorY, 40,]
    tree[6] = buildTree(coorX, 40, coorY, 20, 4, 0, 0);
    console.log(tree);
    
}
function storeBranch(x1, y1, z1, x2, y2, z2){
}
function buildTree(x, y, z, length, depth, angA, angB){
    if (depth <= 0){
	return null;
    }
    var branches = new Array(6);
    var newCoor = findCoord(x, y, z, length, angA+0, angB+45);
    //console.log("Coord: " + newCoor);
    branches[0] = newCoor;
    branches[1] = buildTree(newCoor[3],newCoor[4],newCoor[5],length/2,depth-1,angA+0,angB+45);
    var newCoor = findCoord(x, y, z, length, angA+120, angB+45);
    //console.log("Coord: " + newCoor);
    branches[2] = newCoor;
    branches[3] = buildTree(newCoor[3],newCoor[4],newCoor[5],length/2,depth-1,angA+120,angB+45);
    var newCoor = findCoord(x, y, z, length, angA+240, angB+45);
    //console.log("Coord: " + newCoor);
    branches[4] = newCoor;
    branches[5] = buildTree(newCoor[3],newCoor[4],newCoor[5],length/2,depth-1,angA+240,angB+45);
    return branches;
}
function findCoord(x, y, z, length, angA, angB){
    var retCoor = new Array(6);
    var xSlope  = Math.cos(angA) * Math.cos(angB);
    var zSlope  = Math.sin(angA) * Math.cos(angB);
    var ySlope  = Math.sin(angB);
    retCoor[0]  = x;
    retCoor[1]  = y;
    retCoor[2]  = z;
    retCoor[3]  = length * xSlope + x;
    retCoor[4]  = length * ySlope + y;
    retCoor[5]  = length * zSlope + z;
    return retCoor;
}
