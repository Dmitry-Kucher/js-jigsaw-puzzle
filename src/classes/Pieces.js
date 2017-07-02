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

  static getNeighboursPositionsIfExists({ colLength, currentElementPositions, targetElementPositions }) {
    const params = {
      colLength,
      currentElementPositions,
      targetElementPositions,
    };
    return Pieces.getVerticalNeighboursPositionsIfExists(params) || Pieces.getHorizontalNeighboursPositionsIfExists(params);
  }

  static getVerticalNeighboursPositionsIfExists({ colLength, currentElementPositions, targetElementPositions }) {
    for (const currentElementPosition of currentElementPositions) {
      for (const targetElementPosition of targetElementPositions) {
        const positionsDiff = Math.abs(currentElementPosition - targetElementPosition);
        if (positionsDiff === colLength) {
          return targetElementPosition;
        }
      }
    }
    return false;
  }

  static getHorizontalNeighboursPositionsIfExists({ colLength, currentElementPositions, targetElementPositions }) {
    for (const currentElementPosition of currentElementPositions) {
      for (const targetElementPosition of targetElementPositions) {
        const positionsDiff = Math.abs(currentElementPosition - targetElementPosition);
        if (positionsDiff === 1) {
          const currentRow = Math.floor(currentElementPosition / colLength);
          const targetRow = Math.floor(targetElementPosition / colLength);

          if (currentRow === targetRow) {
            return targetElementPosition;
          }
        }
      }
    }
    return false;
  }

  static getGroupPositionsDescription(groupPiecePositions, colLength) {
    const rows = [];
    const cols = [];
    groupPiecePositions.forEach((value) => {
      rows.push(Math.floor(value / colLength));
      cols.push(value % colLength);
    });
    console.log({
      topRow: Math.max(...rows),
      rightCol: Math.max(...cols),
      bottomRow: Math.min(...rows),
      leftCol: Math.min(...cols),
    });
    return {
      topRow: Math.max(...rows),
      rightCol: Math.max(...cols),
      bottomRow: Math.min(...rows),
      leftCol: Math.min(...cols),
    };
  }

  static getPositions(object) {
    return object.piecePositions || Pieces.getGroupPositions(object);
  }

  static getGroupPositions(object) {
    const positions = [];
    if (object instanceof fabric.Group) {
      const groupObjects = object.getObjects();
      if (groupObjects) {
        for (const item of groupObjects) {
          if (item.piecePositions) {
            positions.push(item.piecePositions);
          }
        }
      }
    }
    return positions;
  }

  static extractItemsFromGroup(object) {
    return (object instanceof fabric.Group) ? object.getObjects() : [object];
  }

  getPieces() {
    return this.pieces;
  }
}
