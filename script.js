/*
	script.js
	The behavior of the document.
*/

// rotation
let rotation = 0.0;

// shader code
const vertSrc = `
	attribute vec4 aVertexPosition;
	attribute vec4 aPrimitiveColor;

	uniform mat4 uModelViewMatrix;
	uniform mat4 uProjectionMatrix;

	varying vec4 vPrimitiveColor;

	void main() {
		gl_Position = uProjectionMatrix * uModelViewMatrix * aVertexPosition;
		vPrimitiveColor = aPrimitiveColor;
	}
`;

const fragSrc = `
	varying lowp vec4 vPrimitiveColor;

	void main() {
		gl_FragColor = vPrimitiveColor;
	}
`;

// imports glMatrix library
const { vec2, vec3, vec4, mat3, mat4 } = glMatrix;

// gets WebGL rendering context for canvas
const canvas = document.getElementById("display");
const GL = canvas.getContext("webgl");

// creates projection and model view matrices
const projectionMatrix = mat4.create();
mat4.perspective(
	projectionMatrix, // destination matrix
	60 * Math.PI / 180, // field of view in radians
	canvas.clientWidth/canvas.clientHeight, // aspect ratio
	0.1, // near clipping plane
	100 // far clipping plane
);

// creates model view matrix
const modelViewMatrix = mat4.create();

// sets clear color and view port
GL.clearColor(0, 0, 0, 1);
GL.viewport(0, 0, canvas.clientWidth, canvas.clientHeight);
GL.clearDepth(1);

// enables depth testing
GL.enable(GL.DEPTH_TEST);
GL.depthFunc(GL.LEQUAL);

// initializes shaders
const shaders = initShaderProgram(vertSrc, fragSrc);

// creates coordinate buffer
const buffer = initBuffer([

	// front
	-1, -1, 1,
	1, -1, 1,
	1, 1, 1,
	-1, 1, 1,

	// back
	-1, -1, -1,
	1, -1, -1,
	1, 1, -1,
	-1, 1, -1,

	// top
	-1, 1, -1,
	1, 1, -1,
	1, 1, 1,
	-1, 1, 1,

	// bottom
	-1, -1, -1,
	1, -1, -1,
	1, -1, 1,
	-1, -1, 1,

	// right
	1, -1, -1,
	1, 1, -1,
	1, 1, 1,
	1, -1, 1,

	// left
	1, -1, -1,
	1, 1, -1,
	1, 1, 1,
	1, -1, 1

]);

// creates color buffer
let colors = [];
for (let i=0; i<144; i++) {
	colors += 1.0;
}
console.log(colors.length)
const color = initBuffer(colors);

// creates element buffer
const element = initElementBuffer([

	// front
	0, 1, 2,			0, 2, 3,
	// back
	4, 5, 6,			4, 6, 7,
	// top
	8, 9, 10,			8, 10, 11,
	// bottom
	12, 13, 14,		12, 14, 15,
	// right
	16, 17, 18,		16, 18, 19,
	// left
	20, 21, 22,		20, 22, 23

]);

// tells WebGL to use the shader program and coordinate buffer
GL.useProgram(shaders);

// uses the vertices, colors, and elements
useElementBuffers(element, buffer, color);

// moves camera back so square can be seen
glTranslate(0, 0, -6);

// main loop
setInterval(() => {

	// sets delta time
	const deltaTime = 20;
	
	// clears canvas
	GL.clear(GL.COLOR_BUFFER_BIT | GL.DEPTH_BUFFER_BIT);

	// uploads the projection and model view matrices
	uploadMatrices();
	
	// rotates square by 5 degrees
	glRotate(1, 3, 1, 1);

	// draws square
	GL.drawElements(GL.TRIANGLES, 36, GL.UNSIGNED_SHORT, 0);
	
	// increments rotation variable
	rotation++;
	
}, 20);
