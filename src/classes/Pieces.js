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

  static isNeighbours({ colNumbers, rowNumbers, candidatePositions }) {
    const firstCandidatePosistion = candidatePositions.shift();
    const secondCandidatePosistion = candidatePositions.shift();
    const positionsDiff = Math.abs(firstCandidatePosistion - secondCandidatePosistion);
    const positionsRemainder = firstCandidatePosistion % colNumbers;
    const boundaryRemainderValues = [0, 1];
    const neighbourDiffs = [0, colNumbers];

    if (neighbourDiffs.indexOf(positionsDiff) === -1) {
      return false;
    }

    if (boundaryRemainderValues.indexOf(positionsRemainder) !== -1) {
      return false;
    }
  }

  getPieces() {
    return this.pieces;
  }
}
