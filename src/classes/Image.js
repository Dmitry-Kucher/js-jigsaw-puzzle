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

    this.imageInstance = this.getFabricImageInstance();
    this.imagePieces = new Pieces();
  }

  getFabricImageInstance() {
    return this.imageInstance || new fabric.Image(this.imageElement);
  }

  splitImageToPieces({ colLength = 6, rowLength = 6 } = {}) {
    const numberOfCols = colLength;
    const numberOfRows = rowLength;
    const colSize = this.imageInstance.getWidth() / numberOfCols;
    const rowSize = this.imageInstance.getHeight() / numberOfRows;
    for (let rows = 0; rows < numberOfRows; rows += 1) {
      for (let cols = 0; cols < numberOfCols; cols += 1) {
        const dataUrl = this.imageInstance.toDataURL({
          left: colSize * cols,
          top: rowSize * rows,
          width: colSize,
          height: rowSize,
        });
        const piece = new Piece(dataUrl);
        piece.setSteps({ colLength, rowLength });
        this.imagePieces.addPiece(piece);
      }
    }
  }

  getImagePieces() {
    return this.imagePieces.getPieces();
  }

  getImageElement() {
    return this.imageElement;
  }
}
