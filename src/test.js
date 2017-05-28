/**
 * Created by dima on 18/05/2017.
 */
import Piece from './classes/Piece';
import Pieces from './classes/Pieces';

document.addEventListener('DOMContentLoaded', () => {
  const canvas = new fabric.Canvas('c', {
    renderOnAddRemove: false,
    backgroundColor: '#0f0',
  });

  const imageHTMLElement = document.querySelector('[jjp-image]');
  const imgInstance = new fabric.Image(imageHTMLElement);

  const pieces = new Pieces();
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
      pieces.addPiece(piece);
    }
  }

  // pieces.forEach((item) => {
  //   console.log(item);
  // });

  for (let piece of pieces) {
    const last = (i === (pieces.length - 1));

    fabric.Image.fromURL(pieces[i], (img) => {
      img.set('hasControls', false);
      canvas.add(img);
      if (last) {
        canvas.renderAll();
      }
    });
  }
});
