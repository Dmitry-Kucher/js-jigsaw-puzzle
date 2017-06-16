/**
 * Created by dima on 27/05/2017.
 */
import Piece from './Piece';

export default class Pieces {
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

  static isNeighbours({ colLength, currentElementPosition, targetElementPosition }) {
    const params = {
      colLength,
      currentElementPosition,
      targetElementPosition,
    };
    return Pieces.isVerticalNeighbours(params) || Pieces.isHorizontalNeighbours(params);
  }

  static isVerticalNeighbours({ colLength, currentElementPosition, targetElementPosition }) {
    const positionsDiff = Math.abs(currentElementPosition - targetElementPosition);

    return positionsDiff === colLength;
  }

  static isHorizontalNeighbours({ colLength, currentElementPosition, targetElementPosition }) {
    const positionsDiff = Math.abs(currentElementPosition - targetElementPosition);

    if (positionsDiff === 1) {
      const currentRow = Math.floor(currentElementPosition / colLength);
      const targetRow = Math.floor(targetElementPosition / colLength);

      return currentRow === targetRow;
    }

    return false;
  }

  getPieces() {
    return this.pieces;
  }
}
