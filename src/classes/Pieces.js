/**
 * Created by dima on 27/05/2017.
 */
import Piece from './Piece';

export default class Peieces {
  constructor() {
    this.pieces = [];
  }

  addPiece(piece) {
    if (piece instanceof Piece) {
      this.pieces.push(piece);
    } else {
      throw new Error('Piece isn\'t instance of Piece');
    }
  }

  getPieces() {
    return this.pieces;
  }

  [Symbol.iterator]() {
    return this.pieces.values();
  }
}
