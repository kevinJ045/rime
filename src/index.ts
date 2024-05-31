import Renderer from './features/renderer/logic/classes/renderer.class.js';

const renderer = new Renderer();
renderer.clearScreen();
renderer.color('red');

const writing = 'Hello';

writing.split('').forEach((char, index) => {
  setTimeout(() => {
    renderer.write(char, index);
  }, index * 100);
});

renderer.alive();

export default { Renderer };
