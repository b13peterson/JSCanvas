const board = document.getElementById('boardInner');

const renderBoard = () => {
	let change = false;
	let backgroundColor = 'white';
	for (let i = 0; i < 64; ++i) {
		let element = document.createElement('DIV');
		element.className= 'square';
		change = i % 8 === 0 || i === 0
		backgroundColor = change ? backgroundColor : backgroundColor === 'white' ? 'black' : 'white';
		element.style.backgroundColor = backgroundColor;
		board.appendChild(element);
		change = false;
	}
}
renderBoard()