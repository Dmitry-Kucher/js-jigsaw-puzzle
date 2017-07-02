/**
 * Created by dima on 18/05/2017.
 */
import Gameloop from './classes/Gameloop';

const options = {
  canvasId: 'c',
  rows: 8,
  cols: 8,
  imageSelector: '[jjp-image]',
};
const gameLoop = new Gameloop(options);

gameLoop.start();

/*
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
        if (targ instanceof fabric.Group) {
          const groupObjects = targ.getObjects();
          if (groupObjects) {
            for (const obj of groupObjects) {
              const positions = Pieces.getPositions(obj);
              console.log(positions, horizontalNeighbourPositions);
              if (positions.indexOf(horizontalNeighbourPositions) !== -1) {
                console.log('targ reassigned');
                targ = obj;
              }
            }
          }
        }

        const verticalDiff = Math.abs(activeObject.aCoords.tl.y - targ.aCoords.tl.y);
        const verticalPercent = 50;

        if (verticalDiff < (verticalPercent / 100) * activeObject.height) {
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
        let groupItems = [];

        const activeObjectItems = Pieces.extractItemsFromGroup(activeObject);
        const targObjectItems = Pieces.extractItemsFromGroup(targ);
        groupItems = groupItems.concat(activeObjectItems, targObjectItems);
        const testGroup = new fabric.Group(groupItems, {
          left: groupLeft,
          top: groupTop,
          hasControls: false,
        });

        const activeObjectPositions = Pieces.getPositions(activeObject);
        const targObjectPositions = Pieces.getPositions(targ);
        const groupPiecesPositions = [].concat(activeObjectPositions, targObjectPositions);
        testGroup.set('groupPositionsDescription', Pieces.getGroupPositionsDescription(groupPiecesPositions, colLength));

        canvas.add(testGroup);
        canvas.remove(activeObject);
        canvas.remove(targ);
        canvas.renderAll();
      }
    });
  });
});
*/
