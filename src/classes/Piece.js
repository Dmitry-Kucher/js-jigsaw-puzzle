/**
 * Created by dima on 02/07/2017.
 */
export default class Piece {
  constructor({ content, position } = {}) {
    if (typeof content === 'undefined' || typeof position === 'undefined') {
      throw Error('piece required content and position');
    }
    this.getContent = () => content;
    this.getPosition = () => position;
    return this.getContent();
  }

  getRow(cols) {
    return Math.floor(this.getPosition() / cols);
  }

  getCol(cols) {
    return this.getPosition() % cols;
  }
}
