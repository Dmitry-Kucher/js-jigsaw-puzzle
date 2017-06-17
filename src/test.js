/**
 * Created by dima on 18/05/2017.
 */
import Image from './classes/Image';
import Piece from './classes/Piece';
import Pieces from './classes/Pieces';

document.addEventListener('DOMContentLoaded', () => {
  const collisionValue = 48;
  const canvas = new fabric.Canvas('c', {
    renderOnAddRemove: false,
    backgroundColor: '#0f0',
  });

  canvas.on('object:selected', (e) => {
    window.selectedObjectPositions = { left: e.target.left, top: e.target.top };
  });

  const imageSelector = '[jjp-image]';
  const image = new Image(imageSelector);
  const colLength = 8;
  const rowLength = 8;

  let i = 0;
  image.splitImageToPieces({ colLength, rowLength });
  const pieces = image.getImagePieces();
  const piecesLength = Object.keys(pieces).length;
  for (const piecePosition in pieces) {
    const piece = pieces[piecePosition];
    const last = (i === (piecesLength - 1));
    i += 1;

    const piecePositions = [piecePosition];
    const drawCallback = Piece.drawCallback.bind(null, { canvas, last, piecePositions });

    fabric.Image.fromURL(piece.getContent(), drawCallback);
  }

  canvas.on('object:modified', () => {
    canvas.forEachObject((targ) => {
      const activeObject = canvas.getActiveObject();
      if (targ === activeObject || !activeObject) {
        return;
      }
      const currentElementPositions = Pieces.getPositions(activeObject);
      const targetElementPositions = Pieces.getPositions(targ);
      const positionsData = {
        colLength,
        currentElementPositions,
        targetElementPositions,
      };

      let left;
      let top;
      let groupLeft;
      let groupTop;
      const horizontalNeighbourPositions = Pieces.getHorizontalNeighboursPositionsIfExists(positionsData);
      if (horizontalNeighbourPositions) {
        console.log(horizontalNeighbourPositions);

        const verticalDiff = Math.abs(activeObject.aCoords.tl.y - targ.aCoords.tl.y);
        const verticalPercent = 50;

        if (verticalDiff < (verticalPercent / 100) * activeObject.height) {
          console.log('horizontal');
          const fromLeft = Math.abs(activeObject.aCoords.tr.x - targ.aCoords.tl.x);
          const fromRight = Math.abs(activeObject.aCoords.tl.x - targ.aCoords.tr.x);

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
        }
      }
      if (Pieces.getVerticalNeighboursPositionsIfExists(positionsData)) {
        const horizontalDiff = Math.abs(activeObject.aCoords.tl.x - targ.aCoords.tl.x);
        const horizontalPercent = 50;

        if (horizontalDiff < (horizontalPercent / 100) * activeObject.width) {
          console.log('vertical');

          const fromTop = Math.abs(activeObject.aCoords.bl.y - targ.aCoords.tl.y);
          const fromBottom = Math.abs(activeObject.aCoords.tl.y - targ.aCoords.bl.y);

          if (fromTop < collisionValue) {
            left = targ.aCoords.bl.x;
            top = targ.aCoords.tl.y - activeObject.height;
            groupLeft = left;
            groupTop = top;
          } else if (fromBottom < collisionValue) {
            left = targ.aCoords.bl.x;
            top = targ.aCoords.bl.y;
            groupLeft = left;
            groupTop = targ.aCoords.tl.y;
          }
        }
      }

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

        const groupPiecesPositions = activeObject.piecePositions.concat(targ.piecePositions);
        testGroup.set('groupPositionsDescription', Pieces.getGroupPositionsDescription(groupPiecesPositions, colLength));
        console.log('group', testGroup.getObjects());

        canvas.add(testGroup);
        canvas.remove(activeObject);
        canvas.remove(targ);
      }
    });
  });
});
