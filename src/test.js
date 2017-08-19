/**
 * Created by dima on 18/05/2017.
 */
import Gameloop from './classes/Gameloop';

const options = {
  canvasId: 'c',
  rows: 5,
  cols: 5,
  scale: 0.5,
  imageSelector: '[jjp-image]',
  neighboursSensitivity: 20,
};
const gameLoop = new Gameloop(options);

gameLoop.start();
