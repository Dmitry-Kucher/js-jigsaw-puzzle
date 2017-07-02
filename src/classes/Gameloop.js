/**
 * Created by dima on 02/07/2017.
 */
import Image from './Image';
import Gamefield from './Gamefield';
import Piece from './Piece';

export default class Gameloop {
  constructor(options) {
    if (!options.imageSelector) {
      throw Error('image selector is not defined');
    }
    this.getOptions = () => options;
  }

  start() {
    document.addEventListener('DOMContentLoaded', () => {
      const options = this.getOptions();
      const gamefield = new Gamefield({ canvasId: options.canvasId });
      const image = new Image(options.imageSelector);
      image.splitImageToPieces({ colLength: options.cols, rowLength: options.rows });
      console.log('game started with options:');
      console.log(gamefield);
      gamefield.getCanvas().renderAll();
    });
  }
}
