/**
 * Created by dima on 09/06/2017.
 */
import Piece from './Piece';
import Pieces from './Pieces';

export default class Image {
  constructor(selector) {
    const imageSelector = `img${selector}`;
    this.imageElement = document.querySelector(imageSelector);
    if (!this.imageElement) {
      throw new Error(`There is no img element with provided selector ${imageSelector}`);
    }
  }

  getPieces() {
    const imgInstance = new fabric.Image(this.imageElement);

    const imagePieces = new Pieces();
    const numberOfCols = 6;
    const numberOfRows = 6;
    const colSize = imgInstance.getWidth() / numberOfCols;
    const rowSize = imgInstance.getHeight() / numberOfRows;
    for (let cols = 0; cols < numberOfCols; cols += 1) {
      for (let rows = 0; rows < numberOfRows; rows += 1) {
        const dataUrl = imgInstance.toDataURL({
          left: colSize * cols,
          top: rowSize * rows,
          width: colSize,
          height: rowSize,
        });
        const piece = new Piece(dataUrl);
        imagePieces.addPiece(piece);
      }
    }
    return imagePieces.getPieces();
  }

  getImageElement() {
    return this.imageElement;
  }
}
