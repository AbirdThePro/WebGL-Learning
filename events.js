/*
	events.js
	The event listeners for the document are here.
*/

const clientRect = canvas.getBoundingClientRect();

var mouseRelX, mouseRelY;

function getRelCoords(x, y) {
	return [
		x-clientRect.left,
		y-clientRect.top
	];
}

canvas.addEventListener("mousemove", function(e) {
	mouseRelX = 0;
	mouseRelY = 0;
	let coords = getRelCoords(e.clientX, e.clientY);
	
});
