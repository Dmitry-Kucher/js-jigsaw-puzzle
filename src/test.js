/**
 * Created by dima on 18/05/2017.
 */
import Gameloop from './classes/Gameloop';

const options = {
  canvasId: 'c',
  rows: 6,
  cols: 6,
  scale: 0.8,
  imageSelector: '[jjp-image]',
  neighboursSensitivity: 20,
};
const gameLoop = new Gameloop(options);

gameLoop.start();
