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
		this.earliestTime = 0;
		this.latestTime = this.earliestTime + (this.interval * 100);

		this.defaultEventWidth = canvas.width / interval / 4 * 3;

		this.events = [];
		this.canvasResized();
		window.addEventListener('resize', this.canvasResized());
	};

	canvasResized = () => {
		this.y = 2 * canvas.height / 3;
	}

	draw = () => {
		context.strokeStyle = 'rgba(255, 255, 255, 0.5)';
		context.fillStyle = 'rgba(255, 255, 255, 0.3)';

		context.beginPath();
		context.moveTo(0, this.y);
		context.lineTo(canvas.width, this.y);
		context.stroke();

		this.events.forEach(event => {
			event.draw();
		});
	};

	update = () => {
	};

	positionOf = (timeValue) => {
		return (timeValue - this.earliestTime)/(this.latestTime - this.earliestTime)*(canvas.width);
	}
};

class TimelineEvent {
	constructor(timeValue, name) {
		this.timeValue = timeValue;
		this.name = name;
		this.height = canvas.height / 50;
		this.width = mainTimeline.defaultEventWidth;
	};

	draw = () => {
		if (mainTimeline.earliestTime <= this.timeValue && mainTimeline.latestTime >= this.timeValue) {
			context.strokeStyle = 'rgba(255, 255, 187, 1)';
			context.fillStyle = 'rgba(255, 255, 187, 0.5)';

			context.beginPath();
			const xPos = mainTimeline.positionOf(this.timeValue);
			context.moveTo(xPos - (this.width/2), mainTimeline.y - (this.height/2));
			context.lineTo(xPos - (this.width/2), mainTimeline.y + (this.height/2));
			context.lineTo(xPos + (this.width/2), mainTimeline.y + (this.height/2));
			context.lineTo(xPos + (this.width/2), mainTimeline.y - (this.height/2));
			context.closePath();
			context.stroke();
			context.fill();
		};
	};
};

const mainTimeline = new Timeline(5);
mainTimeline.events.push(new TimelineEvent(10, "The first"));

function animate() {
	requestAnimationFrame(animate);
	context.clearRect(0, 0, window.innerWidth, window.innerHeight);
	mainTimeline.draw();
};

animate();