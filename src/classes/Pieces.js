/**
 * Created by dima on 27/05/2017.
 */
import Piece from './Piece';

export default class Peieces {
  constructor() {
    this.pieces = Object.create(null);// collection of pieces
  }

  addPiece(piece) {
    if (piece instanceof Piece) {
      const piecePosition = Object.keys(this.pieces).length;
      piece.setPosition(piecePosition);
      this.pieces[piecePosition] = piece;
    } else {
      throw new Error('Piece isn\'t instance of Piece');
    }
  }

  getPieces() {
    return this.pieces;
  }
}
