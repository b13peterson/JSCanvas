// Source: https://medium.com/@bretcameron/create-interactive-visuals-with-javascript-and-html5-canvas-5f466d0b26de
const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d');

let style = 'diamond';

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

class Diamond {
	constructor(x, y, dx, dy, width) {
		this.x = x;
		this.y = y;
		this.dx = dx;
		this.dy = dy;
		this.width = width;
		this.minWidth = width;
		this.maxWidth = width * 3;

		let colorArray = [
			'#de3d3d',
			'#090c0b',
			'#0d2527',
			'#267368',
			'#00b1a0'
		  ];

		this.color = colorArray[
			Math.floor(Math.random() * colorArray.length)
		];
	};

	draw = () => {
		context.beginPath();
		context.moveTo(this.x, this.y);
		context.lineTo(
		  this.x - this.width / 2,
		  this.y
		);
		context.lineTo(
		  this.x,
		  this.y + this.width / 2
		);
		context.lineTo(
		  this.x + this.width / 2,
		  this.y
		);
		context.lineTo(
		  this.x,
		  this.y - this.width / 2
		);
		context.lineTo(
		  this.x - this.width / 2,
		  this.y
		);
		context.closePath();
		context.fillStyle = this.color;
		context.fill();
		this.update();
	};

	update = () => {
		if (this.x + (this.width / 2) >= window.innerWidth
		  || this.x - (this.width / 2) <= 0) {
		  this.dx = -this.dx;
		}
		if (this.y + (this.width / 2) >= window.innerHeight
		  || this.y - (this.width / 2) <= 0) {
		  this.dy = -this.dy;
		}
		this.x += this.dx;
		this.y += this.dy;

		if (mouse.x - (this.x) < 80 && mouse.x - (this.x) > -80
			&& mouse.y - (this.y) < 80 && mouse.y - (this.y) > -80
			&& this.width < this.maxWidth
			) {
			this.width += 1;
			this.x -= 1;
			this.y -= 1;
		} else if (this.width > this.minWidth) {
			this.width -= 1;
			this.x += 1;
			this.y += 1;
		};
	};
};

const shapeArray = [];

if (style === 'diamond') {
	for (let i = 0; i < 400; i++) {
		let width = Math.random() * 20 + 4;
		let x = Math.random() * window.innerWidth;
		let dx = (Math.random() - 0.5) * 1;
		let y = Math.random() * window.innerHeight;
		let dy = (Math.random() - 0.5) * 1;
		shapeArray.push(new Diamond(x, y, dx, dy, width));
	};
} else if (style === 'line') {
	// Fill screen with lines
	for (let i = 0; i < 100; i++) {
		const start = { x: -250, y: 800};
		const random = Math.random() - 0.5;
		const unit = 25;
	
		shapeArray.push(
			new Line(
				start.x + ((unit + random) * i),
				start.y + (i + random) * -3 + Math.sin(i) * unit,
				0.1 + (1 * i)
			)
		);
	};
};

function animate() {
	requestAnimationFrame(animate);
	context.clearRect(0, 0, window.innerWidth, window.innerHeight);
	shapeArray.forEach(diamond => {
		diamond.draw();
	});
};

animate();