/**
 * Created by dima on 18/05/2017.
 */
import Image from './classes/Image';
import Piece from './classes/Piece';

document.addEventListener('DOMContentLoaded', () => {
  const collisionValue = 48;
  const canvas = new fabric.Canvas('c', {
    renderOnAddRemove: false,
    backgroundColor: '#0f0',
  });

  const imageSelector = '[jjp-image]';
  const image = new Image(imageSelector);

  let i = 0;
  image.splitImageToPieces({ colNumbers: 8, rowNumbers: 8 });
  const pieces = image.getImagePieces();
  const piecesLength = Object.keys(pieces).length;
  for (const piecePosition in pieces) {
    const piece = pieces[piecePosition];
    const last = (i === (piecesLength - 1));
    i += 1;

    const drawCallback = Piece.drawCallback.bind(null, { canvas, last, piecePosition });

    fabric.Image.fromURL(piece.getContent(), drawCallback);
  }

  canvas.on('object:modified', () => {
    canvas.forEachObject((targ) => {
      const activeObject = canvas.getActiveObject();
      if (targ === activeObject || !activeObject) {
        return;
      }
      console.log(activeObject.piecePosition, targ.piecePosition);
      if (Math.abs(activeObject.piecePosition - targ.piecePosition) === 1) {
        let left;
        let top;
        let groupLeft;
        let groupTop;

        const fromLeft = Math.abs(activeObject.aCoords.tr.x - targ.aCoords.tl.x);
        const fromRight = Math.abs(activeObject.aCoords.tl.x - targ.aCoords.tr.x);
        const verticalDiff = Math.abs(activeObject.aCoords.tl.y - targ.aCoords.tl.y);
        const verticalPercent = 50;

        if (fromLeft < collisionValue) {
          left = targ.aCoords.tl.x - activeObject.width;
          top = targ.aCoords.tl.y;
          groupLeft = left;
          groupTop = top;
        } else if (fromRight < collisionValue) {
          left = targ.aCoords.tr.x;
          top = targ.aCoords.tl.y;
          groupLeft = targ.aCoords.tl.x;
          groupTop = top;
        }

        if (verticalDiff < (verticalPercent / 100) * activeObject.height) {
          if (left || top) {
            activeObject.left = left;
            activeObject.top = top;
          }

          if (groupLeft || groupTop) {
            const testGroup = new fabric.Group([activeObject, targ], {
              left: groupLeft,
              top: groupTop,
              hasControls: false,
            });

            canvas.add(testGroup);
            canvas.remove(activeObject);
            canvas.remove(targ);
          }
        }
      }
    });
  });
});
