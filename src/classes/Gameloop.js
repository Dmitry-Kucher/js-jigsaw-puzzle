/**
 * Created by dima on 02/07/2017.
 */
import Image from './Image';
import Gamefield from './Gamefield';
import RecalculatedObjectsGroup from './RecalculatedObjectsGroup';
import CanvasLogger from './CanvasLogger';
import Logger from './Logger';

export default class Gameloop {
  constructor(options) {
    if (!options.imageSelector) {
      throw Error('image selector is not defined');
    }
    let canvas;
    this.getOptions = () => options;

    this.getCanvas = () => canvas;
    this.setCanvas = (internalCanvas) => {
      canvas = internalCanvas;
    };
  }

  start() {
    window.addEventListener('load', () => {
      const options = this.getOptions();
      const gameField = new Gamefield({
        width: 1420,
        height: 2048,
        canvasId: options.canvasId,
      });
      const canvas = gameField.getCanvas();
      this.setCanvas(canvas);
      this.drawPieces(options.scale);
      canvas.on('object:selected', () => {
        if (window.debugApp) {
          const canvasLogger = new CanvasLogger({ canvas });
          const logger = new Logger({ loggerInterface: canvasLogger });
          const activeObject = canvas.getActiveObject();
          logger.log(activeObject);
        }
      });
      canvas.on('object:modified', () => {
        const activeObject = canvas.getActiveObject();
        if (activeObject instanceof fabric.Path) {
          return;
        }
        activeObject.trigger('recalculate');
        const activeObjectNeighbours = this.getNeighbours(activeObject);
        let isMerged = false;
        canvas.forEachObject((potential) => {
          if (isMerged) {
            return;
          }
          if (potential === activeObject || !activeObject) {
            return;
          }

          if (Gameloop.isNeighbour(activeObjectNeighbours, potential)) {
            if (this.isClosest(activeObject, potential)) {
              isMerged = true;
              this.drawGroup(activeObject, potential);
              canvas.remove(activeObject);
              canvas.remove(potential);
            }
          }
        });
      });
    });
  }

  drawSvg(img) {
    const canvas = this.getCanvas();
    const path = new fabric.Path(
      'M85.446,52.284c-3.901,0-5.223-2.17-5.773-3.058c-1.146-1.85-3.291-3.455-5.469-4.268c-1.049-0.251-2.159,0.377-2.165,2.342  v24.737h-0.001v0.001H46.287c-1.978,0.002-2.604,1.122-2.347,2.177c0.815,2.173,2.418,4.312,4.264,5.457  c0.889,0.551,3.058,1.872,3.058,5.772c0,5.277-5.934,9.555-13.253,9.555c-7.32,0-13.254-4.277-13.254-9.555  c0-3.901,2.17-5.222,3.059-5.772c1.848-1.147,3.453-3.291,4.268-5.469c0.249-1.049-0.379-2.159-2.342-2.165H5V47.314  c0-1.977,1.114-2.606,2.166-2.355c2.178,0.812,4.322,2.418,5.47,4.268c0.551,0.888,1.871,3.058,5.772,3.058  c5.278,0,9.556-5.934,9.556-13.254c0-7.319-4.277-13.253-9.556-13.253c-3.901,0-5.222,2.17-5.772,3.059  c-1.146,1.845-3.284,3.447-5.458,4.263C6.122,33.356,5,32.727,5,30.745V5h67.038v0.001L72.039,5v25.759  c0.006,1.97,1.124,2.597,2.177,2.34c2.173-0.815,4.312-2.418,5.457-4.263c0.551-0.889,1.872-3.059,5.773-3.059  c5.276,0,9.554,5.934,9.554,13.253C95,46.351,90.723,52.284,85.446,52.284z',
      {
        fill: new fabric.Pattern({
          source: img,
        }),
      },
    );
    path.set({ top: 150, left: 150 });
    canvas.add(path);
    canvas.renderAll();
  }

  drawPieces(scale = 1) {
    const options = this.getOptions();
    const canvas = this.getCanvas();
    const image = new Image(options.imageSelector);

    image.splitImageToPieces({ colLength: options.cols, rowLength: options.rows });
    const pieces = image.getImagePieces();

    pieces.forEach((piece, piecePosition) => {
      const last = piecePosition === (pieces.length - 1);
      const drawCallback = Gameloop.drawCallback.bind(null, { canvas, last, piecePosition, scale });
      // const drawSvg = this.drawSvg.bind(this);
      fabric.Image.fromURL(piece.getContent(), drawCallback);
      // fabric.util.loadImage(piece.getContent(), drawSvg);
    });
  }

  static drawCallback(additionalParams, img) {
    const { canvas, last, piecePosition, scale } = additionalParams;
    const top = fabric.util.getRandomInt(0, 300);
    const left = fabric.util.getRandomInt(0, 300);

    img.set('hasControls', false);
    img.set('hasBorders', false);
    img.set('top', top);
    img.set('left', left);
    img.set('piecePosition', piecePosition);
    img.scale(scale);

    canvas.add(img);
    if (last) {
      canvas.renderAll();
    }
  }

  getNeighbours(examObject) {
    const neighbours = [];
    if (examObject) {
      let piecePositions = [];
      if (typeof examObject.piecePosition !== 'undefined') {
        piecePositions.push(examObject.piecePosition);
      } else if (examObject.piecePositions instanceof Array) {
        piecePositions = examObject.piecePositions;
      } else {
        throw Error('examObject doesn`t contain any info about piece position');
      }
      const options = this.getOptions();
      piecePositions.forEach((piecePosition) => {
        const actualRow = Math.floor(piecePosition / options.cols);
        const actualCol = piecePosition % options.cols;
        if (actualRow !== 0) {
          neighbours.push((piecePosition - options.cols));
        }
        if (actualRow < (options.rows - 1)) {
          neighbours.push((piecePosition + options.cols));
        }

        if (actualCol !== 0) {
          neighbours.push((piecePosition - 1));
        }
        if (actualCol < (options.cols - 1)) {
          neighbours.push((piecePosition + 1));
        }
      });
    }
    return neighbours;
  }

  isClosest(current, potential) {
    const activeObjectItems = current instanceof fabric.Group ? current.getObjects() : [current];
    const potentialItems = potential instanceof fabric.Group ? potential.getObjects() : [potential];

    for (const activeItem of activeObjectItems) {
      for (const potentialItem of potentialItems) {
        if (this.isPiecesClose(activeItem, potentialItem)) {
          return true;
        }
      }
    }
    return false;
  }

  isPiecesClose(firstPiece, secondPiece) {
    const options = this.getOptions();
    const closestSensitivity = options.neighboursSensitivity;
    let xDifference = Math.abs(firstPiece.aCoords.tr.x - secondPiece.aCoords.tl.x);
    let yDifference = Math.abs(firstPiece.aCoords.tr.y - secondPiece.aCoords.tl.y);
    if (xDifference < closestSensitivity && yDifference < closestSensitivity) {
      return true;
    }

    xDifference = Math.abs(firstPiece.aCoords.tl.x - secondPiece.aCoords.tr.x);
    yDifference = Math.abs(firstPiece.aCoords.tl.y - secondPiece.aCoords.tr.y);
    if (xDifference < closestSensitivity && yDifference < closestSensitivity) {
      return true;
    }

    xDifference = Math.abs(firstPiece.aCoords.bl.x - secondPiece.aCoords.tl.x);
    yDifference = Math.abs(firstPiece.aCoords.bl.y - secondPiece.aCoords.tl.y);
    if (xDifference < closestSensitivity && yDifference < closestSensitivity) {
      return true;
    }

    xDifference = Math.abs(firstPiece.aCoords.tl.x - secondPiece.aCoords.bl.x);
    yDifference = Math.abs(firstPiece.aCoords.tl.y - secondPiece.aCoords.bl.y);
    return xDifference < closestSensitivity && yDifference < closestSensitivity;
  }

  static isNeighbour(activeObjectNeighbours, potential) {
    if (potential instanceof fabric.Group) {
      for (const potentialItem of potential.getObjects()) {
        if (activeObjectNeighbours.indexOf(potentialItem.piecePosition) !== -1) {
          return true;
        }
      }
    } else if (typeof potential.piecePosition !== 'undefined') {
      return activeObjectNeighbours.indexOf(potential.piecePosition) !== -1;
    }
    return false;
  }

  drawGroup(activeObject, potential) {
    const canvas = this.getCanvas();
    const groupItems = [];
    const piecePositions = [];
    const options = this.getOptions();
    const baseElements = potential instanceof fabric.Group ? potential.getObjects() : [potential];
    const activeObjects = activeObject instanceof fabric.Group ? activeObject.getObjects() : [activeObject];

    // baseElement is the potential element itself or first element from group;
    const baseElement = baseElements[0];
    const { col, row } = Gameloop.extractCoordinates(baseElement, options.cols);
    const zeroDisplacementX = col * baseElement.getWidth();
    const zeroDisplacementY = row * baseElement.getHeight();
    const xDisplacement = baseElement.left - zeroDisplacementX;
    const yDisplacement = baseElement.top - zeroDisplacementY;

    const itemDecompose = (activePiece) => {
      this.recalculatePiecePositions({
        obj: activePiece,
        xDisplacement,
        yDisplacement,
      });
      piecePositions.push(activePiece.piecePosition);
      groupItems.push(activePiece);
    };

    activeObjects.forEach(itemDecompose);
    baseElements.forEach(itemDecompose);

    const itemsRecalculableGroup = new RecalculatedObjectsGroup(groupItems, {
      hasControls: false,
      hasBorders: false,
    });
    itemsRecalculableGroup.set('piecePositions', piecePositions);
    canvas.add(itemsRecalculableGroup);
    canvas.renderAll();

    // recalculated group objects coordinates
    // it prevents to disappearing group object after merge
    itemsRecalculableGroup.trigger('selected');
    itemsRecalculableGroup.trigger('recalculate');
  }

  recalculatePiecePositions({ obj, xDisplacement, yDisplacement }) {
    const options = this.getOptions();
    const { col, row } = Gameloop.extractCoordinates(obj, options.cols);
    const zeroDisplacementTop = row * obj.getHeight();
    const zeroDisplacementLeft = col * obj.getWidth();
    const recalculatedTop = zeroDisplacementTop + yDisplacement;
    const recalculatedLeft = zeroDisplacementLeft + xDisplacement;
    obj.setTop(recalculatedTop);
    obj.setLeft(recalculatedLeft);
    obj.setCoords();
  }

  static extractCoordinates(obj, cols) {
    const col = obj.piecePosition % cols;
    const row = Math.floor(obj.piecePosition / cols);
    return { col, row };
  }
}
