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

class Timeline {
	constructor(interval) {
		this.interval = interval;
		this.minTime = 0;
		this.maxTime = 100;
		this.events = [];
	}

	draw = () => {
		context.strokeStyle = 'rgba(255, 255, 255, 0.5)';
		context.fillStyle = 'rgba(255, 255, 255, 0.3)';

		context.beginPath();
		context.moveTo(0, 2 * canvas.height / 3);
		context.lineTo(canvas.width, 2 * canvas.height / 3);
		context.stroke();
	}

	update = () => {
	}
}

const mainTimeline = new Timeline(5);

function animate() {
	requestAnimationFrame(animate);
	context.clearRect(0, 0, window.innerWidth, window.innerHeight);
	mainTimeline.draw();
};

animate();