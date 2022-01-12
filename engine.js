/*
	engine.js
	Useful functions for interfacing with WebGL.
*/

// loads and compiles a shader
function loadShader(source, type) {
	let shader = GL.createShader(type);
	GL.shaderSource(shader, source);
	GL.compileShader(shader);

	if (!GL.getShaderParameter(shader, GL.COMPILE_STATUS)) {
		console.log("Unable to compile shader. Output log:\n"+GL.getShaderInfoLog(shader));
		GL.deleteShader(shader);
		return null;
	}
	
	return shader;

}

// initializes a shader program
function initShaderProgram(vertSrc, fragSrc) {

	let vertShader = loadShader(vertSrc, GL.VERTEX_SHADER);
	let fragShader = loadShader(fragSrc, GL.FRAGMENT_SHADER);

	let program = GL.createProgram();
	GL.attachShader(program, vertShader);
	GL.attachShader(program, fragShader);
	GL.linkProgram(program);

	if (!GL.getProgramParameter(program, GL.LINK_STATUS)) {
		console.log("Unable to link program. Output log:\n"+GL.getProgramInfoLog(program));
		return null;
	}
	
	return program;

}

// returns a drawing buffer
function initBuffer(values) {
	
	let buffer = GL.createBuffer();
	GL.bindBuffer(GL.ARRAY_BUFFER, buffer);

	GL.bufferData(
		GL.ARRAY_BUFFER,
		new Float32Array(values),
		GL.STATIC_DRAW
	);

	GL.bindBuffer(GL.ARRAY_BUFFER, null);
	
	return buffer;

}

// returns an element buffer
function initElementBuffer(values) {

	// creates and binds buffer
	const elementBuffer = GL.createBuffer();
	GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, elementBuffer);

	// sets buffer data
	GL.bufferData(
		GL.ELEMENT_ARRAY_BUFFER,
		new Uint16Array(values),
		GL.STATIC_DRAW
	);

	// unbinds buffer
	GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, null);

	return elementBuffer;

}

// translates 
function glTranslate(x, y, z) {
	mat4.translate(
		modelViewMatrix,
		modelViewMatrix,
		[x, y, z]
	);
}

// rotates model view matrix
function glRotate(angle, x, y, z) {
	mat4.rotate(
		modelViewMatrix,
		modelViewMatrix,
		angle*Math.PI/180,
		[x, y, z]
	)
}

// uploads projection and model view matrices
function uploadMatrices() {

	GL.uniformMatrix4fv(
		GL.getUniformLocation(shaders, "uProjectionMatrix"),
		false,
		projectionMatrix
	);

	GL.uniformMatrix4fv(
		GL.getUniformLocation(shaders, "uModelViewMatrix"),
		false,
		modelViewMatrix
	);

}

// applies buffers
function useBuffers(coordBuffer, colorBuffer) {

	// passes vertices to vertex shader
	GL.bindBuffer(GL.ARRAY_BUFFER, coordBuffer);
	GL.vertexAttribPointer(
		GL.getAttribLocation(shaders, "aVertexPosition"),
		3,
		GL.FLOAT,
		false,
		0,
		0
	);
	GL.enableVertexAttribArray(GL.getAttribLocation(shaders, "aVertexPosition"));

	// passes colors to fragment shader
	GL.bindBuffer(GL.ARRAY_BUFFER, colorBuffer);
	GL.vertexAttribPointer(
		GL.getAttribLocation(shaders, "aPrimitiveColor"),
		4,
		GL.FLOAT,
		false,
		0,
		0
	);
	GL.enableVertexAttribArray(GL.getAttribLocation(shaders, "aPrimitiveColor"));

}

// applies element buffer
function useElementBuffers(elementBuffer, coordBuffer, colorBuffer) {

	// passes vertices to vertex shader
	GL.bindBuffer(GL.ARRAY_BUFFER, coordBuffer);
	GL.vertexAttribPointer(
		GL.getAttribLocation(shaders, "aVertexPosition"),
		3,
		GL.FLOAT,
		false,
		0,
		0
	);
	GL.enableVertexAttribArray(GL.getAttribLocation(shaders, "aVertexPosition"));

	// passes colors to fragment shader
	GL.bindBuffer(GL.ARRAY_BUFFER, colorBuffer);
	GL.vertexAttribPointer(
		GL.getAttribLocation(shaders, "aPrimitiveColor"),
		4,
		GL.FLOAT,
		false,
		0,
		0
	);
	GL.enableVertexAttribArray(GL.getAttribLocation(shaders, "aPrimitiveColor"));

	// binds element buffer
	GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, elementBuffer);

}

// draws rectangular prism
function drawBox(x, y, z, l, w, h) {
	// WORK IN PROGRESS
	const coordBuffer = initBuffer();
}
