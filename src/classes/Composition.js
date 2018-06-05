/**
 * Created by dima on 02/07/2017.
 */
import Piece from './Piece';

export default class Composition {
  constructor() {
    const pieces = [];

    this.addPiece = (piece) => {
      if (!(piece instanceof Piece)) {
        throw Error('Composition can`t store anything except except instance of Piece');
      }
      pieces.push(piece);
    };

    this.getPieces = () => pieces;
  }
}
