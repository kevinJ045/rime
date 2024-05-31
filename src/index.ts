import Renderer from './features/renderer/logic/classes/renderer.class.js';

const renderer = new Renderer();
renderer.clearScreen();

const writing = 'Hello';

writing.split('').forEach((char, index) => {
  setTimeout(() => {
    renderer.write(char, index + renderer.getWidth() * 2);
  }, index * 100);
});

export default { Renderer };
