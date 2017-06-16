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
      const piecePositions = Object.keys(this.pieces).length;
      piece.setPosition(piecePositions);
      this.pieces[piecePositions] = piece;
    } else {
      throw new Error('Piece isn\'t instance of Piece');
    }
  }

  static isNeighbours({ colLength, currentElementPositions, targetElementPositions }) {
    const params = {
      colLength,
      currentElementPositions,
      targetElementPositions,
    };
    return Pieces.isVerticalNeighbours(params) || Pieces.isHorizontalNeighbours(params);
  }

  static isVerticalNeighbours({ colLength, currentElementPositions, targetElementPositions }) {
    for(const currentElementPosition of currentElementPositions) {
      for (const targetElementPosition of targetElementPositions) {
        const positionsDiff = Math.abs(currentElementPosition - targetElementPosition);
        if(positionsDiff === colLength) {
          return true;
        }
      }
    }
    return false;
  }

  static isHorizontalNeighbours({ colLength, currentElementPositions, targetElementPositions }) {
    for(const currentElementPosition of currentElementPositions) {
      for (const targetElementPosition of targetElementPositions) {
        const positionsDiff = Math.abs(currentElementPosition - targetElementPosition);
        if (positionsDiff === 1) {
          const currentRow = Math.floor(currentElementPosition / colLength);
          const targetRow = Math.floor(targetElementPosition / colLength);

          if(currentRow === targetRow) {
            return true;
          }
        }
      }
    }
    return false;
  }

  getPieces() {
    return this.pieces;
  }
}
