/**
 * Created by dima on 09/06/2017.
 */
import Piece from './Piece';
import Composition from './Composition';

export default class Image {
  constructor(selector) {
    const imageSelector = `img${selector}`;
    this.imageElement = document.querySelector(imageSelector);
    if (!this.imageElement) {
      throw Error(`There is no img element with provided selector ${imageSelector}`);
    }

    this.imageInstance = this.getFabricImageInstance();
    this.imagePieces = new Composition();
  }

  getFabricImageInstance() {
    return this.imageInstance || new fabric.Image(this.imageElement);
  }

  splitImageToPieces({ colLength = 6, rowLength = 6 } = {}) {
    const colSize = this.imageInstance.getWidth() / colLength;
    const rowSize = this.imageInstance.getHeight() / rowLength;
    for (let rows = 0; rows < rowLength; rows += 1) {
      for (let cols = 0; cols < colLength; cols += 1) {
        const dataUrl = this.imageInstance.toDataURL({
          left: colSize * cols,
          top: rowSize * rows,
          width: colSize,
          height: rowSize,
        });
        const pieceOptions = {
          content: dataUrl,
          position: rows * cols,
        };
        const piece = new Piece(pieceOptions);
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
