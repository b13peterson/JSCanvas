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
	constructor(timeInterval, min, max) {
		this.timeInterval = timeInterval;
		this.min = min;
		this.max = max;

		this.defaultEventWidth = this.scaleToCanvas(this.timeInterval / 4);

		this.events = [];
		this.intervals = [];
		this.canvasResized();
		window.addEventListener('resize', this.canvasResized());
		this.drawBaseline();
	};

	canvasResized = () => {
		this.y = 2 * canvas.height / 3;
		this.defaultIntervalHeight = canvas.height / 40;
	};

	draw = () => {
		this.drawBaseline();
		this.drawIntervals();

		this.events.forEach(event => {
			event.draw();
		});
	};

	drawIntervals = () => {
		context.strokeStyle = 'rgba(255, 255, 255, 0.5)';
		context.fillStyle = 'rgba(255, 255, 255, 0.3)';
		context.textAlign = "center";

		const startValue = Math.round(this.min / this.timeInterval) * this.timeInterval;
		const intervalCount = Math.round(this.max - this.min) / this.timeInterval;
		const majorInterval = Math.round(Math.log2(intervalCount)) * this.timeInterval;
		for (let i = startValue; i <= this.max; i += this.timeInterval) {
			const dy = (i % majorInterval === 0) ? this.defaultIntervalHeight : this.defaultIntervalHeight / 1.7;
			const xPos = this.scaleToCanvas(i);
			context.beginPath();
			context.moveTo(xPos, this.y + dy);
			context.lineTo(xPos, this.y - dy);
			context.stroke();

			context.strokeText(i, xPos, this.y + (this.defaultIntervalHeight*1.5));
		};
	};

	drawBaseline = () => {
		context.strokeStyle = 'rgba(255, 255, 255, 0.5)';
		context.fillStyle = 'rgba(255, 255, 255, 0.3)';

		context.beginPath();
		context.moveTo(0, this.y);
		context.lineTo(canvas.width, this.y);
		context.stroke();
	};

	update = () => {
	};

	scaleToCanvas = (timeValue) => {
		return (timeValue - this.min)/(this.max - this.min)*(canvas.width);
	};
};

class TimelineEvent {
	constructor(timeValue, name) {
		this.timeValue = timeValue;
		this.name = name;
		this.height = canvas.height / 40;
		this.width = mainTimeline.defaultEventWidth;
	};

	draw = () => {
		if (mainTimeline.min <= this.timeValue && mainTimeline.max >= this.timeValue) {
			context.strokeStyle = 'rgba(255, 255, 187, 1)';
			context.fillStyle = 'rgba(255, 255, 187, 0.8)';

			context.beginPath();
			const xPos = mainTimeline.scaleToCanvas(this.timeValue);
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

let mainTimeline = new Timeline(2, 0, 100);
mainTimeline.events.push(new TimelineEvent(10, "The first"));

function animate() {
	requestAnimationFrame(animate);
	context.clearRect(0, 0, window.innerWidth, window.innerHeight);
	mainTimeline.draw();
};

animate();