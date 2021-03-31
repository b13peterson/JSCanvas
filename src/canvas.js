// Source: https://medium.com/@bretcameron/create-interactive-visuals-with-javascript-and-html5-canvas-5f466d0b26de
const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d');


function resizeCanvas() {
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
} 

window.addEventListener('resize', resizeCanvas());

let mouse = {
	x: undefined,
	y: undefined
};

window.addEventListener('mousemove', function (e) {
	mouse.x = event.x;
	mouse.y = event.y;
});

class Shape {
	constructor(x, y) {
		this.x = x;
		this.y = y;
		this.initialX = x;
		this.initialY = y;
	};

	draw = () => {
		// alter shape's appearance
	};

	update = () => {
		// control movement and interactivity
		this.draw();
	};
}

function animate() {
	requestAnimationFrame(animate);
	context.clearRect(0, 0, window.innerWidth, window.innerHeight);

	// call our animation method like Shape.draw()
};

animate();