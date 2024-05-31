import size from 'window-size';

class Renderer {
	width = 0;
	height = 0;
	private state: string[] = [];

	constructor() {
		this.width = this.getWidth();
		this.height = this.getHeight();
		this.initializeState();
	}

	initializeState() {
		this.state = Array<string>(this.height * this.width).fill(' ');
	}

	save(char: string, index: number = -1) {
		if (index < 0) {
			this.state.push(char);
		} else {
			this.state[index] = char;
		}
	}

	write(char: string, at?: number) {
		if (at !== undefined) {
			this.save(char, at);
		} else {
			this.save(char);
		}
		this.render();
	}

	clearScreen() {
		this.initializeState();
		this.render();
	}

	clear() {
		process.stdout.write('\x1b[2J'); // Clear the entire screen
		process.stdout.write('\x1b[0;0H'); // Move the cursor to the top-left corner
	}

	render() {
		this.clear();
		let output = '';
		for (let i = 0; i < this.height; i++) {
			output += this.state.slice(i * this.width, (i + 1) * this.width).join('') + '\n';
		}
		process.stdout.write(output);
	}

	getHeight = () => {
		return size.height;
	};

	getWidth = () => {
		return size.width;
	};
}

export default Renderer;
