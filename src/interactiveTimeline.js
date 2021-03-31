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
};

class Line {
	constructor(x, y, offset) {
		this.x = x;
		this.y = y;
		this.offset = offset;
		this.radians = 0;
		this.velocity = 0.01;
	};

	draw = () => {
		context.strokeStyle = 'rgba(255, 255, 255, 0.5)';
		context.fillStyle = 'rgba(255, 255, 255, 0.3)';

		// Draw wide lines invisibly behind visible lines for mouse interaction
		const drawLinePath = (width = 0, color) => {
			context.beginPath();
			context.moveTo(this.x - (width / 2), this.y + (width / 2));
			context.lineTo(this.x - (width / 2) + 300, this.y - (width / 2) - 1000);
			context.lineTo(this.x + (width / 2) + 300, this.y - (width / 2) - 1000);
			context.lineTo(this.x + (width / 2), this.y - (width / 2));
			context.closePath();
			if (context.isPointInPath(mouse.x, mouse.y) && color) {
				context.strokeStyle = color;
			};
		};

		drawLinePath(150, '#baf2ef');
		drawLinePath(50, '#dcf3ff');

		context.beginPath();
		context.arc(this.x, this.y, 1, 0, Math.PI * 2, false);
		context.fill();
		context.moveTo(this.x, this.y);
		context.lineTo(this.x + 300, this.y - 1000);
		context.stroke();
		context.closePath();

		this.update();
	};
	

	update = () => {
		// control movement and interactivity
		this.radians += this.velocity;
		this.y = this.y + Math.cos(this.radians + this.offset);
	};
};



// Fill screen with lines
const lineArray = [];
for (let i = 0; i < 100; i++) {
	const start = { x: -250, y: 800};
	const random = Math.random() - 0.5;
	const unit = 25;

	lineArray.push(
		new Line(
			start.x + ((unit + random) * i),
			start.y + (i + random) * -3 + Math.sin(i) * unit,
			0.1 + (1 * i)
		)
	);
};

function animate() {
	requestAnimationFrame(animate);
	context.clearRect(0, 0, window.innerWidth, window.innerHeight);
	lineArray.forEach(line => {
		line.draw();
	});
};

animate();