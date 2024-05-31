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

	save(char: string, index = -1) {
		if (index < 0) {
			this.state.push(char);
		} else {
			this.state[index] = char;
		}
	}

	color(color: string) {
		switch (color) {
			case 'red':
				process.stdout.write('\x1b[33m');
				break;
			case 'blue':
				break;

			default:
				process.stdout.write('\x1b[38m');
				break;
		}
	}

	write(char: string, at?: number) {
		if (at !== undefined) {
			this.save(char, at);
		} else {
			this.save(char);
		}
		this.update();
	}

	clearScreen() {
		this.initializeState();
		this.update();
	}

	clear() {
		process.stdout.write('\x1b[2J'); // Clear the entire screen
		process.stdout.write('\x1b[0;0H'); // Move the cursor to the top-left corner
	}

	render() {
		this.clear();
		process.stdout.write(
			Array.from({ length: this.height }, (_v, i) => i)
				.map((i) => this.state.slice(i * this.width, (i + 1) * this.width).join(''))
				.join('\n'),
		);
	}

	update(){
		if(!this.isLoopRunning || !this.renderOnLoop) {
			this.render();
		}
	}

	getHeight() {
		return size.height;
	}

	getWidth() {
		return size.width;
	}

	private isLoopRunning = false;
	private renderOnLoop = true;
	mainloop(){
		if(!this.isLoopRunning) return;
		if(this.renderOnLoop) this.render();
		setImmediate(() => this.mainloop());
	}
	startloop(){
		this.isLoopRunning = true;
		this.mainloop();
	}
	stoploop(){
		this.isLoopRunning = false;
	}
	loopRender(render = true){
		this.renderOnLoop = render;
	}

	alive(){
		this.loopRender(false);
		this.startloop();
	}
}

export default Renderer;
